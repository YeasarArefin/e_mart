import { Category } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const CategorySchema: Schema<Category> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    }
},
    {
        timestamps: true
    });

const CategoryModel = mongoose.models.Category as mongoose.Model<Category> || mongoose.model<Category>('Category', CategorySchema);
export default CategoryModel;
