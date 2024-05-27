'use client';
import sign_up from "@/../../public/signin_signup_image.jpg";
import Error from "@/components/ui/error";
import { useToast } from "@/components/ui/use-toast";
import { useSignUpMutation } from "@/features/api/apiSlice";
import signUpSchema from '@/schemas/signUpSchema';
import { SignUpFormData } from "@/types/types";
import { zodResolver } from '@hookform/resolvers/zod';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { BiLoaderAlt } from "react-icons/bi";
export default function Page() {

    const [formData, setFormData] = useState<SignUpFormData>({ name: '', email: '', password: '' });
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }

    });

    const [signUp, { data: response, isLoading, isError, isSuccess, error }] = useSignUpMutation();
    const { toast } = useToast();
    const router = useRouter();

    const handleSignUp = (data: SignUpFormData) => {
        signUp(data);
        setFormData(data);
    };

    useEffect(() => {
        if (isSuccess && response && response.message) {
            toast({
                title: "Success",
                description: response.message,
            });
            reset();
            router.replace(`/verify/${formData.email}`);
        }
        if (error) {
            toast({
                title: "Error",
                variant: "destructive",
                description: 'Failed to sign-up',
            });
        }
    }, [error, formData.email, isError, isSuccess, reset, response, router, toast]);

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
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/sign-in"
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit(handleSignUp)} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Name"
                                            id="name"
                                            {...register('name')}
                                        />
                                        {errors.name && <Error>{errors.name.message}</Error>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            {...register('email')}
                                        />
                                    </div>
                                    {errors.email && <Error>{errors.email.message}</Error>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            {...register('password')}
                                        />
                                        {errors.password && <Error>{errors.password.message}</Error>}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 disabled:opacity-70 text-white hover:bg-black/80 disabled:hover:bg-black disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <span className="flex items-center gap-x-2"><BiLoaderAlt className="animate-spin" /> Creating...</span> : 'Create Account'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
