'use client';
import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { decreaseCart, increaseCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function CartQuantityController({ _id, cartQuantity }: { _id: string, cartQuantity: number; }) {

	const [addToCartApi, { }] = useAddToCartApiMutation();
	const dispatch = useAppDispatch();
	const { data } = useSession();
	const { user } = data || {};
	const userId = user?._id;

	const handelIncreaseCartQuantity = () => {
		dispatch(increaseCart(_id));
		addToCartApi({ userId, productId: _id, quantity: 1, mode: 'increase' });
	};

	const handelDecreaseCartQuantity = () => {
		dispatch(decreaseCart(_id));
		addToCartApi({ userId, productId: _id, quantity: 1, mode: 'decrease' });
	};

	return (
		<div className="flex gap-x-3 items-center font-bold">
			<Button onClick={handelDecreaseCartQuantity} variant="outline" size="icon" className="text-xl">-</Button>
			<span>{cartQuantity}</span>
			<Button onClick={handelIncreaseCartQuantity} variant="outline" size="icon" className="text-lg">+</Button>
		</div>
	);
}
