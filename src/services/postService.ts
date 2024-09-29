import { postData } from "../data/postData";
import { usersData } from "../data/usersData";
import { ApiError } from "../middlewares/error";
import { Post, PostSchemaParam, UpdatePostSchemaParam} from "../models/postModel";

export class PostService {

  async getPostById(postId:number){
      return await postData.getPostById(postId);
   }
  
  async createNewPost(post: PostSchemaParam, username: string): Promise<Post> {
    const user = await usersData.getUserByUsername(username);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const newPost = await postData.createNewPost(post, user.id); // created post
    const dataPost = await postData.countLikesPost(newPost.id); // find data post
  

    return dataPost;
  }

   async updatePost(post:UpdatePostSchemaParam , postId:number){

     
      
          await postData.updatePost(post, postId);
      const dataPostUpdate = await postData.countLikesPost(postId); 

      return dataPostUpdate ;
   }

   async insertLikeByPost(postId:number, username:string){
      
      const user =  await usersData.getUserByUsername(username);
      const post = await postData.getPostById(postId);
      
       
      if(!user){
         throw new ApiError("User not found", 404);
      }

      if(!post){
        throw new ApiError("Post not found", 404);
      }

          await postData.insertLikeByPost(post.id, user.id );
        const newLike = await postData.countLikesPost(postId); 

      return newLike;
            
   
   }

     async deleteLikeByPost(postId:number, username:string){
      
      const user =  await usersData.getUserByUsername(username);
      const post = await postData.getPostById(postId);
      
       
      if(!user){
         throw new ApiError("User not found", 404);
      }

      if(!post){
        throw new ApiError("Post not found", 404);
      }
         
      const like = await postData.getLikeByPost(post.id, user.id);

          if(like === 0){
            throw new ApiError("Post does not have a like from you", 404);
          }
          
          await postData.deleteLikeByPost(post.id, user.id );
          const newLike = await postData.countLikesPost(postId);

         

      return newLike;
            
   
   }


   async getPostByUsername(username:string, page: number, limit:number, sort:string){
        
        // Si el username se proporciona, se busca al usuario
        if (username) {
            const user = await usersData.getUserByUsername(username);
            
            if (!user) {
                throw new ApiError("User not found", 404);
            }
        }

    
        
        
        const filters = username ? {username} : {};
        const posts = await postData.getPostByUsername(filters, sort, page, limit );
        const totalPost = await postData.getCountPostByUser(filters);

        return {posts, totalPost};
  }


   
}



export const postService = new PostService();
