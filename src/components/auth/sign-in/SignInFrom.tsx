'use client';
import Error from "@/components/ui/error";
import { useToast } from "@/components/ui/use-toast";
import SignInSchema from "@/schemas/signInSchema";
import { SignInFormData } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { z } from "zod";

export default function SignInFrom() {

    const { register, handleSubmit, formState: { errors, isLoading }, reset } = useForm<SignInFormData>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        setLoading(true);
        const result = await signIn('Credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: '/'
        });
        if (result?.ok) {
            const url = result?.url as string;
            setLoading(false);
            window.location.href = '/';
            // router.push(url); // replaced the router for unpredictable behavior
        } else {
            setLoading(false);
            toast({
                title: 'Sign-in Failed',
                description: result?.error,
                variant: 'destructive'
            });
        }

    };
    return (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/sign-up"
                        title=""
                        className="font-semibold text-black transition-all duration-200 hover:underline"
                    >
                        Create a free account
                    </Link>
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                {' '}
                                Email address{' '}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                    {...register('email')}
                                />
                                {errors.email && <Error>{errors.email.message}</Error>}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Password{' '}
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    {...register('password')}
                                />
                                {errors.password && <Error>{errors.password.message}</Error>}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? <span className="flex items-center gap-x-2"><BiLoaderAlt className="animate-spin" /> Signing in...</span> : 'Sign In'}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}
