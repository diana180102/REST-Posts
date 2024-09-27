import {ZodSchema, ZodError, ZodIssue} from "zod";
import { ApiError } from "./error";
import { NextFunction, Request, Response } from "express";

// The function takes a schema as a parameter
export function validationHandler<T> (schema: ZodSchema<T>){
    return async (req: Request, _res: Response, next: NextFunction) =>{
        try {
             
            const body = schema.parse(req.body); // It's do a validation about a schema
            req.body = body;
            next();
        } catch (error) {
            if (error instanceof ZodError){
                next(new ApiError("Error of validation", 400, formatIssues(error.issues))
                );
            }else{
                next(error);
            }
        }
    };
}


function formatIssues(issues:ZodIssue[]){
    const formattedIssues: Record<string, string> = {};

    issues.forEach((issues)=>{
        /*  Transform the path in a string with dots. "user.email" 
            The Path indicates in the field that an error
        */
        formattedIssues[issues.path.join(".")] = issues.message; 
    });

    return formattedIssues;
}

