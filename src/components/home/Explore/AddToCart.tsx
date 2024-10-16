import { useToast } from "@/components/ui/use-toast";
import { useAddToCartApiMutation } from "@/features/api/apiSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { Product } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { v4 as uuid } from 'uuid';
export default function AddToCart({ _id, product }: { _id: string, product: Product, className: string, icon: "cart" | "cancel"; }) {

	const cart = useAppSelector(state => state.cart.cart) || [];
	const dispatch = useAppDispatch();
	const [addToCartApi, { isError, isLoading, isSuccess, data }] = useAddToCartApiMutation();

	const { data: session } = useSession();
	const userId = session?.user._id;
	const { toast } = useToast();

	const handleToggleCart = () => {
		const cartId = uuid();
		const newProduct = { ...product, cartId, colors: [product.colors[0]], size: [product.size[0]] };
		const apiPayload = { userId, productId: _id, cartId, quantity: 1, color: product.colors[0], size: product.size[0], mode: 'add' };
		dispatch(addToCart({ product: newProduct, quantity: 1 }));
		addToCartApi(apiPayload);
	};

	useEffect(() => {
		if (!isLoading && isSuccess) {
			toast({
				title: "Success",
				description: data?.message,
			});
		}

	}, [_id, data, dispatch, isError, isLoading, isSuccess, toast]);

	return (
		<button onClick={handleToggleCart} className="flex border w-full justify-center items-center gap-x-2 py-[8px] rounded-lg bg-primary_red text-white">
			<IoCartOutline className="text-xl" />
			Add To Cart
		</button>
	);
}
