import { Migration } from "../scripts/dbMigrate";
import { faker } from '@faker-js/faker';

export const up: Migration = async (params) => {
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = [];
  
  for (let i = 1; i <= 10; i++) {
    
    const username =  faker.internet.userName();
    const password =  faker.internet.password();
    const email = faker.internet.email();
    const firstName = faker.person.firstName().replace(/'/g, "''");
    const lastName = faker.person.lastName().replace(/'/g, "''");
    const role = Math.random() < 0.7 ? 'user' : 'admin';
    const createdAt = faker.date.past().toISOString();
    const updatedAt = faker.date.recent().toISOString();

      users.push(`('${username}', '${password}', '${email}', 
                 '${firstName}', '${lastName}', '${role}', 
                 '${createdAt}', '${updatedAt}')`);
    }

    const values = users.join(",\n");
    
    console.log(values);

   


  // Verificar si la tabla existe antes de insertar
  console.log("Verificando existencia de la tabla users...");
  const tableCheck = await params.context.query(`
    SELECT to_regclass('public.users') AS exists;
  `);

    console.log("Tabla users:", tableCheck.rows[0].exists);


   return params.context.query(`INSERT INTO users(username, password, email, firstname, lastname, role, createdat, updatedat ) VALUES ${values};`);
};
export const down: Migration = async (params) => {
  params.context.query(`DELETE FROM users;`);
};
