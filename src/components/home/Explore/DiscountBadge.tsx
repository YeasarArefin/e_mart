import { cn } from "@/lib/utils";

export default function DiscountBadge({ discount, className }: { discount: number, className?: string; }) {
    return (
        <span className={cn("px-[7px] py-[3px] rounded-md text-[12px] bg-primary_red text-white", className)}>-{discount}%</span>
    );
}
