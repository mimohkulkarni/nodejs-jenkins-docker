import express, {
  Application,
  ErrorRequestHandler,
  Request,
  Response,
} from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import swaggerJSDoc from "swagger-jsdoc";
import APIError from "./api-error";
import { preditWheather } from "./wheather";
import path from "path";

const app: Application = express();
app.use(express.json());

const swaggerDefinition = yaml.load("./apidoc/swagger.yaml");
const options = {
  swaggerDefinition,
  apis: ["./apidoc/swagger.yaml"],
};
const swaggerDocument = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("/predict-wheather", async (req: Request, res: Response) => {
  try {
    const city = req.query.city;
    if (city && city !== "null") {
      const wheather = await preditWheather(String(city));
      return res.send(wheather);
    }
    return res.status(400).send({ message: "City name is required" });
  } catch (err: any) {
    console.log(err);
    if (err instanceof APIError) {
      res.status(err.statusCode).send({ message: err.message, code: err.code });
    } else {
      res.status(400).send({ message: err.message, code: "ERROR_CODE" });
    }
  }
});

export default app;
