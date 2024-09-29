import express from "express";
import dotenv from 'dotenv';
import { userRouter } from "./routes/usersRoutes";
import errorHandler from "./middlewares/error";
import { postRouter } from "./routes/postsRoutes";

dotenv.config();

const app = express();
const port = 5500;

app.use(express.json());
app.use('/', userRouter);
app.use('/', postRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
