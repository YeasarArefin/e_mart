export default function Error({ children }: { children: React.ReactNode; }) {
    return (
        <p className="text-red-600 font-medium">{children}</p>
    );
}
