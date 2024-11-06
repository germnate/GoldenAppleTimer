import { useEffect } from "react"
import { STATUSES, StudySwitch } from "./StudySwitch";
import { useMusicPlayer, useTimer } from "../hooks";
import click from '../assets/button-click.mp3'
import { ActiveTask } from "./ActiveTask";

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
        if (!musicPlayer.breakTrack?.file) return;
        if (isTimerStarted && timer.studyStatus !== STATUSES.study) {
            return musicPlayer.startBreakTrack();
        }
        musicPlayer.pauseBreakTrack();

    }, [isTimerStarted, timer.studyStatus])

    useEffect(() => {
        switch (timer.studyStatus) {
            case STATUSES.study:
                document.querySelector('#tasks-button > img').style.setProperty('filter', 'invert(77%) sepia(57%) saturate(542%) hue-rotate(3deg) brightness(93%) contrast(89%)')
                document.querySelector('#settings-button > img').style.setProperty('filter', 'invert(77%) sepia(57%) saturate(542%) hue-rotate(3deg) brightness(93%) contrast(89%)')
                return document.body.style.setProperty('--primary-color', 'rgb(var(--base-primary-color))')
            case STATUSES.break:
                document.querySelector('#tasks-button > img').style.setProperty('filter', 'invert(43%) sepia(88%) saturate(2752%) hue-rotate(212deg) brightness(94%) contrast(98%)')
                document.querySelector('#settings-button > img').style.setProperty('filter', 'invert(43%) sepia(88%) saturate(2752%) hue-rotate(212deg) brightness(94%) contrast(98%)')
                return document.body.style.setProperty('--primary-color', 'var(--break-color)')
            case STATUSES.longBreak:
                document.querySelector('#tasks-button > img').style.setProperty('filter', 'invert(65%) sepia(73%) saturate(380%) hue-rotate(57deg) brightness(94%) contrast(88%)')
                document.querySelector('#settings-button > img').style.setProperty('filter', 'invert(65%) sepia(73%) saturate(380%) hue-rotate(57deg) brightness(94%) contrast(88%)')

                return document.body.style.setProperty('--primary-color', 'var(--long-break-color)')
            default:
                document.querySelector('#tasks-button > img').style.setProperty('filter', 'invert(77%) sepia(57%) saturate(542%) hue-rotate(3deg) brightness(93%) contrast(89%)')
                document.querySelector('#settings-button > img').style.setProperty('filter', 'invert(77%) sepia(57%) saturate(542%) hue-rotate(3deg) brightness(93%) contrast(89%)')
                return document.body.style.setProperty('--primary-color', 'rgb(var(--base-primary-color))');
        }
    }, [timer.studyStatus])

    function getDisplayValue() {
        return <>
            <span>{timer.activeTimer.minutes.toString().padStart(2, '0')}</span>
            :
            <span>{timer.activeTimer.seconds.toString().padStart(2, '0')}</span>
        </>
    }

    function playClickSound() {
        const clickSound = new Audio(click);
        clickSound.play();
    }

    function onClickReset() {
        playClickSound();
        reset();
    }

    function onClickPauseStart() {
        playClickSound();
        return isTimerStarted ? pause() : start();
    }

    return (
        <div className='timer-container'>
            <div className='timer'>
                <div className='time'>
                    <div className='display'>{getDisplayValue()}</div>
                    <div className='buttons'>
                        <button className='animate-button' onClick={onClickReset}>Reset</button>
                        <button className='animate-button' onClick={onClickPauseStart}>{isTimerStarted ? "Pause" : "Start"}</button>
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
            <ActiveTask />
        </div>
    )
}