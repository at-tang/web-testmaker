import Link from "next/link";

export default function Unauthorized() {
    return(
        <div className="h-dvh w-dvw flex items-center justify-center">
        <div className="flex-col items-center justify-center">
            <p>You do not have the permissions to access this resource.</p>
            <button className="border-2 border-white ">
                <Link href="/home">
                Go to Homepage
                </Link>
            </button>
        </div>
        </div>
    )

}