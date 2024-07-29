'use client';
import Heading from "@/components/home/Heading";
import { useGetCartWithDetailsQuery } from "@/features/api/apiSlice";
import { Product as ProductType } from "@/types/types";
import { useSession } from "next-auth/react";

export default function Wishlists() {
    const { data: session, status } = useSession();
    const { data: response, isError, isLoading, isSuccess } = useGetCartWithDetailsQuery(session?.user.email, {
        skip: status === "authenticated" ? false : true
    });

    const cart: ProductType[] = response?.data || [];
    let content;
    if (isLoading || status === 'loading') {
        content = <h1>Loading...</h1>;
    }
    if (!isLoading && isSuccess && cart.length === 0) {
        content = <h1 className="font-semibold">No items in cart!</h1>;
    }
    if (isSuccess && !isLoading && cart.length > 0) {
        content = cart.map((product) => <h1 key={product._id}>Cart.</h1>);
    }

    return (
        <section>
            <div className="mb-10">
                <Heading name="Cart" title="Manage your cart here" />
            </div>
            <div className="flex flex-col gap-y-5 w-full lg:w-2/5">
                {content}
            </div>
        </section>
    );
}
