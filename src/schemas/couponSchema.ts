import { z } from 'zod';

const couponSchema = z.object({
    coupon: z.string(),
});

export default couponSchema;