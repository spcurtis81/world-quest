import Fastify from 'fastify';
import { z } from 'zod';
import cors from '@fastify/cors';

const server = Fastify({
  logger: {
    transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
    level: process.env.LOG_LEVEL || 'info',
  },
});

await server.register(cors, { origin: true });

server.get('/healthz', async () => ({ status: 'ok' }));

server.get('/echo', async (request) => {
  const querySchema = z.object({ q: z.string().default('') });
  const query = querySchema.parse(request.query);
  return { echo: query.q };
});

const port = Number(process.env.PORT || 4000);

server
  .listen({ port, host: '0.0.0.0' })
  .then((address) => {
    server.log.info({ address }, 'API listening');
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
