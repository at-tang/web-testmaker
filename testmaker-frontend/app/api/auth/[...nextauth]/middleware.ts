import { NextResponse } from "next/server";
import { auth } from "./auth";

/*
export default auth((req) => {
    // This controls what routes are restricted to users that are not signed in
    const loggedIn = !!req.auth;
    const { pathname }= req.nextUrl;

    const protectedRoutes = pathname.startsWith("/edit") || pathname.startsWith("/self") || pathname.startsWith("/history") || pathname.startsWith("/settings")

    if (protectedRoutes && !!loggedIn) {
        return NextResponse.redirect(new URL("/error/login-required", req.url)) // Redirect to home page
    }

    return NextResponse.next();
})
    


export { default } from "next-auth/middleware"


export const config = {
    matcher: ["/self(.*)", "/history(.*)"],
}

*/

export { default } from "next-auth/middleware"

export const config = { matcher: ["/history(.*)"] }

    