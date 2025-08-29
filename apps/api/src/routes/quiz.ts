import { FastifyInstance } from "fastify";
import { z } from "zod";
import { COUNTRIES, seededRandom, pickDistinct } from "@lib/shared/flags.data";
import { FLAG_IMAGE_CODES } from "@lib/shared/flags.images";
import { filterByRegion, type RegionKey } from "@lib/shared";
import { FLAG_POOL_STUB, type FlagMeta } from "@lib/shared";

const FlagQuestion = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.object({ id: z.string(), label: z.string() })).min(4),
  correctId: z.string(),
  imageUrl: z.string().optional()
});

export default async function quizRoutes(fastify: FastifyInstance) {
  // GET /v1/quiz/flag?seed=123
  fastify.get("/v1/quiz/flag", async (req, reply) => {
    const schema = z.object({
      seed: z.coerce.number().optional(),
      options: z.coerce.number().optional(),
      region: z.string().optional(),
      index: z.coerce.number().optional()
    });
    const { seed, options, region: regionRaw, index } = schema.parse(req.query ?? {});
    const rand = typeof seed === "number" ? seededRandom(seed) : Math.random;

    const desired = [4, 6, 8].includes(options ?? 0) ? (options as number) : 4;

    const regionParam = (regionRaw as string | undefined)?.toUpperCase() as RegionKey | undefined;
    const region: RegionKey = regionParam === "EU" ? "EU" : "ALL";

    // Apply server-side region filter BEFORE choosing the question/options
    const candidates = filterByRegion(FLAG_POOL_STUB, region);
    const pool = candidates.length > 0 ? candidates : FLAG_POOL_STUB;
    if (pool.length < desired) {
      throw new Error("Not enough flags for requested options/region");
    }

    // Deterministic round ordering using rand()
    const roundOrder = [...pool];
    for (let i = roundOrder.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [roundOrder[i], roundOrder[j]] = [roundOrder[j], roundOrder[i]];
    }
    const chosenIndex = typeof index === "number" ? index : 0;
    const correctMeta = roundOrder[chosenIndex % roundOrder.length];
    const correct = { code: correctMeta.code, name: correctMeta.name };
    // Take next distinct distractors from roundOrder, skipping the chosen
    const distractorMetas: { code: string; name: string }[] = [];
    for (let i = 1; i < roundOrder.length && distractorMetas.length < desired - 1; i++) {
      const m = roundOrder[(chosenIndex + i) % roundOrder.length];
      if (m.code !== correct.code) {
        distractorMetas.push({ code: m.code, name: m.name });
      }
    }
    const distractors = distractorMetas;

    const all = [correct, ...distractors].map(c => ({ id: c.code, label: c.name }));
    // Fisher–Yates shuffle using rand() for seed stability when provided
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }

    const code = correct.code;
    const lower = code.toLowerCase();
    const base = process.env.FLAG_CDN_BASE ?? "https://flagcdn.com";
    const fmt = (process.env.FLAG_CDN_FORMAT ?? "svg").toLowerCase();
    const size = process.env.FLAG_CDN_SIZE ?? "w320";
    const cdnUrl = fmt === "svg" ? `${base}/${lower}.svg` : `${base}/${size}/${lower}.png`;
    const localUrl = FLAG_IMAGE_CODES.has(code) ? `/flags/${code}.svg` : `/flags/_placeholder.svg`;
    const useCdn = (process.env.USE_FLAG_CDN ?? "false").toLowerCase() === "true";
    const imageUrl = useCdn ? cdnUrl : localUrl;

    const payload = {
      id: `flag-${correct.code}`,
      question: "Which country’s flag is shown?",
      options: all,
      correctId: correct.code,
      imageUrl
    };

    // validate before sending
    return FlagQuestion.parse(payload);
  });

  fastify.get("/v1/debug/regions/eu", (_req, res) => {
    const candidates = filterByRegion(FLAG_POOL_STUB, "EU");
    res.send({ count: candidates.length });
  });
}
