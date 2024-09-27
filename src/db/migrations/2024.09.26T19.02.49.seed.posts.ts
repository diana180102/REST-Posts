import { faker } from "@faker-js/faker";
import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const posts = [];
  
  for (let i = 1; i <= 10; i++) {
     
     const userId = Math.floor(Math.random() * 10 ) + 1;
     const content = faker.lorem.paragraphs();
     const createdAt = faker.date.past().toISOString();
     const updatedAt = faker.date.recent().toISOString();
    

      posts.push(`('${userId}', '${content}', 
                   '${createdAt}', '${updatedAt}')`);
    }

    const values = posts.join(",\n");

   


  // Verificar si la tabla existe antes de insertar
  console.log("Verificando existencia de la tabla posts...");
  const tableCheck = await params.context.query(`
    SELECT to_regclass('public.posts') AS exists;
  `);

    console.log("Tabla posts:", tableCheck.rows[0].exists);


   return params.context.query(`INSERT INTO posts(userid, content, createdat, updatedat ) VALUES ${values};`);
};
export const down: Migration = async (params) => {
  params.context.query(`DELETE FROM posts;`);
};
