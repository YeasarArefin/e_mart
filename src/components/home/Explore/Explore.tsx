import { Button } from "@/components/ui/button";
import Heading from "../Heading";
import Products from "./Products";

export default function Todays() {
    return (
        <section className="flex flex-col gap-y-10">
            <div className="flex items-center gap-x-10">
                <Heading name="Explore" title="Explore More Products" />
            </div>
            <div>
                <Products />
            </div>
            <div className="flex justify-center">
                <Button size="lg" className="bg-[#e11d48]">View All Products</Button>
            </div>
        </section>
    );
}
