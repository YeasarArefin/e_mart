'use client';
import Heading from "@/components/home/Heading";
import Wishlist from "@/components/wishlists/wishlist";
import WishlistLoader from "@/components/wishlists/wishlistLoader";
import { useGetWishListsWithDetailsQuery } from "@/features/api/apiSlice";
import { Product as ProductType } from "@/types/types";
import { useSession } from "next-auth/react";

export default function Wishlists() {
    const { data: session, status } = useSession();
    const { data: response, isError, isLoading, isSuccess } = useGetWishListsWithDetailsQuery(session?.user.email, {
        skip: status === "authenticated" ? false : true
    });

    const wishlists: ProductType[] = response?.data || [];
    let content;
    if (isLoading || status === 'loading') {
        content = <WishlistLoader count={5} />;
    }
    if (!isLoading && isSuccess && wishlists.length === 0) {
        content = <h1 className="font-semibold">No items in wishlist!</h1>;
    }
    if (isSuccess && !isLoading && wishlists.length > 0) {
        content = wishlists.map((product) => <Wishlist key={product._id} product={product} />);
    }

    return (
        <section>
            <div className="mb-10">
                <Heading name="Wishlists" title="Manage your wishlists here" />
            </div>
            <div className="flex flex-col gap-y-5 w-full lg:w-2/5">
                {content}
            </div>
        </section>
    );
}
