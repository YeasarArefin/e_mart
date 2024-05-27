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

        const index = user.wishlists.indexOf(productId);
        if (index !== -1) {
            user.wishlists.splice(index, 1);
        } else {
            user.wishlists.push(productId);
        }
        await user.save();
        return sendResponse(true, index !== -1 ? 'Removed from wishlist successfully' : 'Added is wishlist successfully', 200);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/wishlists - failed to update user wishlists", error);
        return sendResponse(false, 'Failed to update user wishlists', 400, error);
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
            user = await UserModel.findOne({ email }).populate('wishlists');
        } else {
            user = await UserModel.findOne({ email });
        }
        const wishlists = user?.wishlists;
        return sendResponse(true, 'wishlist sent successfully', 200, wishlists);

    } catch (error) {
        return sendResponse(false, 'failed to sent wishlists', 400, error);
    }
}