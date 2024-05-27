import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import CouponModel from "@/models/Coupon";
import { Coupon } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Coupon;
        const response = await CouponModel.create(body);
        return sendResponse(true, 'coupon created successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/coupons - error creating coupon", error);
        return sendResponse(false, 'error creating coupon', 500, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        if (code) {
            const coupon = await CouponModel.findOne({ code });
            if (!coupon) return sendResponse(false, 'coupon not found', 404);

            const isNotExpiredCode = coupon.expiryDate > new Date();
            if (isNotExpiredCode) sendResponse(true, 'coupon', 200, coupon);
            return sendResponse(false, 'coupon expired', 400);
        }
        const coupon = await CouponModel.find({});
        return sendResponse(true, 'coupon sent successfully', 200, coupon);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/coupons - error sending coupon", error);
        return sendResponse(false, 'error sending coupon', 500, error);
    }

}