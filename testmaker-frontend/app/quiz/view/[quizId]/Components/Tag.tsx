export default function Tag({tagName = ""}: {tagName?: string}) {

    return (
        <div className="bg-white mr-1 min-w-16 h-7 rounded-full text-black flex items-center justify-center">
            <div className="h-full w-full flex items-center justify-center">
                {tagName}

            </div>
            
        </div>
    )

}