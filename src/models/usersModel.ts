import {z} from 'zod';

export const UsersSchema = z.object({
    
    username: z.string({
        required_error: "username is required",
        invalid_type_error : "username have to string"
    })
    .regex(/^[a-zA-Z0-9_.-]{3,100}$/, {
        message: "Invalid username format"
    }),

    password: z.string({
        required_error: "password is required",
        invalid_type_error : "password have to string"
    })
    .min(6, "Password must be at least 6 characters long")
    .max(255, "Password must be a most 255 characters long"),

    email: z.string().email({ message: "Invalid email address" }).optional(),
    
    firstName: z.string({
        invalid_type_error : "firstName have to string"
    }).optional(),

    lastName: z.string({
        invalid_type_error : "lastName have to string"
    }).optional(),

    role: z.enum(['admin', 'user']).default('user'),



});

export type UsersParams = z.infer<typeof UsersSchema>;
export type Users = UsersParams & {id: number};