'use client';
import { Button } from '../ui/button';

export default function ProductQuantityController({ productQuantity, setProductQuantity }: { productQuantity: number, setProductQuantity: Function; }) {

    const handelIncreaseCartQuantity = () => {
        setProductQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handelDecreaseCartQuantity = () => {
        if (productQuantity > 1) {
            setProductQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <div className="flex gap-x-3 items-center font-bold">
            <Button onClick={handelDecreaseCartQuantity} variant="outline" size="icon" className="text-xl">-</Button>
            <span>{productQuantity}</span>
            <Button onClick={handelIncreaseCartQuantity} variant="outline" size="icon" className="text-lg">+</Button>
        </div>
    );
}
