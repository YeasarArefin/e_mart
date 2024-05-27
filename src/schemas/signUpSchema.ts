import { z } from 'zod';

const signUpSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6)
});
export default signUpSchema;
