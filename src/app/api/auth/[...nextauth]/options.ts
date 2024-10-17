import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
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
                const user = await UserModel.findOne({ email: credentials.email });

                if (!user) throw new Error("This email not exists");
                if (!user.isVerified) throw new Error("You are not verified! Please sign-up again");
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordCorrect) throw new Error("Wrong Password!");

                return user;
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