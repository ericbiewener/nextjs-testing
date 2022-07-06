import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from "fastify-cors";
import next from "next";

const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms));

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handleNextRequest = app.getRequestHandler();

app.prepare().then(() => {
  const server = fastify().register(fastifyCors);

  server.get("/abort-controller", async (request, reply) => {
    await sleep(10000);
    return { abortController: true };
  });

  server.all("/*", {}, async (req: FastifyRequest, reply: FastifyReply) => {
    await handleNextRequest(req.raw, reply.raw);
    reply.sent = true;
  });

  server.listen(8080, (e, address) => {
    if (e) {
      console.error(e);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
});

export {};
