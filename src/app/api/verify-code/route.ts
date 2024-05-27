import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const { verificationCode, email } = await request.json() as { verificationCode: string, email: string; };
        const user = await UserModel.findOne({ email });
        const currentTime = new Date();
        if (!user) return sendResponse(false, 'User not exists', 401);
        const expiryDate: Date = new Date(user.verificationCodeExpiry);

        if (currentTime > expiryDate) return sendResponse(false, 'Verification code expired', 500);

        if (verificationCode === user.verificationCode) {
            user.isVerified = true;
            await user.save();
            return sendResponse(true, 'user verified successfully', 200);
        } else {
            return sendResponse(false, 'wrong verification code', 400);
        }

    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error);
        return sendResponse(false, 'User Verification Failed', 500);
    }

}