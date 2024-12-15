import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/index";
import { configScheam } from "./config/schema/config.scheam";
import { validator } from "./lib/validationScheam";
import { IConfig } from "./config/interfaces/config.interface";
import { CustomError } from "./lib/customError";
import { ResData } from "./lib/resData";
import moduleRoutes from "./modules/module.routes";

const app = express();

app.use(cors());
app.use(express.json());

validator<IConfig>(configScheam, config);

app.use("/api", moduleRoutes.router);

app.use((req: Request, res: Response, next: NextFunction): void => {
  try {
    const message: string = `this API is not exist, URL: ${req.url} METHOD: ${req.method}`;

    throw new CustomError(404, message);
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    let statusCode = 500;
    const message = err.message || "Internal Server Error";

    if (err instanceof CustomError) {
      statusCode = err.statusCode;
    }

    const resData = new ResData<null>(statusCode, message, null);

    res.status(resData.meta.statusCode).json(resData);
  }
);

app.listen(3000, (): void => {
  console.log("http://localhost:3000");
});
