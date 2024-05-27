import { ApiResponse } from "@/types/ApiResponse";
import { Category } from "@/types/types";
import { HeroSlider } from "./HeroSlider";

export async function getCategories(): Promise<ApiResponse> {
    const response = await fetch(`${process.env.NEXT_URL}/api/categories`, { cache: 'no-cache' });
    return response.json();
}

export default async function HeroSection() {
    // const { message, success, data } = await getQuery(`${process.env.NEXT_URL}/api/categories`);
    // const res = await getCategories();
    const categories: Category[] = [];
    return (
        <section className="grid grid-cols-8 mb-[80px]">
            <div className="lg:pr-5 lg:pt-5 md:border-r capitalize flex flex-col gap-y-3 col-span-8 lg:col-span-1">
                {
                    categories?.map((category) => <h1 key={category._id}>{category.name}</h1>)
                }
            </div>
            <div className="col-span-8 lg:col-span-7">{/*-z-10*/}
                <HeroSlider />
            </div>
        </section>
    );
}