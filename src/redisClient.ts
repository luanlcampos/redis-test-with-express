import { createClient } from "redis";

// create a Redis client on port 6379
const client = createClient();

export { client };
