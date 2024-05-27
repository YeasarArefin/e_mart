import { Order } from "@/types/types";
import mongoose, { Schema } from "mongoose";
import ProductModel from "./Product";
import UserModel from "./User";

const OrderSchema: Schema<Order> = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: [true, 'user must need']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: ProductModel.modelName
    }],
    payment: {
        type: Number,
        required: true
    },
    usedCoupon: {
        type: String,
        default: '',
    }
},
    {
        timestamps: true
    }
);

const OrdersModel = mongoose.models.Order as mongoose.Model<Order> || mongoose.model<Order>('Order', OrderSchema);
export default OrdersModel;