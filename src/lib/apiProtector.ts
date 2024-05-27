import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import sendResponse from "./sendResponse";

export default async function apiProtector() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return sendResponse(false, "not authenticated", 401);
}
