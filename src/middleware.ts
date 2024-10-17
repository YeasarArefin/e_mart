export { default } from "next-auth/middleware";
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ['/wishlists', '/cart'] };

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}
