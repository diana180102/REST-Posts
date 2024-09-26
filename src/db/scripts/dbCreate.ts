import "dotenv/config";
import { config } from "../../config/config";
import { adminClient } from "../database";


const dbName = config.db.database;

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

 
