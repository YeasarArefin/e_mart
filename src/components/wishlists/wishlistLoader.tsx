import { cn } from "@/lib/utils";

export default function WishlistLoader({ count }, { count: number }) {
    const className = 'rounded-lg bg-gray-300 animate-pulse';
    const content = [...Array(count)].map((_, index) => (
        <div key={index} className="flex flex-wrap items-center gap-x-6 border p-3 rounded-lg">
            <h1 className={cn("w-[70px] h-[70px]", className)} />
            <h1 className={cn("w-[80px] h-[7px]", className)} />
            <h1 className={cn("w-[40px] h-[7px]", className)} />
            <h1 className={cn("w-[40px] h-[7px]", className)} />
            <h1 className={cn("w-[40px] h-[7px]", className)} />
            <h1 className={cn("w-[35px] h-[35px] rounded-full bg-gray-300 animate-pulse")} />
        </div>
    ));
    return (
        <div className="flex flex-col gap-y-5">{content}</div>
    );
}
