import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import BannerModel from "@/models/Banner";
import { Banner } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Banner;
        const response = await BannerModel.create(body);
        return sendResponse(true, 'banner created successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/banners - error uploading banners", error);
        return sendResponse(true, 'error uploading banners', 500, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const banners = await BannerModel.find({});
        return sendResponse(true, 'banners sent successfully', 200, banners);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/banners - error sending banners", error);
        return sendResponse(true, 'error sending banners', 500, error);
    }
}