import { decreaseCart, increaseCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { Product as ProductType } from "@/types/types";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";

export default function SingleCart({ product }: { product: ProductType; }) {

    const { _id, images, price, cartQuantity, name } = product || {};
    const dispatch = useAppDispatch();

    const subtotal = price * cartQuantity;

    const handelIncreaseCartQuantity = () => {
        dispatch(increaseCart(_id));
    };

    const handelDecreaseCartQuantity = () => {
        dispatch(decreaseCart(_id));
    };

    return (
        <div className="grid grid-cols-5 items-center justify-items-center border px-5 py-2 hover:shadow-xl duration-200 font-semibold rounded-lg">
            <div className="flex items-center">
                <Image src={images[0]} width={80} height={60} alt="product_image" />
                <h1>{name}</h1>
            </div>
            <h1>${price}</h1>
            <div className="flex gap-x-3 items-center font-bold">
                <Button onClick={handelDecreaseCartQuantity} variant="outline" size="icon" className="text-xl">-</Button>
                <span>{cartQuantity}</span>
                <Button onClick={handelIncreaseCartQuantity} variant="outline" size="icon" className="text-lg">+</Button>
            </div>
            <h1>${subtotal}</h1>
            <Button className="rounded-full hover:bg-[#e11d48] bg-[#e11d48] px-2.5 py-1.5"><RxCross2 className="text-lg " /></Button>
        </div>
    );
}
