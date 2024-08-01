import { useToast } from "@/components/ui/use-toast";
import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { Product } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function AddToCart({ _id, product, className, icon }: { _id: string, product: Product, className: string, icon: "cart" | "cancel"; }) {

	const cart = useAppSelector(state => state.cart.cart) || [];
	const dispatch = useAppDispatch();
	const [addToCartApi, { isError, isLoading, isSuccess, data }] = useAddToCartApiMutation();

	const { data: session } = useSession();
	const userId = session?.user._id;
	const { toast } = useToast();

	const handleToggleCart = () => {
		dispatch(addToCart({ product, quantity: 1 }));
		addToCartApi({ userId, productId: _id, quantity: 1, mode: 'normal' });
	};

	useEffect(() => {
		if (!isLoading && isSuccess) {
			toast({
				title: "Success",
				description: data?.message,
			});
		}
		// if (isError) {
		// dispatch(toggleCart(_id));
		// }
	}, [_id, data, dispatch, isError, isLoading, isSuccess, toast]);

	return (
		<button onClick={handleToggleCart} className="flex border w-full justify-center items-center gap-x-2 py-[8px] rounded-lg bg-[#e11d48] text-white">
			<IoCartOutline className="text-xl" />
			Add To Cart
		</button>
	);
}
