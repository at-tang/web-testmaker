export default function TextButton({text, clickFunction}: 
    {
        text: string, // Text on the button
        clickFunction: () => any // The function that will be executed when button is pressed

    }
) {

    /*
    Basic reusable component hat represents a button whose function
    is detailed in pure text.

    
    */

    return (
        <button 
        onClick={() => {clickFunction()}}
        className="px-4 py-0.5 border-on-surface border-2 rounded-full max-h-24
        hover:bg-on-surface hover:text-black hover:cursor-pointer hover:scale-105
        transition ease-in-out">
            {text}
        </button>
    )
}