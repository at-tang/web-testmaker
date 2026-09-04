export default function Tag({tagName = ""}: {tagName?: string}) {

    return (
        <div className="bg-white mr-2 px-4 h-full rounded-full text-black flex items-center justify-center">
            <div className="h-full w-full flex items-center justify-center">
                {tagName}

            </div>
            
        </div>
    )

}