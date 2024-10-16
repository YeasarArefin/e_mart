This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

product page :
'use client';
import Product from "@/components/home/Explore/Product";
import { Input } from "@/components/ui/input";
import { useGetProductsQuery } from "@/features/api/apiSlice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebounceCallback } from 'usehooks-ts';

export default function Page() {
const searchParams = useSearchParams();
const [brandFilters, setBrandFilters] = useState<string[]>([]);
const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
const [name, setName] = useState<string>('');

    const handleBrandBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (checked) {
            setBrandFilters((prev) => [...prev, name]);
        } else {
            setBrandFilters((prev) => prev.filter((filter) => filter !== name));
        }
    };

    const handleCategoryBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (checked) {
            setCategoryFilters((prev) => [...prev, name]);
        } else {
            setCategoryFilters((prev) => prev.filter((filter) => filter !== name));
        }
    };

    const debounced = useDebounceCallback(setName, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        debounced(name);
    };

    useEffect(() => {
        const brands = searchParams.get('brand');
        const categories = searchParams.get('category');
        const searchTerm = searchParams.get('name');

        if (brands) {
            setBrandFilters(brands.split(','));
        }
        if (categories) {
            setCategoryFilters(categories.split(','));
        }
        if (searchTerm) {
            setName(searchTerm);
        }
    }, [searchParams]);

    // Build query string for the RTK query
    const brandQuery = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : '';
    const categoryQuery = categoryFilters.length > 0 ? `category=${categoryFilters.join(',')}&` : '';
    let query = [brandQuery, categoryQuery].filter(Boolean).join('&');

    if (name.length > 0) {
        query = query ? `${query}&name=${name}` : `name=${name}`;
    }

    query += `&page=1&limit=9`;

    const { data: products, isLoading } = useGetProductsQuery(query);

    return (
        <section>
            <div>
                <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-1">
                        <div className="mb-4">
                            <div className="relative">
                                <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        <div>
                            <div>Brands</div>
                            <div>
                                <div><input type="checkbox" checked={brandFilters.includes('apple')} className="mr-2" onChange={handleBrandBox} name="apple" />Apple</div>
                                <div><input type="checkbox" checked={brandFilters.includes('zotac')} className="mr-2" onChange={handleBrandBox} name="zotac" />Zotac</div>
                                <div><input type="checkbox" checked={brandFilters.includes('amd')} className="mr-2" onChange={handleBrandBox} name="amd" />Amd</div>
                                <div><input type="checkbox" checked={brandFilters.includes('intel')} className="mr-2" onChange={handleBrandBox} name="intel" />Intel</div>
                            </div>
                        </div>

                        <div>
                            <div>Categories</div>
                            <div>
                                <div><input type="checkbox" checked={categoryFilters.includes('phone')} className="mr-2" onChange={handleCategoryBox} name="phone" />Phone</div>
                                <div><input type="checkbox" checked={categoryFilters.includes('gadget')} className="mr-2" onChange={handleCategoryBox} name="gadget" />Gadget</div>
                                <div><input type="checkbox" checked={categoryFilters.includes('laptop')} className="mr-2" onChange={handleCategoryBox} name="laptop" />Laptop</div>
                                <div><input type="checkbox" checked={categoryFilters.includes('accessory')} className="mr-2" onChange={handleCategoryBox} name="accessory" />Accessory</div>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-3">
                        <div className="grid grid-cols-3 gap-5">
                            {isLoading && <div>Loading...</div>}
                            {products?.data.length == 0 && <h1>No Items</h1>}
                            {products?.data.length > 0 && products.data.map(pd => <Product key={pd._id} product={pd} />)}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );

}
