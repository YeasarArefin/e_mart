'use client';
import { Product as ProductType } from "@/types/types";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import DiscountBadge from "./DiscountBadge";
import ToggleWishlist from "./ToggleWishlist";
export default function Product({ product }: { product: ProductType; }) {
    const { _id, name, price, rating, reviews, images, discount } = product || {};
    return (
        <div className="w-[300px] mx-auto border p-5 rounded-xl hover:shadow-2xl transition-all duration-150 relative">
            <Image src={images[0]} width={250} height={250} alt="product_pic" />
            <div >
                <h1 className="font-bold">{name}</h1>
                <h1 className="font-semibold">${price}</h1>
                <DiscountBadge discount={discount} className="absolute top-5" />
                <ToggleWishlist _id={_id || ''} icon="heart" className="absolute top-14" />
                <div className="flex items-center gap-x-3">
                    <ReactStars
                        value={rating}
                        size={24}
                        edit={false}
                        activeColor="#ffd700"
                    />
                    <h1>({reviews.length})</h1>
                </div>
            </div>
        </div>
    );
}
