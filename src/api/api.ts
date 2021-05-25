import express from "express";
import { AppError, handleError } from "error-api.hl/lib";
import { Service } from "../services/service";

export class Api {
  private static _api: any;

  static setup() {
    this._api = express();

    this.setupMiddlewares();

    this._api.get("/", (req, res) => {
      res.send("api working");
    });

    this._api.get("/api/v1/keys/:key", async (req, res) => {
      try {
        const service = Service.getInstance();
        const result = await service.getBy(req.params.key);
        res.send(result);
      } catch (err) {
        res.status(404);
        res.send("Key doesn't exists");
      }
    });

    return this._api;
  }

  private static setupMiddlewares() {
    this._api.use(express.json());

    // Error handling middleware, we delegate the handling to the centralized error handler
    this._api.use(async (err: Error, req, res, next) => {
      await handleError(err, res);
    });

    process.on("uncaughtException", (error: Error) => {
      handleError(error);
    });

    process.on("unhandledRejection", reason => {
      handleError(reason);
    });
  }
}
