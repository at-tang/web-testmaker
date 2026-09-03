import { TimeLeftContext, TimerActiveContext } from "@/app/play/[quizId]/page"
import { useContext, useEffect } from "react"

export default function Timer() {
    /*
    This components tracks how much time is left for the user to complete the quiz.

    The timer is tracked in seconds. Once the timer reaches zero, it will automatically
    submit the quiz for the user.
    */

    const [timeLeft, setTimeLeft] = useContext(TimeLeftContext);
    const [timerActive, setTimerActive] = useContext(TimerActiveContext);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timeLeft > 0 && timerActive === true) {
            interval = setInterval(() => {
                setTimeLeft((prevSeconds) => prevSeconds - 1)
            }, 1000)
            /*
            setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000)
            */
        } else if (timeLeft === 0) {
            setTimerActive(false)
        }

        return () => {
            clearInterval(interval)
        }

    }, [timeLeft, timerActive])

    const formatTime = () => {
        let result = "";
        let hours = Math.floor(timeLeft / 3600)
        let minutes = Math.floor((timeLeft - hours * 3600) / 60);
        let seconds = timeLeft - (minutes * 60) - (hours * 3600)
        return `${hours}`.padStart(2, "0") + ":" +  `${minutes}`.padStart(2, "0") + ":" + `${seconds}`.padStart(2, "0")
        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <>
            <div>
                <p>Time Left: {formatTime()}</p>
            </div>
        </>
    )
}