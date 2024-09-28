
import { pool } from "../db/database";
import { UpdateUser, UserUpdateSchema } from "../models/updateUserModels";
import { Users, UsersParams, UsersSchema } from "../models/usersModel";

export class UsersData {

    async getUserByUsername(username:string): Promise<Users>{
        const consult = `SELECT * FROM users WHERE username = $1`;

        const result = await pool.query(consult, [username]);

        return result.rows[0];
    }

    async getUserByEmail(email:string | undefined){
        
        const consult = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(consult, [email]);

        return result.rows[0];
    }


   
   async createUser(user:UsersParams):Promise<Users>{

    const validateData = UsersSchema.parse(user);
         

        const fields = Object.keys(validateData) as (keyof Users)[]; // ['username', 'password', 'email', 'role']
        const values = Object.values(validateData); // ['user123', 'securePass', 'user@example.com', 'user']

        const placeholders = values.map((_, index) => `$${index+1}`).join(', ');



        const insert = `INSERT INTO users(${fields.join(',' )}) VALUES (${placeholders}) RETURNING *;`;

         const result = await pool.query(insert, values);

        return  result.rows[0];
   }

   async updateUser(user:UpdateUser, userId: number): Promise<UpdateUser>{
       

     const validateData = UserUpdateSchema.parse(user);

     console.log(validateData);

     const fields = Object.keys(validateData) as (keyof UpdateUser)[];
     const values = Object.values(validateData);
     const setsFields = fields.map((key, index) =>`${key} = $${index+1}`).join(', ');
     
     values.push(userId.toString());

    

     const update = `UPDATE users SET ${setsFields} WHERE id = $${fields.length+1} RETURNING *;`;
     const result =  await pool.query(update, values);

     const updatedUser = result.rows[0];
     delete updatedUser.password;

     return updatedUser;
     

   }

   async deleteUser(userId: number){
       
       const deleted = `DELETE FROM users WHERE id = $1`;

       const result = await pool.query(deleted, [userId]);

     return result.rows[0];

   }

}

export const usersData = new  UsersData();