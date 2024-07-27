import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import UserModel from "@/models/User";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const { userId, productId } = await request.json() as { userId: string, productId: ObjectId; };
        console.log("🚀 ~ POST ~ productId:", productId);
        const user = await UserModel.findById(userId);
        if (!user) return sendResponse(false, 'User not found', 404);

        const index = user.cart.indexOf(productId);
        if (index !== -1) {
            user.cart.splice(index, 1);
        } else {
            user.cart.push(productId);
        }
        await user.save();
        return sendResponse(true, index !== -1 ? 'Removed from cart successfully' : 'Added in cart successfully', 200);
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