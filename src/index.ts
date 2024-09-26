import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5500;

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
