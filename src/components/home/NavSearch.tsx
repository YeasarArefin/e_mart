'use client';
import { useSearchProductsQuery } from '@/features/api/apiSlice';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { Input } from '../ui/input';
export default function NavSearch() {
    const [productName, setProductName] = useState<string>('');
    const [productInput, setProductInput] = useState<string>('');
    const debounced = useDebounceCallback(setProductName, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductInput(e.target.value);
        debounced(e.target.value);
    };

    const { data: products, isLoading } = useSearchProductsQuery(productName, { skip: !productName });

    const handleLinkClick = () => {
        setProductInput('');
        setProductName('');
    };

    return (
        <div className='relative'>
            <Input onChange={handleSearch} value={productInput} type="text" placeholder="What are you looking for" className="bg-[#F5F5F5] border focus-visible:border-gray-400" />
            {(products?.data.length == 0 && productName !== '') && <div className='absolute w-full bg-[#F5F5F5] py-2 px-3 flex flex-col gap-y-2 mt-1 border border-gray-300 rounded-lg'>
                <h1 className='text-sm md:text-base'>No Items Found</h1>
            </div>}
            {(products?.data.length > 0 && productName !== '') && <div className='absolute w-full bg-[#F5F5F5] py-2 px-3 flex flex-col gap-y-2 mt-1 border border-gray-300 rounded-lg'>
                {
                    products.data.map((pd) => <Link key={pd._id} href={`/products/${pd._id}`} onClick={handleLinkClick}><h1 className='text-sm md:text-base'>{pd.name}</h1></Link>)
                }
            </div>}
        </div>
    );
}
