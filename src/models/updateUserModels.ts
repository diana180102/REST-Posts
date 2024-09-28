import { z } from 'zod';


export const UserUpdateSchema = z.object ({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    
    firstName: z.string({
        invalid_type_error : "firstName have to string"
    }).optional(),

    lastName: z.string({
        invalid_type_error : "lastName have to string"
    }).optional(),
});


export type UpdateUser = z.infer <typeof UserUpdateSchema>;