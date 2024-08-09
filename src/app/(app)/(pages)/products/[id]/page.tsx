import Product from "@/components/product/Product";
import { appUrl } from "@/constants/appUrl";
import getQuery from "@/lib/queries/getQueries";
import { Product as ProductType } from "@/types/types";

export default async function page({ params }: any) {
    const _id = params?.id as string;
    const { message, success, data } = await getQuery(`${appUrl}api/products?id=${_id}`);
    const product: ProductType = data || {};

    return (
        <Product product={product} />
    );
}
