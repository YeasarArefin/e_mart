import { BsShieldCheck } from "react-icons/bs";
import { MdOutlineHeadphones } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
export default function Features() {
    return (
        <div className="flex lg:flex-row flex-col gap-5 justify-between mt-20">
            <div className="flex flex-col items-center">
                <div className="bg-gray-300 p-3 rounded-full">
                    <div className="bg-black p-2 rounded-full text-white  text-3xl">
                        <RiTruckLine />
                    </div>
                </div>
                <h1 className="font-bold text-xl mt-5">FREE AND FAST DELIVERY</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-gray-300 p-3 rounded-full">
                    <div className="bg-black p-2 rounded-full text-white  text-3xl">
                        <MdOutlineHeadphones />
                    </div>
                </div>
                <h1 className="font-bold text-xl mt-5">24/7 CUSTOMER SERVICE</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-gray-300 p-3 rounded-full">
                    <div className="bg-black p-2 rounded-full text-white  text-3xl">
                        <BsShieldCheck />
                    </div>
                </div>
                <h1 className="font-bold text-xl mt-5">MONEY BACK GUARANTEE</h1>
            </div>
        </div>
    );
}
