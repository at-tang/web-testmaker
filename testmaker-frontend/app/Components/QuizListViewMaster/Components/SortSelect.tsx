import { Dispatch, SetStateAction, useRef } from "react";

export default function SortSelect({valueChanged, setValueChanged, options}: {
    valueChanged: string,
    setValueChanged: Dispatch<SetStateAction<string>>,
    options: Record<string, string>

}) {

    const selectRef = useRef(null);

    return (
        <div>
            <select
            ref={selectRef}
            onChange={() => {setValueChanged(selectRef.current.value)}}
              className="border-2 border-white h-8 px-4 w-full rounded-2xl text-center select-none hover:cursor-pointer hover:scale-102 transition ease-in-out ">
                {
                    Object.entries(options).map(([key, value], index) => {
                        return (
                            <option key={index} value={key}>{value}</option>
                        )
                    })
                }
                


            </select>

        </div>
    )

}