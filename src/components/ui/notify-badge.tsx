
export default function NotifyBadge({ children }: { children: React.ReactNode; }) {
    return (
        <span className="absolute -top-3 -right-2 px-[5px] py-[3xp] text-sm rounded-full bg-[#e11d48] text-white">{children}</span>
    );
}
