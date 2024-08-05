import { compareProducts } from "@/lib/compareProducts";
import dbConnect from "@/lib/dbConnect";
import sendResponse from "@/lib/sendResponse";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import { Product } from "@/types/types";
import { NextRequest } from "next/server";

interface Request {
    userId: string,
    cartId: string,
    productId: string,
    quantity: number,
    mode: 'add' | 'increase' | 'decrease' | 'remove';
    size: string,
    color: string,
    product: Product;
}

export async function POST(request: NextRequest) {
    dbConnect();
    try {
        const { userId, productId, cartId, quantity, size, color, mode, product } = await request.json() as Request;

        let user = await UserModel.findById(userId);
        if (!user) return sendResponse(false, 'User not found', 404);

        const existingSameProductIndex = user.cart.findIndex((pd) => pd.cartId === cartId);
        let response;

        if (mode === 'add') {
            const productToAdd = await ProductModel.findById(productId).lean();
            if (!productToAdd) return sendResponse(false, 'Product not found', 404);

            productToAdd.colors = [color];
            productToAdd.size = [size];
            productToAdd.cartId = cartId;
            productToAdd.cartQuantity = quantity;

            let existingIndex = -1;
            for (let i = 0; i < user.cart.length; i++) {
                const existingProduct = user.cart[i];
                console.log("🚀 ~ POST ~ existingProduct:", existingProduct);
                console.log("🚀 ~ POST ~ productToAdd:", productToAdd);
                const isSame = compareProducts(existingProduct, productToAdd);
                if (isSame) {
                    existingIndex = i;
                    break;
                }
            }

            if (existingIndex > -1) {
                user.cart[existingIndex].cartQuantity += quantity;
            } else {
                user.cart.push(productToAdd);
            }

            response = (existingIndex > -1 ? 'Product quantity updated successfully' : 'Added to Cart successfully');

        } else if (mode === 'increase') {

            user.cart[existingSameProductIndex].cartQuantity += quantity;
            response = 'Product quantity updated successfully';

        } else if (mode === 'decrease') {

            user.cart[existingSameProductIndex].cartQuantity -= quantity;
            response = 'Product quantity updated successfully';

        } else if (mode === 'remove') {

            user.cart = user.cart.filter((pd) => pd.cartId !== cartId);
            response = 'Product removed successfully';

        }

        await UserModel.findOneAndUpdate({ _id: userId }, user);
        return sendResponse(true, response, 200);

    } catch (error) {
        console.log("🚀 ~ POST ~ error: /api/cart - failed to update user cart", error);
        return sendResponse(false, 'Failed to update user cart', 400, error);
    }
}

export async function GET(request: NextRequest) {
    dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email') || '';
        const property = searchParams.get('property') || '';
        let user;
        if (property === 'true') {
            user = await UserModel.findOne({ email }).populate('cart');
        } else {
            user = await UserModel.findOne({ email });
        }
        const cart = user?.cart || [];
        return sendResponse(true, 'cart sent successfully', 200, cart);

    } catch (error) {
        return sendResponse(false, 'failed to sent cart', 400, error);
    }
}