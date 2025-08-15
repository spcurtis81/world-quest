import { defineConfig } from "@playwright/test";
const basePath = process.env.BASE_PATH && process.env.BASE_PATH !== "/" ? process.env.BASE_PATH : "";
const webBase = `http://localhost:${process.env.PORT_WEB ?? 3000}${basePath}`;
export default defineConfig({
  timeout: 90_000,
  retries: 1,
  use: {
    baseURL: webBase,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
