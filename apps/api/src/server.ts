import Fastify from "fastify";
import cors from "@fastify/cors";
import healthRoutes from "./routes/health.js";
import quizRoutes from "./routes/quiz.js";

const PORT = Number(process.env.PORT_API ?? 4000);
const LOG_LEVEL = process.env.API_LOG_LEVEL ?? "info";

const app = Fastify({ logger: { level: LOG_LEVEL } });

await app.register(cors, {
  origin: (origin, cb) => {
    // allow same-origin (undefined) and local dev web
    if (!origin || /http:\/\/localhost:3000$/.test(origin)) return cb(null, true);
    return cb(null, false);
  },
  methods: ["GET", "HEAD", "OPTIONS"],
  credentials: false
});

app.register(healthRoutes);
app.register(quizRoutes);

app
  .ready()
  .then(
    () => app.log.info({ msg: "Routes registered" }),
    (e: unknown) => {
      app.log.error(e);
      process.exit(1);
    }
  );

app
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(
    () => app.log.info({ msg: "API listening", port: PORT }),
    (e: unknown) => {
      app.log.error(e);
      process.exit(1);
    }
  );
