import sign_in from "@/../../public/signin_signup_image.jpg";
import SignInFrom from "@/components/auth/sign-in/SignInFrom";
import Image from "next/image";

export default function Page() {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-full w-full">
                    <Image
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src={sign_in}
                        alt="sign_in"
                    />
                </div>
                <SignInFrom />
            </div>
        </section>
    );
}
