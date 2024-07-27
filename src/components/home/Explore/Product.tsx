'use client';
import Rating from "@/components/ui/rating";
import { Product as ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import ToggleCart from "./ToggleCart";
import ToggleWishlist from "./ToggleWishlist";
export default function Product({ product }: { product: ProductType; }) {
    const { _id, name, price, rating, reviews, images, discount } = product || {};
    return (
        <div className="w-[300px] mx-auto border p-5 rounded-xl hover:shadow-2xl transition-all duration-150 relative">
            <Image src={images[0]} width={250} height={250} alt="product_pic" />
            <div >
                <Link href={`/products/${_id}`} className="font-bold hover:underline">{name}</Link>
                <h1 className="font-semibold">${price}</h1>
                <DiscountBadge discount={discount} className="absolute top-6" />
                <ToggleWishlist _id={_id || ''} icon="heart" className="absolute top-16" />
                <ToggleCart _id={_id || ''} icon="cart" className="absolute top-28" />
                <div className="flex items-center gap-x-3">
                    <Rating rating={rating} />
                    <h1>({reviews.length})</h1>
                </div>
            </div>
        </div>
    );
}
