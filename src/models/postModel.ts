import { z } from 'zod';


export const PostSchema = z.object({
    
    content: z.string({
        required_error: "content is required",
        invalid_type_error : "content have to string"
    }),
})


export const UpdatePostSchema = PostSchema.partial();

export type PostSchemaParam = z.infer<typeof PostSchema>;
export type UpdatePostSchemaParam = z.infer<typeof UpdatePostSchema>;
export type Post = PostSchemaParam & {id: number};