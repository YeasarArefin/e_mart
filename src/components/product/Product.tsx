'use client';
import { useAddToCartApiMutation } from '@/features/api/apiSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { Product as ProductType } from '@/types/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToggleWishlist from '../home/Explore/ToggleWishlist';
import { Button } from '../ui/button';
import Rating from '../ui/rating';
import ProductQuantityController from './product-quantity-controller';

export default function Product({ product }: { product: ProductType; }) {
    const { _id, images, brand, name, category, description, discount, price, stocks, rating, reviews, size, cartQuantity, colors } = product || {};
    const [productQuantity, setProductQuantity] = useState(1);
    const [addToCartApi, { isError, isLoading, isSuccess, data }] = useAddToCartApiMutation();
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
    const [selectedSize, setSelectedSize] = useState<string>(size[0]);
    const cart = useAppSelector(state => state.cart.cart) || [];
    const dispatch = useAppDispatch();

    const { data: session } = useSession();
    const userId = session?.user._id;

    const handleAddToCart = () => {
        const cartId = uuid();
        const newProduct = { ...product, cartId, colors: [selectedColor], size: [selectedSize], cartQuantity: productQuantity };
        dispatch(addToCart({ product: newProduct, quantity: productQuantity }));
        addToCartApi({ userId, productId: _id, cartId, quantity: productQuantity, color: selectedColor, size: selectedSize, mode: 'add' });
    };

    useEffect(() => {
        window.history.pushState(null, "", `?color=${selectedColor}&size=${selectedSize}`);
    }, [selectedColor, selectedSize]);


    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                    <Image alt="com" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={images[0]} width={400} height={400} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize font-black">{brand}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <Rating rating={rating} />
                                <span className="text-gray-600 ml-3">({reviews.length}) Reviews</span>
                            </span>
                        </div>
                        <p className="leading-relaxed">{description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex items-center gap-x-2">
                                <span className="mr-3 font-bold">Color</span>
                                {colors?.map((color) => <Button key={color} onClick={() => setSelectedColor(color)} variant="outline" size="sm" className={`capitalize border-2 ${selectedColor === color && 'border-primary_red'}`}>{color}</Button>)}
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3 font-bold">Size</span>
                                <div className="relative">
                                    {
                                        size.length > 0 && <select onChange={(e) => setSelectedSize(e.target.value)} className="rounded border appearance-none py-1 focus:outline-none focus:border-gray-200 pl-3 pr-6 uppercase text-sm shadow">
                                            {size?.map((sz) => <option key={sz} value={sz} className={`uppercase`}>{sz}</option>)}
                                        </select>
                                    }
                                    <span className="absolute -right-2 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-x-5 items-center">
                                <h1 className="title-font font-medium text-2xl text-gray-900"><span className="font-bold">$</span>{price}</h1>
                                <ProductQuantityController productQuantity={productQuantity} setProductQuantity={setProductQuantity} />
                            </div>
                            <div className="flex gap-x-5 items-center">
                                <Button onClick={handleAddToCart} className="bg-primary_red">Add To Cart</Button>
                                <div>
                                    <ToggleWishlist _id={_id || ''} icon="heart" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
