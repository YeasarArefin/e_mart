import Navbar from "@/components/home/Navbar";
import TopNotification from "@/components/home/TopNotification";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import StoreProvider from "@/providers/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Exclusive Mart",
    description: "Largest Online Store",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={inter.className}>
            <AuthProvider>
                <StoreProvider>
                    <TopNotification />
                    <Navbar />
                    <div className="container">
                        {children}
                        <Toaster />
                    </div>
                </StoreProvider>
            </AuthProvider>
        </div>
    );
}
