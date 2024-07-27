import { ObjectId } from "mongoose";

export type Product = {
    _id?: string;
    name: string,
    description: string,
    images: string[];
    price: number,
    discount: number,
    rating: number,
    reviews: [],
    stocks: number,
    featured: boolean,
    brand: string,
    category: ObjectId,
    colors: string[],
    size: string[];
};

export type Category = {
    _id?: string,
    name: string,
    image: string;
};

export type Banner = {
    _id?: string,
    name: string,
    url: string;
};

export type Coupon = {
    _id?: string,
    name: string,
    code: string,
    expiryDate: Date,
    discount: number;
};

export type User = {
    name: string,
    email: string,
    password: string,
    verificationCode: string,
    verificationCodeExpiry: Date,
    isVerified: boolean,
    isAdmin: boolean,
    cart: ObjectId[],
    cart: ObjectId[],
    usedCoupons: string[];
};

export type Order = {
    user: ObjectId,
    products: ObjectId[],
    payment: number,
    usedCoupon: string;
};

export type Review = {
    user: ObjectId,
    review: string,
};

export type SignUpFormData = {
    name: string,
    email: string,
    password: string;
};

export type SignInFormData = {
    email: string,
    password: string;
};

export type VerificationCodeFromData = {
    email: string;
    verificationCode: string;
};
