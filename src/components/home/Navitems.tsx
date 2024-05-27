'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useGetWishListsQuery } from "@/features/api/apiSlice";
import { setInitialWishlists } from "@/features/wishlists/wishlistsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LetterAvatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
type Link = {
    name: string,
    to: string;
};

export default function NavItems({ links }: { links: Link[]; }) {

    const { data, status } = useSession();
    const { user } = data || {};
    const wishlists = useAppSelector(state => state.wishlists.wishlists) || [];
    const [fetchData, setFetchData] = useState(false);

    const { data: initialWishlists, isError, isLoading, isSuccess } = useGetWishListsQuery(user?.email, { skip: !fetchData });

    const dispatch = useAppDispatch();

    const items = links.map(({ name, to }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const pathname = usePathname();
        const isActive = pathname.endsWith(to);
        return <Link key={to} href={to} className={cn("text-gray-600 text-sm font-medium", { "text-black font-bold": isActive })}>{name}</Link>;
    });

    let authContent;
    if (status === 'unauthenticated') {
        authContent = <div className="flex gap-x-2">
            <Link href="/sign-in">
                <Button variant="outline" className="border-gray-400">Sign In</Button>
            </Link>
            <Link href="/sign-up">
                <Button variant="default">Sign Up</Button>
            </Link>
        </div>;
    }
    if (status === 'loading') {
        authContent = <div className="flex items-center gap-x-2">
            <div className="h-[35px] w-[35px] rounded-full animate-pulse bg-gray-300" />
            <h1 className="h-[8px] w-[75px] rounded-full animate-pulse bg-gray-300" />
            <h1 className="h-[8px] w-[25px] rounded-full animate-pulse bg-gray-300" />
        </div>;
    }
    if (status === 'authenticated') {
        authContent = <div className="flex items-center gap-x-3">

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                        <LetterAvatar name={user?.name} className="rounded-full" size="35" textSizeRatio={2.7} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href='/wishlists'>
                            <DropdownMenuItem className="gap-x-2">
                                <IoMdHeartEmpty className="text-2xl" />
                                <span>Wishlists</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="gap-x-2">
                            <IoCartOutline className="text-2xl" />
                            <span>Cart</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-x-2" onClick={() => signOut()}>
                            <PiSignOut className="text-2xl" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <h1 className="font-semibold">{user?.name}</h1>
        </div>;
    }

    useEffect(() => {
        if (status === 'authenticated') {
            setFetchData(true);
        }
        if (isSuccess && !isLoading) {
            dispatch(setInitialWishlists(initialWishlists.data));
        }
    }, [dispatch, initialWishlists, isLoading, isSuccess, status]);

    return (
        <>
            {items}
            <div className="hidden md:flex items-center gap-x-5">
                <div className="flex relative">
                    <Input type="text" placeholder="What are you looking for" className="bg-[#F5F5F5]" />
                    <CiSearch className="absolute right-2 top-2 text-lg" />
                </div>
                <Link href='/wishlists' className="relative">
                    <span className="absolute -top-3 -right-2 px-[5px] py-[3xp] text-sm rounded-full bg-[#e11d48] text-white">{wishlists.length}</span>
                    <IoMdHeartEmpty className="text-2xl" />
                </Link>
                <IoCartOutline className="text-2xl" />
                {authContent}
            </div>
        </>
    );
}