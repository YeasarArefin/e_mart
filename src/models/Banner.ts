import { Banner } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const BannerSchema: Schema<Banner> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    url: {
        type: String,
        required: [true, 'image url is required']
    }
},
    {
        timestamps: true
    }
);

const BannerModel = mongoose.models.Banner as mongoose.Model<Banner> || mongoose.model<Banner>('Banner', BannerSchema);
export default BannerModel;