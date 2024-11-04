import { useEffect } from "react"
import { STATUSES, StudySwitch } from "./StudySwitch";
import { useMusicPlayer, useTimer } from "../hooks";

export function Timer(props) {
    const { timer, setStudyStatus, isTimerStarted, reset, start, pause } = useTimer();
    const { musicPlayer } = useMusicPlayer();

    // manages whether to start or stop study track
    useEffect(() => {
        if (!musicPlayer.tracks?.length) return;
        const activeTrack = musicPlayer.getActiveTrack();
        if (timer.studyStatus !== STATUSES.study) {
            if (!activeTrack) return;
            return musicPlayer.pause();
        }
        if (activeTrack && isTimerStarted) {
            return musicPlayer.unpause();
        }
        if (activeTrack && !isTimerStarted) {
            return musicPlayer.pause();
        }
        if (!activeTrack && isTimerStarted) {
            return musicPlayer.startTrack(musicPlayer.tracks[0].id)
        }
    }, [isTimerStarted, timer.studyStatus])

    //manages whether to start or stop break track
    useEffect(() => {
        if (isTimerStarted && timer.studyStatus !== STATUSES.study) {
            return musicPlayer.startBreakTrack();
        }
        musicPlayer.pauseBreakTrack();

    }, [isTimerStarted, timer.studyStatus])

    useEffect(() => {
        switch (timer.studyStatus) {
            case STATUSES.study:
                return document.body.style.setProperty('--primary-color', 'rgb(var(--base-primary-color))');
            case STATUSES.break:
                return document.body.style.setProperty('--primary-color', 'var(--break-color)');
            case STATUSES.longBreak:
                return document.body.style.setProperty('--primary-color', 'var(--long-break-color)');
            default:
                return document.body.style.setProperty('--primary-color', 'rgb(220, 193, 56)');
        }
    }, [timer.studyStatus])

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
                <div className='time'>
                    <div className='display'>{getDisplayValue()}</div>
                    <div className='buttons'>
                        <button className='animate-button' onClick={() => reset()}>Reset</button>
                        <button className='animate-button' onClick={isTimerStarted ? pause : start}>{isTimerStarted ? "Pause" : "Start"}</button>
                    </div>
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