import { FastifyError, FastifyInstance } from "fastify";
import { BadRequest } from "./routes/_errors/badRequest";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, response) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: `Error during validation`,
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BadRequest) {
    return response.status(400).send({ message: error.message });
  }

  return response.status(500).send({ message: "Internal server error" });
};
