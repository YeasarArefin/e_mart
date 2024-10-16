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
import { useGetCartWithDetailsQuery, useGetWishListsQuery } from "@/features/api/apiSlice";
import { setInitialCart } from "@/features/cart/cartSlice";
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
import NotifyBadge from "../ui/notify-badge";
import NavSearch from "./NavSearch";
type Link = {
    name: string,
    to: string;
};

export default function NavItems({ links }: { links: Link[]; }) {

    const { data, status } = useSession();
    const { user } = data || {};
    const wishlists = useAppSelector(state => state.wishlists.wishlists) || [];
    const totalItem = useAppSelector(state => state.cart.totalItems);
    const [fetchData, setFetchData] = useState(false);

    const { data: initialWishlists, isError: isWishlistError, isLoading: isWishlistLoading, isSuccess: isWishlistSuccess } = useGetWishListsQuery(user?.email, { skip: !fetchData });
    const { data: initialCart, isError: isCartError, isLoading: isCartLoading, isSuccess: isCartSuccess } = useGetCartWithDetailsQuery(user?.email, { skip: !fetchData });

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
        if (isWishlistSuccess && !isWishlistLoading) {
            dispatch(setInitialWishlists(initialWishlists.data));
        }

        if (isCartSuccess && !isCartLoading) {
            dispatch(setInitialCart(initialCart.data));
        }
    }, [dispatch, initialCart, initialWishlists, isCartLoading, isCartSuccess, isWishlistLoading, isWishlistSuccess, status]);

    return (
        <>
            {items}
            <div className="hidden md:flex items-center gap-x-5">
                <div className="flex relative">
                    <NavSearch />
                    <CiSearch className="absolute right-2 top-2 text-lg" />
                </div>
                <Link href='/wishlists' className="relative">
                    <NotifyBadge>{wishlists.length}</NotifyBadge>
                    <IoMdHeartEmpty className="text-2xl" />
                </Link>
                <Link href='/cart' className="relative">
                    <NotifyBadge>{totalItem}</NotifyBadge>
                    <IoCartOutline className="text-2xl" />
                </Link>

                {authContent}
            </div>
        </>
    );
}