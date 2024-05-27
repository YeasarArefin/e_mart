import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import ProductModel from "@/models/Product";
import { Product } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Product;
        const response = await ProductModel.create(body);
        return sendResponse(true, 'product uploaded successfully', 200, response);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/products - error uploading product", error);
        return sendResponse(false, 'error uploading product', 500, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get('id');
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        if (_id) {
            const product = await ProductModel.findById(_id).populate('category', 'name image -_id');
            if (product) return sendResponse(true, 'product sent successfully', 200, product);
            return sendResponse(false, 'product not found', 404);
        }
        const products = await ProductModel.find({}).populate('category', 'name image -_id').skip(skip).limit(limit);
        return sendResponse(true, `products sent successfully - items : ${products?.length}`, 200, products);
    } catch (error) {
        console.log("🚀 ~ GET ~ error: /api/products - error sending product", error);
        return sendResponse(false, 'error sending product', 500, error);
    }
}

export async function DELETE(request: NextRequest) {
    dbConnect();
    try {
        const { _id } = await request.json() as { _id: string; };
        await ProductModel.findByIdAndDelete(_id);
        return sendResponse(true, 'product deleted successfully', 200);
    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/products - error deleting product");
        return sendResponse(false, 'error sending product', 500, error);
    }
}

export async function PUT(request: NextRequest) {
    dbConnect();
    try {
        const body = await request.json() as Product;
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            body._id,
            body,
            { new: true }
        );
        if (!updatedProduct) {
            return sendResponse(false, 'Product not found', 404);
        }
        return sendResponse(true, 'Product updated successfully', 200, updatedProduct);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/products - error updating product", error);
        return sendResponse(false, 'error updating product', 500, error);
    }
}