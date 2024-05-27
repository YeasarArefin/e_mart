import { z } from 'zod';

const verificationCodeSchema = z.object({
    verificationCode: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});
export default verificationCodeSchema;