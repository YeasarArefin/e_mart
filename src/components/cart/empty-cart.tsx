import Image from 'next/image';
import Link from 'next/link';
import addToCartGif from '../../../public/AddToCart.gif';
import { Button } from '../ui/button';

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center gap-y-2">
            <h1 className="font-semibold">No items in cart!</h1>
            <Image src={addToCartGif} width={350} height={350} alt="add to cart" />
            <Link href={'/'}>
                <Button className="bg-[#e11d48]">Shop Now</Button>
            </Link>
        </div>
    );
}
