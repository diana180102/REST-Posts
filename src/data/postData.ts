import { pool } from "../db/database";
import { Post, PostSchema, PostSchemaParam, UpdatePostSchemaParam } from "../models/postModel";

export class PostData {


   async getPostById(postId:number):Promise<Post>{

      const consult = `SELECT * FROM posts WHERE id = $1;`;
      const result = await pool.query(consult, [postId]);

      return result.rows[0];

   }

   

   async createNewPost(post:PostSchemaParam, userId:number):Promise<Post>{

      const validateData = PostSchema.parse(post);
      const fields = Object.keys(validateData);
      const values = Object.values(validateData);

      fields.unshift('userId');
      values.unshift(userId.toString());
      
      const placeholders = values.map((_, index) => `$${index+1}`).join(', ');
      
      const insert = `INSERT INTO posts (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
       
      const result = await pool.query(insert, values);
       
       return result.rows[0];
 

   }


   async updatePost(post:UpdatePostSchemaParam , postId:number):Promise<Post>{
       
   
      const fields = Object.keys(post)[0];
      
      const updateData = `UPDATE posts SET ${fields} = $1 WHERE id = $2;`;
      const params = [post, postId];

      const result = await pool.query(updateData, params);

      return result.rows[0];


   }


   async insertLikeByPost(posId:number, userId:number){
       
       const insertLike = `INSERT INTO likes (postid, userId) VALUES ($1, $2) RETURNING *;`;
       const result =  await pool.query(insertLike, [posId, userId]);

       return result.rows[0];
   }


   async countLikesPost(postId:number){
       
       const consult =  `SELECT 
                                 posts.id,
                                 posts.content,
                                 posts.createdat AS "createdAt",
                                 posts.updatedat AS "updatedAt",
                                 users.username,
                                 COUNT(likes.id) AS "likesCount"
                              FROM 
                                 posts
                              INNER JOIN 
                                 users ON posts.userid = users.id
                              LEFT JOIN 
                                 likes ON posts.id = likes.postid
                              WHERE 
                                 posts.id = $1
                              GROUP BY 
                                 posts.id, users.username;`;

       const result = await pool.query(consult, [postId]);
      

       return result.rows[0];

   }

}


export const postData = new  PostData();
