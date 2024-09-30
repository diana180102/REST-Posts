import express from "express";
import dotenv, { configDotenv } from 'dotenv';
import { userRouter } from "./routes/usersRoutes";
import errorHandler from "./middlewares/error";
import { postRouter } from "./routes/postsRoutes";

// import { config } from "./config/config";

dotenv.config();

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
  // console.log("Database: ", config.db.database);
  // console.log("Loaded .env.test");
  // console.log(process.env);
} else {
  configDotenv();
}

export const app = express();
const port = 5500;

app.use(express.json());
app.use('/', userRouter);
app.use('/', postRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
