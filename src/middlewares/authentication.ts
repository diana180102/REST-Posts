import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from './error';
import { config } from '../config/config';


export interface AuthencatedRequest extends Request{
   user?:{ 
    username: string;
    email: string;
    role: string;
   }  
}

export function authentication (req: AuthencatedRequest, res: Response, next:NextFunction){
    
    const authHeader = req.headers['authorization']; // Toma el token que se le manda por la solicitud HTTP 
    const token = authHeader?.split(' ')[1];; //Obtiene el token sin el bearer
    
    if(!token){
       next(new ApiError("Unauthorized: No token provided", 401));
    }


    try {
     const payload = jwt.verify(token as string, config.secret.key as string);
     req.user = payload as AuthencatedRequest['user'];
     
     return next();
    } catch (error) {
        next(new ApiError("Unauthorized: Invalid token", 403));
    }



}