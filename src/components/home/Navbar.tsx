'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import NavItems from "./Navitems";
import NavSearch from "./NavSearch";
export default function Navbar() {

    const [mobileMenu, setMobileMenu] = useState(false);

    const links = [
        { name: 'Home', to: '/' },
        { name: 'Products', to: '/products' },
    ];

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            if (mobileMenu) {
                body.classList.add("overflow-hidden");
            } else {
                body.classList.remove("overflow-hidden");
            }
        }
    }, [mobileMenu]);

    return (
        <div className="sticky top-0 mb-5 z-50">
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="border-b">
                    <div className="container flex flex-col gap-y-5 md:flex-row items-start md:items-center md:justify-between ">
                        <div className="flex gap-x-5 items-center text-lg py-2">
                            <div className="block md:hidden cursor-pointer" onClick={() => setMobileMenu(true)}><HiMenuAlt2 className="text-2xl" /></div>
                            <div className="hidden md:flex items-center gap-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-9 w-9"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                                <Link href='/' className="font-bold">Exclusive Mart</Link>
                            </div>
                            <div className="block md:hidden">
                                <NavSearch />
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-x-5">
                            <NavItems links={links} key="desktop" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn("", { "bg-black/50 md:hidden fixed top-0 left-0 transition-all duration-300 h-[100%] w-full": mobileMenu })} onClick={() => setMobileMenu(false)}>
                <div className={cn("flex flex-col drop-shadow-2xl w-[300px] h-[100%] md:hidden gap-y-5 pt-5 container top-0 left-0 fixed bg-white transition-all duration-200 ease-in-out", { "-left-[500px]": !mobileMenu, "-left-[0px]": mobileMenu })} onClick={(e) => { e.stopPropagation(); }}>
                    <div className="flex justify-between gap-x-2 items-center w-full text-lg py-2">
                        <div className="flex items-center gap-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-9 w-9"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                            <h1 className="font-bold">E-Mart</h1>
                        </div>
                        <div className="block md:hidden cursor-pointer" onClick={() => setMobileMenu(false)}><IoMdClose className="text-2xl" /></div>
                    </div>
                    <NavItems links={links} key="mobile" />
                </div>
            </div>
        </div>
    );
}