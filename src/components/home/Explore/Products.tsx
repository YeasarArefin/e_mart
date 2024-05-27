import { ApiResponse } from "@/types/ApiResponse";
import { Product as ProductType } from "@/types/types";
import Product from "./Product";


export async function getProducts(): Promise<ApiResponse> {
    const response = await fetch(`${process.env.NEXT_URL}/api/products?limit=9`, { cache: 'no-cache' });
    return response.json();
}

export default async function Products() {
    // const { message, success, data } = await getQuery(`${process.env.NEXT_URL}/api/products?limit=9`);
    // const res = await getProducts();
    // const products: ProductType[] = res.data || [];
    const products: ProductType[] = [];

    let content;
    // if (!res.success) {
    //     content = <Error>{res.message}</Error>;
    // }
    if (true) {
        content = products.map((product) => <Product key={product._id} product={product} />);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">{content}</div>
    );
}
