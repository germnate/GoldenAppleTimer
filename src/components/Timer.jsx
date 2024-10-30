import { useEffect, useState } from "react"
import { StudySwitch, STATUSES } from "./StudySwitch";

export function Timer(props) {
    const [activeTimer, setActiveTimer] = useState(props.studyTime);
    const [studyStatus, setStudyStatus] = useState('')
    const [timer, setTimer] = useState(null);

    function getTime(name) {
        switch (name || studyStatus) {
            case STATUSES.study:
                return props.studyTime
            case STATUSES.break:
                return props.breakTime
            case STATUSES.longBreak:
                return props.longBreakTime
            default:
                return props.studyTime
        }
    }

    function getDisplayValue() {
        return <>
            <span>{activeTimer.minutes.toString().padStart(2, '0')}</span>
            :
            <span>{activeTimer.seconds.toString().padStart(2, '0')}</span>
        </>
    }

    function pause() {
        clearInterval(timer);
        setTimer(null);
    }

    function start() {
        if (!studyStatus) setStudyStatus(STATUSES.study)
        let min = activeTimer.minutes;
        let sec = activeTimer.seconds;
        const interval = setInterval(() => {
            if (min === 0 && sec === 0) return clearInterval(interval);
            sec = sec - 1;
            if (sec < 0) {
                min = min - 1;
                sec = 59;
            }
            setActiveTimer({ minutes: min, seconds: sec })
        }, 1000)
        setTimer(interval)
    }

    function reset(name) {
        pause();
        setActiveTimer(getTime(name))
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
            <div className='study-section'>
                <StudySwitch
                    studyStatus={studyStatus}
                    setStudyStatus={setStudyStatus}
                    reset={reset}
                />
            </div>
        </div>
    )
}