import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import OrdersModel from "@/models/Order";
import { Order } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Order;
        const response = await OrdersModel.create(body);
        return sendResponse(true, 'order created successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/orders - error creating order", error);
        return sendResponse(false, 'error creating order', 400, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (id) {
            const orders = await OrdersModel.findOne({ user: id }).populate({ path: 'products' });
            return sendResponse(true, 'orders sent successfully', 200, orders);
        }
        const orders = await OrdersModel.find({}).populate({ path: 'products' }).populate('user');
        return sendResponse(true, 'orders sent successfully', 200, orders);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/orders - error sending orders", error);
        return sendResponse(false, 'error sending order', 400, error);
    }
}