import { faker } from "@faker-js/faker";
import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {

  
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const likes = [];
  
  for (let i = 1; i <= 10; i++) {
     
     const userId = Math.floor(Math.random() * 10 ) + 1;
     const postId = Math.floor(Math.random() * 10 ) + 1;
     const createdAt = faker.date.recent().toISOString();

      // Verificar si ya existe un "like" con el mismo userId y postId 
      const existingLike = await params.context.query(`
       SELECT * FROM likes WHERE userId = $1 AND postId = $2
      `, [userId, postId]);

      if (existingLike.rows.length === 0) {
        
        likes.push(`('${postId}', '${userId}','${createdAt}')`);
      }

    }

    // Verificar si la tabla existe antes de insertar
  console.log("Verificando existencia de la tabla likes...");
  const tableCheck = await params.context.query(`
    SELECT to_regclass('public.likes') AS exists;
  `);

    console.log("Tabla likes:", tableCheck.rows[0].exists);

    if(likes.length > 0){
      const values = likes.join(",\n");
       return params.context.query(`INSERT INTO likes(postid, userid, createdat) VALUES ${values};`);

    }else {
      return console.log("No se encontraron nuevos likes para insertar.");
    }

    


   


  


};
export const down: Migration = async (params) => {
  params.context.query(`DELETE FROM likes;`);
};