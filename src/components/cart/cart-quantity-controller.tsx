'use client';
import { decreaseCart, increaseCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { Button } from "../ui/button";

export default function CartQuantityController({ _id, cartQuantity }: { _id: string, cartQuantity: number; }) {

  const dispatch = useAppDispatch();

  const handelIncreaseCartQuantity = () => {
    dispatch(increaseCart(_id));
  };

  const handelDecreaseCartQuantity = () => {
    dispatch(decreaseCart(_id));
  };

  return (
    <div className="flex gap-x-3 items-center font-bold">
      <Button onClick={handelDecreaseCartQuantity} variant="outline" size="icon" className="text-xl">-</Button>
      <span>{cartQuantity}</span>
      <Button onClick={handelIncreaseCartQuantity} variant="outline" size="icon" className="text-lg">+</Button>
    </div>
  );
}
