import { client } from "./redisClient";

// Handle errors on any app crash

process.on("uncaughtException", (err, origin) => {
  console.error({ err, origin }, "unhandledRejection");
  console.log("Redis client disconnected through app termination");
  client.quit();
  process.exit(0);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error({ reason, promise }, "unhandledRejection");
  console.log("Redis client disconnected through app termination");
  client.quit();
  process.exit(0);
});

import "./server";
