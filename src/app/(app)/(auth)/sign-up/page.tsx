import sign_up from "@/../../public/signin_signup_image.jpg";
import SignUpFrom from "@/components/auth/sign-up/SignUpFrom";
import Image from "next/image";
export default function Page() {

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-full w-full">
                    <Image
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src={sign_up}
                        alt="sign_up"
                    />
                </div>
                <SignUpFrom />
            </div>
        </section>
    );
}
