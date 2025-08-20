import { FastifyInstance } from "fastify";
import { z } from "zod";
import { COUNTRIES, seededRandom, pickDistinct } from "@lib/shared/flags.data";
import { FLAG_IMAGE_CODES } from "@lib/shared/flags.images";
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
      options: z.coerce.number().optional()
    });
    const { seed, options } = schema.parse(req.query ?? {});
    const rand = typeof seed === "number" ? seededRandom(seed) : Math.random;

    const desired = [4, 6, 8].includes(options ?? 0) ? (options as number) : 4;
    const correct = pickDistinct(rand, COUNTRIES, 1)[0];
    const distractors = pickDistinct(rand, COUNTRIES.filter(c => c.code !== correct.code), desired - 1);
    // Sprint 6 TODO: select from FLAG_POOL_STUB (or full list) with optional ?region=EU|AF|AS|AM|OC
    // Sprint 6 TODO: ensure per-round uniqueness and desired options count

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
}
