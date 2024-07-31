'use client';
import Heading from "@/components/home/Heading";
import { useGetCartWithDetailsQuery } from "@/features/api/apiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useSession } from "next-auth/react";
import CartCalculation from "./cart-calculation";
import SingleCart from "./single-cart";

export default function Wishlists() {
    const cart = useAppSelector((state) => state.cart.cart) || [];
    const { data, status } = useSession();
    const { data: initialCart, isError: isCartError, isLoading: isCartLoading, isSuccess: isCartSuccess } = useGetCartWithDetailsQuery(data?.user?.email);

    let content;
    if (isCartLoading) {
        content = <h1>Loading...</h1>;
    } else {

        if (cart.length === 0) {
            content = <h1 className="font-semibold">No items in cart!</h1>;
        }
        if (cart.length > 0) {
            content = cart.map((product) => <SingleCart key={product._id} product={product} />);
        }
    }

    return (
        <section>
            <div className="mb-10">
                <Heading name="Cart" title="Manage your cart here" />
            </div>
            <div className="grid grid-cols-3 gap-x-5">
                <div className="col-span-2">
                    <div className="grid grid-cols-5 justify-items-center border px-5 py-2 font-bold mb-5 rounded-lg">
                        <h1>Product</h1>
                        <h1>Price</h1>
                        <h1>Quantity</h1>
                        <h1>Subtotal</h1>
                        <h1>Action</h1>
                    </div>
                    <div className="flex flex-col gap-y-5 w-full">
                        {content}
                    </div>
                </div>
                <div className="col-span-1 border rounded-lg">
                    <CartCalculation />
                </div>
            </div>
        </section>
    );
}
