import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const { userId, productId, quantity, mode } = await request.json() as { userId: string, productId: string, quantity: number, mode: 'normal' | 'increase' | 'decrease'; };

        let user = await UserModel.findById(userId);
        if (!user) return sendResponse(false, 'User not found', 404);

        const productIndex = user.cart.findIndex((pd) => pd._id.toString() === productId);
        if (mode === 'normal') {
            if (productIndex > -1) {
                user.cart[productIndex].cartQuantity += quantity;
            } else {
                const product = await ProductModel.findById(productId);
                if (!product) return sendResponse(false, 'Product not found', 404);
                user.cart.push(product);
            }
        }

        await UserModel.findOneAndUpdate({ _id: userId }, user);
        return sendResponse(true, (productIndex > -1 ? 'Product quantity updated successfully' : 'Added to Cart successfully'), 200);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/cart - failed to update user cart", error);
        return sendResponse(false, 'Failed to update user cart', 400, error);
    }

}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email') || '';
        const property = searchParams.get('property') || '';
        let user;
        if (property === 'true') {
            user = await UserModel.findOne({ email }).populate('cart');
        } else {
            user = await UserModel.findOne({ email });
        }
        const cart = user?.cart || [];
        return sendResponse(true, 'cart sent successfully', 200, cart);

    } catch (error) {
        return sendResponse(false, 'failed to sent cart', 400, error);
    }
}