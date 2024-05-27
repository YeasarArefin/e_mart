import { NextResponse } from "next/server";

export default function sendResponse(success: boolean, message: string, status: number, data?: any) {
    return NextResponse.json({ success, message, data }, { status });
}