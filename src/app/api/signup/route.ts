import dbConnect from "@/lib/dbConnect";
import { default as sendEmail } from "@/lib/sendEmail";
import sendResponse from "@/lib/sendResponse";
import UserModel from "@/models/User";
import { User } from "@/types/types";
import bcrypt from 'bcryptjs';
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { name, email, password } = await request.json() as User;
        const existingVerifiedUserByEmail = await UserModel.findOne({
            email
        });

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const from = process.env.SMTP_EMAIL || '';
        const subject = 'E-mart || Email verification code';

        if (existingVerifiedUserByEmail) {
            if (existingVerifiedUserByEmail.isVerified === true) {
                return sendResponse(false, 'User already exists', 400);
            } else if (existingVerifiedUserByEmail.isVerified === false) {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingVerifiedUserByEmail.name = name;
                existingVerifiedUserByEmail.password = hashedPassword;
                existingVerifiedUserByEmail.verificationCode = verificationCode;
                existingVerifiedUserByEmail.verificationCodeExpiry = new Date(Date.now() + 3600000);
                await existingVerifiedUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword,
                verificationCode,
                verificationCodeExpiry: expiryDate,
                isVerified: false,
                isAdmin: false,
            });

            await newUser.save();
        }
        await sendEmail(from, email, subject, `Verification code: ${verificationCode}`);
        return sendResponse(true, 'user created successfully', 200);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/signup - error signing up user", error);
        return sendResponse(false, 'error signing up user', 400, error);
    }
}