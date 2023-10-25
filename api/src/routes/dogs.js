const { Router } = require("express");
const {
  createDogHandler,
  getDogHandler,
  getDogIdHandler,
} = require("../handlers/handlersdogs");

const dogsRouter = Router();

dogsRouter.get("/", getDogHandler);
dogsRouter.get("/:id", getDogIdHandler);
dogsRouter.post("/", createDogHandler);

module.exports = dogsRouter;
