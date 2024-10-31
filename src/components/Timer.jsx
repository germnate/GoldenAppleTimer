import { useEffect } from "react"
import { StudySwitch } from "./StudySwitch";
import { useTimer } from "../hooks";

export function Timer(props) {
    const { timer, setStudyStatus, isTimerStarted, reset, start, pause } = useTimer();

    function getDisplayValue() {
        return <>
            <span>{timer.activeTimer.minutes.toString().padStart(2, '0')}</span>
            :
            <span>{timer.activeTimer.seconds.toString().padStart(2, '0')}</span>
        </>
    }

    return (
        <div className='timer-container'>
            <div className='timer'>
                <div className='time'>{getDisplayValue()}</div>
                <div className='buttons'>
                    <button onClick={() => reset()}>Reset</button>
                    <button onClick={isTimerStarted ? pause : start}>{isTimerStarted ? "Pause" : "Start"}</button>
                </div>
            </div>
            <div className='study-section'>
                <StudySwitch
                    studyStatus={timer.studyStatus}
                    setStudyStatus={setStudyStatus}
                    reset={reset}
                />
            </div>
        </div>
    )
}