import express, { Express } from "express";
import { client } from "./redisClient";
import { router } from "./routes";

const app: Express = express();

// Handle errors on Redis Client
client.on("error", (err) => {
  console.log("Redis Client Error", err);
  client.quit();
});

app.use("/api", router);

export { app };
