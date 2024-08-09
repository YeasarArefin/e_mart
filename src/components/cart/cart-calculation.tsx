import { appUrl } from "@/constants/appUrl";
import { useAppSelector } from "@/lib/hooks/hooks";
import { ApiResponse } from "@/types/ApiResponse";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
export default function CartCalculation() {
    const cart = useAppSelector(state => state.cart.cart);
    const [coupon, setCoupon] = useState({
        coupon: '',
        disabled: true,
        loading: false,
        error: '',
        success: false,
        discount: 0,
    });

    const handleCoupon = (e: ChangeEvent<HTMLInputElement>) => {
        setCoupon((prev) => ({ ...prev, coupon: e.target.value }));
    };

    const addCoupon = async () => {
        if (coupon.coupon === '') {
            return;
        }
        try {
            setCoupon((prev) => ({ ...prev, loading: true }));
            const res = await fetch(`${appUrl}api/coupons?code=${coupon.coupon}`);
            const responseData = await res.json() as ApiResponse;
            if (responseData?.success) {
                setCoupon((prev) => ({ ...prev, loading: false, success: true, discount: responseData.data.discount }));
            }
            console.log("🚀 ~ addCoupon ~ response:", responseData);
        } catch (error) {

        }
    };

    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const price = product.price * product.cartQuantity;
        subTotal += price;
    }

    let total;
    if (coupon.discount > 0) {
        const calculateTotal = (subTotal + (subTotal * (7 / 100)));
        total = (calculateTotal - (calculateTotal * (coupon.discount / 100))) + 60;
    } else {
        total = (subTotal + (subTotal * (7 / 100)));
    }


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
                {
                    coupon.discount > 0 && <div className="flex justify-between">
                        <h1>Coupon</h1>
                        <h1 className="w-14">{coupon.discount}%</h1>
                    </div>
                }
                <div className="flex items-center gap-x-5 mt-3">
                    <Input placeholder="Coupon" onChange={handleCoupon} />
                    <Button onClick={addCoupon} disabled={coupon.success}>
                        {
                            coupon.loading ? 'Loading...' : 'Add'
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
}
