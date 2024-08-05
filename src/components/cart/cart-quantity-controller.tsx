'use client';
import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { decreaseCart, increaseCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function CartQuantityController({ cartId, cartQuantity }: { cartId: string, cartQuantity: number; }) {

	const [addToCartApi, { }] = useAddToCartApiMutation();
	const dispatch = useAppDispatch();
	const { data } = useSession();
	const { user } = data || {};
	const userId = user?._id;
	const cart = useAppSelector((state) => state.cart.cart);

	const handelIncreaseCartQuantity = () => {
		dispatch(increaseCart(cartId));
		addToCartApi({ userId, cartId, quantity: 1, mode: 'increase' });
	};

	const handelDecreaseCartQuantity = () => {
		const productQuantity = cart.filter((pd) => pd.cartId === cartId)[0].cartQuantity;
		if (productQuantity > 1) {
			dispatch(decreaseCart(cartId));
			addToCartApi({ userId, cartId, quantity: 1, mode: 'decrease' });
		}
	};

	return (
		<div className="flex gap-x-3 items-center font-bold">
			<Button onClick={handelDecreaseCartQuantity} variant="outline" size="icon" className="text-xl">-</Button>
			<span>{cartQuantity}</span>
			<Button onClick={handelIncreaseCartQuantity} variant="outline" size="icon" className="text-lg">+</Button>
		</div>
	);
}
