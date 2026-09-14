import Image from "next/image";

export default function IconLabel({icon, text}: {icon: string, text: string}) {
    return (
        <span className="rounded-full bg-container flex px-5 py-2 items-center w-max">
            <Image src={`${icon}`} height={24} width={24} alt="Icon" className="mr-4"/>
            <p className="">{text}</p>

        </span>
    )
}