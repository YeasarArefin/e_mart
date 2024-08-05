import { Product, Review } from "@/types/types";
import mongoose, { Schema } from "mongoose";
import CategoryModel from "./Category";

const ReviewSchema: Schema<Review> = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
    },
    review: {
        type: String
    }
});

export const ProductSchema: Schema<Product> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    images: {
        type: [String],
        required: [true, 'images is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    stocks: {
        type: Number,
        required: [true, 'stocks is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: CategoryModel.modelName,
        required: [true, 'category is required']
    },
    brand: {
        type: String,
        required: [true, 'brand is required']
    },
    discount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [ReviewSchema],
    featured: {
        type: Boolean,
        default: false
    },
    size: {
        type: [String],
        default: []
    },
    colors: {
        type: [String],
        default: []
    },
    cartQuantity: {
        type: Number,
        default: 0
    },
    cartId: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true
    }
);

const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || (mongoose.model<Product>('Product', ProductSchema));
export default ProductModel;
