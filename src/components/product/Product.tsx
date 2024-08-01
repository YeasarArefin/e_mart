'use client';
import { useAddToCartApiMutation } from '@/features/api/apiSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { Product as ProductType } from '@/types/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import ToggleWishlist from '../home/Explore/ToggleWishlist';
import { Button } from '../ui/button';
import Rating from '../ui/rating';
import ProductQuantityController from './product-quantity-controller';

export default function Product({ product }: { product: ProductType; }) {
    const { _id, images, brand, name, category, description, discount, price, stocks, rating, reviews, size, cartQuantity } = product || {};
    const [productQuantity, setProductQuantity] = useState(1);
    const [addToCartApi, { isError, isLoading, isSuccess, data }] = useAddToCartApiMutation();
    const cart = useAppSelector(state => state.cart.cart) || [];
    const dispatch = useAppDispatch();

    const { data: session } = useSession();
    const userId = session?.user._id;

    const handleAddToCart = () => {
        const newProduct = { ...product, cartQuantity: productQuantity };
        dispatch(addToCart({ product: newProduct, quantity: productQuantity }));
        addToCartApi({ userId, productId: _id, quantity: productQuantity, mode: 'normal' });
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <Image alt="com" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={images[0]} width={400} height={400} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize">{brand}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <Rating rating={rating} />
                                <span className="text-gray-600 ml-3">({reviews.length}) Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">{description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 uppercase">
                                        {size?.map((sz) => <option key={sz} className="uppercase">{sz}</option>)}
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
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
                                <Button onClick={handleAddToCart} className="bg-[#e11d48]">Add To Cart</Button>
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
