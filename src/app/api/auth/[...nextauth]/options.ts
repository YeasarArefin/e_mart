import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
            id: 'Credentials',
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any): Promise<any> {
                dbConnect();
                try {
                    const user = await UserModel.findOne({ email: credentials.email });
                    if (!user) return sendResponse(false, 'user not found', 404);
                    if (!user.isVerified) return sendResponse(false, 'verify your account first', 401);
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('incorrect password');
                    }
                } catch (error) {
                    console.log("🚀 ~ authorize ~ error: /api/auth - wrong email/password", error);
                    return sendResponse(false, 'wrong email/password', 400, error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString(); // Convert ObjectId to string
                token.name = user.name;
                token.isVerified = user.isVerified;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAdmin = token.isAdmin;
                session.user.name = token.name;
            }
            return session;
        },
    }
};