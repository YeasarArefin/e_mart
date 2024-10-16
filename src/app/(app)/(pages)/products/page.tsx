// 'use client';
// import Product from "@/components/home/Explore/Product";
// import { Input } from "@/components/ui/input";
// import { appUrl } from "@/constants/appUrl";
// import { Product as ProductType } from "@/types/types";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { LuSearch } from "react-icons/lu";
// import { useDebounceCallback } from 'usehooks-ts';


// export default function Page() {
//     const router = useRouter();
//     const [brandFilters, setBrandFilters] = useState<string[]>([]);
//     const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
//     const [name, setName] = useState<string>('');
//     const [products, setProducts] = useState<ProductType[]>([]);
//     const { data } = useSession();
//     const searchParams = useSearchParams();

//     const handleBrandBox = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, checked } = e.target;
//         if (checked) {
//             setBrandFilters((prev) => [...prev, name]);
//         } else {
//             setBrandFilters((prev) => prev.filter((filter) => filter !== name));
//         }
//     };

//     const handleCategoryBox = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, checked } = e.target;
//         if (checked) {
//             setCategoryFilters((prev) => [...prev, name]);
//         } else {
//             setCategoryFilters((prev) => prev.filter((filter) => filter !== name));
//         }
//     };

//     const debounced = useDebounceCallback(setName, 500);

//     const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const name = e.target.value;
//         debounced(name);
//     };

//     useEffect(() => {
//         const brandQuery = searchParams.get('brand');
//         const categoryQuery = searchParams.get('category');

//         if (brandQuery) setBrandFilters(brandQuery.split(','));
//         if (categoryQuery) setCategoryFilters(categoryQuery.split(','));
//     }, [searchParams]);

//     useEffect(() => {
//         const brandQuery = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : '';
//         const categoryQuery = categoryFilters.length > 0 ? `category=${categoryFilters.join(',')}&` : '';
//         let query = [brandQuery, categoryQuery].filter(Boolean).join('&');

//         if (name.length > 0) {
//             query = query ? `${query}&name=${name}` : `name=${name}`;
//         }

//         query += `page=1&limit=9`;

//         router.push(`?${query}`, undefined);
//         fetch(`${appUrl}api/products?${query}`)
//             .then((res) => res.json())
//             .then((productResponse) => setProducts(productResponse.data));

//     }, [brandFilters, categoryFilters, name, router]);

//     return (
//         <section>
//             <div>
//                 <div className="grid grid-cols-4 gap-5">
//                     <div className="col-span-1">
//                         <div className="mb-4">
//                             <div className="relative">
//                                 <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                     type="search"
//                                     placeholder="Search products..."
//                                     className="w-full appearance-none bg-background pl-8 shadow-none"
//                                     onChange={handleSearch}
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <div>Brands</div>
//                             <div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="apple" checked={brandFilters.includes('apple')} />Apple</div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="zotac" checked={brandFilters.includes('zotac')} />Zotac</div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="amd" checked={brandFilters.includes('amd')} />Amd</div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="intel" checked={brandFilters.includes('intel')} />Intel</div>
//                             </div>
//                         </div>

//                         <div>
//                             <div>Categories</div>
//                             <div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="phone" checked={categoryFilters.includes('phone')} />Phone</div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="gadget" checked={categoryFilters.includes('gadget')} />Gadget</div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="laptop" checked={categoryFilters.includes('laptop')} />Laptop</div>
//                                 <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="accessory" checked={categoryFilters.includes('accessory')} />Accessory</div>
//                             </div>
//                         </div>

//                     </div>

//                     <div className="col-span-3">
//                         <div className="grid grid-cols-3 gap-5">
//                             {products.length > 0 && products.map(pd => <Product key={pd._id} product={pd} />)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }


'use client';
import Product from "@/components/home/Explore/Product";
import { Input } from "@/components/ui/input";
import { useGetProductsQuery } from "@/features/api/apiSlice"; // import the hook
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebounceCallback } from 'usehooks-ts';

export default function Page() {
    const router = useRouter();
    const [brandFilters, setBrandFilters] = useState<string[]>([]);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const searchParams = useSearchParams();

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
        const brandQuery = searchParams.get('brand');
        const categoryQuery = searchParams.get('category');

        if (brandQuery) setBrandFilters(brandQuery.split(','));
        if (categoryQuery) setCategoryFilters(categoryQuery.split(','));
    }, [searchParams]);

    const brandQuery = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : '';
    const categoryQuery = categoryFilters.length > 0 ? `category=${categoryFilters.join(',')}&` : '';
    let query = [brandQuery, categoryQuery].filter(Boolean).join('&');

    if (name.length > 0) {
        query = query ? `${query}&name=${name}` : `name=${name}&`;
    }

    query += `page=1&limit=9`;

    const { data: products, isLoading } = useGetProductsQuery(query); // Use RTK Query

    useEffect(() => {
        router.push(`?${query}`, undefined);
    }, [brandFilters, categoryFilters, name, router]);

    return (
        <div>
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
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="apple" checked={brandFilters.includes('apple')} />Apple</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="zotac" checked={brandFilters.includes('zotac')} />Zotac</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="amd" checked={brandFilters.includes('amd')} />Amd</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleBrandBox} name="intel" checked={brandFilters.includes('intel')} />Intel</div>
                            </div>
                        </div>

                        <div>
                            <div>Categories</div>
                            <div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="phone" checked={categoryFilters.includes('phone')} />Phone</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="gadget" checked={categoryFilters.includes('gadget')} />Gadget</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="laptop" checked={categoryFilters.includes('laptop')} />Laptop</div>
                                <div><input type="checkbox" className="mr-2" onChange={handleCategoryBox} name="accessory" checked={categoryFilters.includes('accessory')} />Accessory</div>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-3">
                        <div className="grid grid-cols-3 gap-5">
                            {isLoading && <div>Loading...</div>}
                            {products?.data?.length == 0 && <h1>No Items</h1>}
                            {products?.data?.length > 0 && products?.data.map(pd => <Product key={pd._id} product={pd} />)}
                        </div>
                    </div>
                </div>
            </div>
        </ div>
    );
};