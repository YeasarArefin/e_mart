import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import CategoryModel from "@/models/Category";
import { Category } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json();
        const response = await CategoryModel.create(body);
        return sendResponse(true, 'categories uploaded successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/categories - error uploading categories", error);
        return sendResponse(false, 'error uploading categories', 500, error);
    }
}

export async function GET() {
    dbConnect();
    try {
        const categories = await CategoryModel.find({}) as Category[];
        return sendResponse(true, 'categories sent successfully', 200, categories);
    } catch (error) {
        console.log("🚀 ~ GET ~ error: /api/categories - error sending categories", error);
        return sendResponse(false, 'error sending categories', 500, error);
    }
}
