import Cart from "@/components/cart/cart";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart | Exclusive Mart",
    description: "Largest Online Store",
};

export default function page() {
    return (
        <div>
            <Cart />
        </div>
    );
}
