import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { removeFromCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { Product as ProductType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import CartQuantityController from "./cart-quantity-controller";

export default function SingleCart({ product }: { product: ProductType; }) {

    const { _id, images, price, cartQuantity, name } = product || {};
    const subtotal = price * cartQuantity;
    const dispatch = useAppDispatch();
    const [addToCartApi, { }] = useAddToCartApiMutation();
    const { data } = useSession();
    const { user } = data || {};
    const userId = user?._id;

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        addToCartApi({ userId, productId: _id, quantity: 1, mode: 'remove' });
    };

    return (
        <div className="grid grid-cols-5 items-center justify-items-center border px-5 py-2 hover:shadow-xl duration-200 font-semibold rounded-lg">
            <div className="flex items-center">
                <Image src={images[0]} width={80} height={60} alt="product_image" />
                <h1>{name}</h1>
            </div>
            <h1>${price}</h1>
            <CartQuantityController _id={_id || ''} cartQuantity={cartQuantity} />
            <h1>${subtotal}</h1>
            <Button onClick={() => handleRemoveFromCart(_id)} className="rounded-full hover:bg-[#e11d48] bg-[#e11d48] px-2.5 py-1.5"><RxCross2 className="text-lg " /></Button>
        </div>
    );
}
