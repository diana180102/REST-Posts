import express from "express";
import dotenv from 'dotenv';
import { userRouter } from "./routes/usersRoutes";
import errorHandler from "./middlewares/error";

dotenv.config();

const app = express();
const port = 5500;

app.use(errorHandler);
app.use(express.json());
app.use('/', userRouter);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
