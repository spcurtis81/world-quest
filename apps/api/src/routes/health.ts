import { FastifyInstance } from "fastify"; import { isoNow } from "@lib/shared";
export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/healthz", async () => ({ status: "ok", time: isoNow() }));
  fastify.get("/v1/ping", async () => ({ pong: true }));
}
