import { useAppSelector } from "@/lib/hooks/hooks";

export default function CartCalculation() {
    const cart = useAppSelector(state => state.cart.cart);

    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const price = product.price * product.cartQuantity;
        subTotal += price;
    }

    const total = (subTotal + (subTotal * (7 / 100))) + 60;

    return (
        <div className="p-6">
            <h1 className="mb-7 font-black text-2xl">Cart Total</h1>
            <div className="flex flex-col gap-y-3 font-bold">
                <div className="flex justify-between">
                    <h1>Subtotal</h1>
                    <h1 className="w-14">${subTotal}</h1>
                </div>
                <div className="flex justify-between">
                    <h1>Shipping</h1>
                    <h1 className="w-14">$60</h1>
                </div>
                <div className="flex justify-between">
                    <h1>Tax</h1>
                    <h1 className="w-14">8%</h1>
                </div>
                <div className="flex justify-between">
                    <h1>Total</h1>
                    <h1 className="w-14">${total}</h1>
                </div>
            </div>
        </div>
    );
}
