import { useToast } from "@/components/ui/use-toast";
import { useToggleCartApiMutation } from "@/features/api/apiSlice";
import { toggleCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { cn } from "@/lib/utils";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function ToggleCart({ _id, className, icon }: { _id: string, className: string, icon: "cart" | "cancel"; }) {

	const cart = useAppSelector(state => state.cart.cart) || [];
	const dispatch = useAppDispatch();
	const existsInWishlist = cart?.includes(_id);
	const [toggleCartApi, { isError, isLoading, isSuccess, data }] = useToggleCartApiMutation();

	const { data: session } = useSession();
	const userId = session?.user._id;
	const { toast } = useToast();

	const handleToggleCart = () => {
		dispatch(toggleCart(_id));
		toggleCartApi({ userId, productId: new mongoose.Types.ObjectId(_id) });
	};

	useEffect(() => {
		if (!isLoading && isSuccess) {
			toast({
				title: "Success",
				description: data?.message,
			});
		}
		if (isError) {
			dispatch(toggleCart(_id));
		}
	}, [_id, data, dispatch, isError, isLoading, isSuccess, toast]);

	return (
		<button onClick={handleToggleCart} className={cn('p-2 rounded-full border cursor-pointer hover:bg-[#e11d48] hover:text-white outline-none transition-all duration-100', className, { 'bg-[#e11d48] text-white': existsInWishlist, 'bg-white text-black': !existsInWishlist })}>
			{icon === 'cart' && <IoCartOutline className="text-xl" />}
			{icon === 'cancel' && <RxCross2 className="text-lg" />}
		</button>
	);
}
