import { useState } from "react"

export function Timer(props) {
    const { startingMinutes, startingSeconds } = props;
    const [minutes, setMinutes] = useState(startingMinutes)
    const [seconds, setSeconds] = useState(startingSeconds)
    const [timer, setTimer] = useState(null);

    function getDisplayValue() {
        return <>
            <span>{minutes.toString().padStart(2, '0')}</span>
            :
            <span>{seconds.toString().padStart(2, '0')}</span>
        </>
    }

    function pause() {
        clearInterval(timer);
        setTimer(null);
    }

    function start() {
        let min = minutes;
        let sec = seconds;
        const interval = setInterval(() => {
            console.log(interval);
            if (min === 0 && sec === 0) return clearInterval(interval);
            sec = sec - 1;
            if (sec < 0) {
                min = min - 1;
                sec = 59;
            }
            setSeconds(sec);
            setMinutes(min);
        }, 1000)
        setTimer(interval)
    }

    function reset() {
        pause();
        setSeconds(startingSeconds);
        setMinutes(startingMinutes);
    }

    return (
        <div className='timer-container'>
            <div className='timer'>
                <div className='time'>{getDisplayValue()}</div>
                <div className='buttons'>
                    <button onClick={reset}>Reset</button>
                    <button onClick={timer ? pause : start}>{timer ? "Pause" : "Start"}</button>
                </div>
            </div>
        </div>
    )
}