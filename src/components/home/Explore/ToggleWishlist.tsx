'use client';
import { useToast } from "@/components/ui/use-toast";
import { useToggleWishlistsApiMutation } from "@/features/api/apiSlice";
import { toggleWishlists } from "@/features/wishlists/wishlistsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { cn } from "@/lib/utils";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
export default function ToggleWishlist({ _id, className, icon }: { _id: string, className?: string, icon: 'heart' | 'cancel'; }) {

    const wishlists = useAppSelector(state => state.wishlists.wishlists) || [];
    const [toggleWishlistsApi, { isError, isSuccess, error, data, isLoading }] = useToggleWishlistsApiMutation();

    const { data: session } = useSession();
    const userId = session?.user._id;
    const dispatch = useAppDispatch();
    const existsInWishlist = wishlists?.includes(_id);
    const { toast } = useToast();

    const handleToggleWishlists = () => {
        dispatch(toggleWishlists(_id));
        toggleWishlistsApi({ userId, productId: new mongoose.Types.ObjectId(_id) });
    };

    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast({
                title: "Success",
                description: data?.message,
            });
        }
        if (isError) {
            dispatch(toggleWishlists(_id));
        }
    }, [_id, data, dispatch, isError, isLoading, isSuccess, toast]);

    return (
        <button onClick={handleToggleWishlists} className={cn('p-2 rounded-full text-white border border-gray-200 cursor-pointer lg:hover:text-white outline-none transition-all duration-100', className)}>

            {icon === 'heart' && (existsInWishlist ? <IoMdHeart className="text-2xl text-[#e11d48]" /> : <IoMdHeartEmpty className="text-2xl text-[#e11d48]" />)}
            {icon === 'cancel' && <RxCross2 className="text-lg" />}
        </button>
    );
    // <button onClick={handleToggleWishlists} className={cn('p-2 rounded-full text-white border cursor-pointer lg:hover:bg-[#e11d48] lg:hover:text-white outline-none transition-all duration-100 bg-[#e11d48]', className, { 'bg-[#e11d48] text-white': existsInWishlist, 'bg-white text-black': !existsInWishlist })}>
    //     {/* {icon === 'heart' && <IoMdHeartEmpty className="text-lg" />} */}
    //     {icon === 'heart' && <IoMdHeart className="text-2xl text-red-600" />}
    //     {icon === 'cancel' && <RxCross2 className="text-lg" />}
    // </button>
}
