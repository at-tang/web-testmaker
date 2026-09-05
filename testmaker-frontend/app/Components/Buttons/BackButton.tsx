import { useRouter } from "next/navigation"

export default function BackButton() {

    const router = useRouter();

    const handleClick = () => {
        router.back();

    }
    return (
        <>
            <button 
            className="w-8 h-8 text-black bg-white flex justify-center items-cente
            text-2xl
            hover:brightness-75 hover:cursor-pointer"
            onClick={() => handleClick()}>
                {`<`}
            </button>
        </>
    )
}