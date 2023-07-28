import express, { Router, Request, Response } from "express";
import { client } from "../redisClient";

const router: Router = express.Router();

const MAX_RESPONSE_TIME: number = 12000;
const MIN_RESPONSE_TIME: number = 9000;

const sleep = (m: number) => {
  console.log("inside fake time delay");
  return new Promise((r) => setTimeout(r, m));
};

router.get("/", async (req: Request, res: Response) => {
  console.log("Getting data...");

  if (!client.isOpen) {
    await client.connect();
  }

  // Try to retrieve data from cache
  let data = await client.hGetAll("userData:1");
  // if there's no data on cache, we should set it before returning the data
  if (Object.keys(data).length === 0) {
    console.log(
      "Data not on cache. Retrieving and storing it before returning response..."
    );

    // here, we are going to simulate a really long api call that will be stored
    await sleep(
      Math.random() * (MAX_RESPONSE_TIME - MIN_RESPONSE_TIME) +
        MIN_RESPONSE_TIME
    );

    const redisRes = await client.hSet("userData:1", {
      id: 1,
      name: "Luan Lima Campos",
      jobTitle: "Full Stack Software Engineer",
      age: 27,
      website: "luanlcampos.vercel.app",
    });

    data = await client.hGetAll("userData:1");
    if (redisRes) {
      // set time of expiration in seconds for the key
      client.expire("userData:1", 10);
    }
  }

  res.setHeader("Cache-Control", "no-store");
  return res.json({
    data,
  });
});

export { router };
