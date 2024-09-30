import { configDotenv } from "dotenv";
import { config } from "../config/config";
import { Pool, Client } from "pg";
 
 let mainDB = "bd_test";  

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
  // console.log("Database: ", config.db.database);
  // console.log("Loaded .env.test");
  // console.log(process.env);
    mainDB = config.db.db_test as string;
} else {
  configDotenv();
   mainDB = config.db.database as string;
}


export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: mainDB,
  user: config.db.user,
  password: config.db.password,
});

export const query = async (
  text: string,
  params?: (string | boolean | number)[]
) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error("Error on conection to database :", error);
    throw error;
  }
};

export const adminClient = new Client({
  host: config.db.host,
  port: config.db.port,
  database: "postgres",
  user: config.db.user,
  password: config.db.password,
});
