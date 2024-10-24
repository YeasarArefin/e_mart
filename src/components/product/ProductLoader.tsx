import { cn } from "@/lib/utils";

export default function ProductLoader({ count }, { count: number }) {

    const className = 'rounded-lg bg-gray-300 animate-pulse';
    const content = [...Array(count)].map((_, index) => (
        <div key={index} className="p-5 border rounded-lg flex flex-col justify-between w-full md:w-[300px] mx-auto gap-y-5 relative h-[430px]">
            <div className="flex justify-center">
                <div className={cn("h-[220px] w-[170px]", className)} />
            </div>
            <div className="flex flex-col justify-start gap-y-3 px-2">
                <div className={cn(className, "h-[20px] w-[40px] absolute top-6 left-4")} />
                <div className={cn(className, "h-[30px] w-[30px] rounded-full absolute top-16 left-4 ")} />
                <div className={cn(className, "h-[15px] w-4/6")} />
                <div className={cn(className, "h-[15px] w-[40px] rounded-full")} />
                <div className="flex items-center gap-x-3">
                    {/*@ts-ignore */}
                    {[...Array(5).keys()].map(i => <div key={i} className={cn("h-[15px] w-[15px]", className)} />)}
                </div>
                <div className={cn("h-[42px] w-full", className)} />
            </div>
        </div>
    ));
    return (
        <div>
            <h1 className={cn(className, "h-[15px] w-[120px] mx-3 mb-2 rounded")} />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {content}
            </div>
        </div>
    );
}
