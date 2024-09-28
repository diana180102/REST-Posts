
import { NextFunction, Request, Response } from "express";
import { usersService } from "../services/usersService";
import { ApiError } from "../middlewares/error";
import { UsersSchema } from "../models/usersModel";
import { loginSchema } from "../models/loginModel";
import { AuthencatedRequest } from "../middlewares/authentication";

export class UsersController{
   
   async getUserByUsername(req: AuthencatedRequest, res:Response, next:NextFunction){
       

       try {
         
         const username = req.user?.username;

         if(!username){
             return next(new ApiError("User not found", 404));
         }
         const data = await usersService.getUserByUsername(username);


         const {password, ...restData} = data;

         res.status(200).json({
            ok: true,
            data: restData
         });
          
       } catch (error) {
          next(new ApiError("username not found", 400)); 
       }
   
   }

   async createUser(req: Request, res:Response, next:NextFunction){

      try {
         
         const userData = UsersSchema.parse(req.body);
         const data = await usersService.createUser(userData);

         res.status(200).json({
            ok: true,
            message: "User created success",
            data: data
         });

      } catch (error) {
         // next(new ApiError("Error creating user", 400));
         next(error);
      }
   }

   async loginUser(req:Request, res:Response, next:NextFunction){
      try {
         
         const credentials = loginSchema.parse(req.body);
         
         const token = await usersService.loginUser(credentials.username, credentials.password);
          
          if(token){
            res.status(200).json({
               ok: true,
               data: token
            });
          }
      } catch (error) {
         next(error);
      }
   }


   async updateUser(req:AuthencatedRequest, res:Response, next:NextFunction){
       
       try {
         const body = req.body;
         const username = req.user?.username;

         if(!username){
            return next(new ApiError("User not found", 404));
         }
          
         const data = await usersService.updateUser(body, username);
        
         
          
          res.status(200).json({
            ok: true,
            message: "Profile updated successfully",
            data: data
          });
       } catch (error) {
          return next (error);
       }

   }
}

export const usersController = new UsersController();