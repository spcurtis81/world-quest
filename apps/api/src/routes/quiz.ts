import { FastifyInstance } from "fastify";
import { z } from "zod";
import { COUNTRIES, seededRandom, pickDistinct } from "@lib/shared/flags.data";

const FlagQuestion = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.object({ id: z.string(), label: z.string() })).length(4),
  correctId: z.string()
});

export default async function quizRoutes(fastify: FastifyInstance) {
  // GET /v1/quiz/flag?seed=123
  fastify.get("/v1/quiz/flag", async (req, reply) => {
    const schema = z.object({ seed: z.coerce.number().optional() });
    const { seed } = schema.parse(req.query ?? {});
    const rand = typeof seed === "number" ? seededRandom(seed) : Math.random;

    const correct = pickDistinct(rand, COUNTRIES, 1)[0];
    const distractors = pickDistinct(rand, COUNTRIES.filter(c => c.code !== correct.code), 3);

    const all = [correct, ...distractors]
      .map(c => ({ id: c.code, label: c.name }))
      .sort(() => (typeof seed === "number" ? (rand() - 0.5) : Math.random() - 0.5)); // shuffle stable-ish

    const payload = {
      id: `flag-${correct.code}`,
      question: "Which country’s flag is shown?",
      options: all,
      correctId: correct.code
    };

    // validate before sending
    return FlagQuestion.parse(payload);
  });
}
