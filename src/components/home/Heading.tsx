export default function Heading({ name, title }: { name: string, title: string; }) {
    return (
        <div>
            <h1 className="py-5 flex items-center gap-x-3 text-primary_red font-bold"> <div className="h-[30px] rounded  w-[10px] border-r-[15px] border-primary_red"></div>{name}</h1>
            <div className="flex gap-x-14 items-center colon_parent">
                <h1 className="text-3xl font-semibold">{title}</h1>
            </div>
        </div>
    );
}
