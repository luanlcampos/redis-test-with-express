import { app } from "./app";

const server = app.listen(8080, () => {
  console.log("listening on port 8080");
});

export { server };
