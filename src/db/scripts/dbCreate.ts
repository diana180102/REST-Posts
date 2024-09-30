// import "dotenv/config";
// import path from "path";
import { config } from "../../config/config";
import { adminClient } from "../database";
import  { configDotenv } from "dotenv";


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


const dbName = mainDB;

const createDB  = async () =>{

   await adminClient.connect();
   try {
     await adminClient.query(`CREATE DATABASE "${dbName}"`); 
     console.log(`Base de datos "${dbName}" creada exitosamente.`);
   } catch (err) {
       if(err instanceof Error) {
        console.error("Error al crear la base de datos:", err.stack);
       }
   }finally {
     await adminClient.end();
      console.log("Conexión cerrada.");
   }
}

createDB();

 
