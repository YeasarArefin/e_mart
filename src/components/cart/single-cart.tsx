import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { removeFromCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { Product as ProductType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import CartQuantityController from "./cart-quantity-controller";

export default function SingleCart({ product }: { product: ProductType; }) {

    const { _id, images, price, cartQuantity, name, colors, size, cartId } = product || {};
    const subtotal = price * cartQuantity;
    const dispatch = useAppDispatch();
    const [addToCartApi, { }] = useAddToCartApiMutation();
    const { data } = useSession();
    const { user } = data || {};
    const userId = user?._id;

    const handleRemoveFromCart = () => {
        cartId && dispatch(removeFromCart(cartId));
        addToCartApi({ userId, productId: _id, cartId, quantity: 1, mode: 'remove' });
    };

    return (
        <div className="grid grid-cols-6 items-center justify-items-center border px-5 py-2 hover:shadow-xl duration-200 font-semibold rounded-lg">
            <div className="flex items-center col-span-2">
                <Image src={images[0]} width={80} height={60} alt="product_image" />
                <div>
                    <Link href={`/products/${_id}`} className="text-lg hover:underline">
                        {name}
                    </Link>
                    <div className="capitalize flex font-medium gap-x-2 text-[12px]">
                        <span>color: {colors[0]}</span>
                        <h1>size: <span className="uppercase">{size[0]}</span></h1>
                    </div>
                </div>
            </div>
            <h1>${price}</h1>
            <CartQuantityController cartId={cartId || ''} cartQuantity={cartQuantity} />
            <h1>${subtotal}</h1>
            <Button onClick={handleRemoveFromCart} className="rounded-full hover:bg-primary_red bg-primary_red px-2.5 py-1.5"><RxCross2 className="text-lg " /></Button>
        </div>
    );
}
