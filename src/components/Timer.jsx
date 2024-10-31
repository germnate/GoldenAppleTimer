import { useEffect, useReducer, useState } from "react"
import { StudySwitch, STATUSES } from "./StudySwitch";

export function Timer(props) {
    const initialState = {
        activeTimer: props.studyTime,
        studyStatus: null,
        interval: null,
        numStudies: 0,
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (!state.interval && !!state.activeTimer?.minutes && state.studyStatus) {
            return start();
        }
    }, [state.studyStatus])

    function reducer(state, action) {
        switch (action.type) {
            case "ACTIVE_TIMER":
                return {
                    ...state,
                    activeTimer: action.activeTimer
                }
            case "STUDY_STATUS":
                return {
                    ...state,
                    studyStatus: action.studyStatus
                }
            case "INTERVAL":
                return {
                    ...state,
                    interval: action.interval,
                }
            case "PAUSE":
                clearInterval(state.interval)
                return {
                    ...state,
                    interval: null,
                }
            case 'NEXT':
                clearInterval(state.interval)
                let nextStatus = null;
                let nextNumStudies = state.numStudies;
                if (state.studyStatus === STATUSES.study) {
                    if (state.numStudies > 2) {
                        nextNumStudies = 0;
                        nextStatus = STATUSES.longBreak;
                    } else {
                        nextNumStudies += 1;
                        nextStatus = STATUSES.break;
                    }
                }
                if (state.studyStatus === STATUSES.break) nextStatus = STATUSES.study;
                if (state.studyStatus === STATUSES.longBreak) nextStatus = STATUSES.study;
                return {
                    ...state,
                    interval: null,
                    studyStatus: nextStatus,
                    activeTimer: getTime(nextStatus),
                    numStudies: nextNumStudies,
                }
            default:
                throw new Error(`${action.type} not implemented`)
        }
    }

    function getTime(name) {
        switch (name || state.studyStatus) {
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
            <span>{state.activeTimer.minutes.toString().padStart(2, '0')}</span>
            :
            <span>{state.activeTimer.seconds.toString().padStart(2, '0')}</span>
        </>
    }

    function pause() {
        dispatch({ type: 'PAUSE' })
    }

    function start() {
        console.log('START!', state)
        if (!state.studyStatus) dispatch({ type: 'STUDY_STATUS', studyStatus: STATUSES.study })
        let min = state.activeTimer.minutes;
        let sec = state.activeTimer.seconds;
        const interval = setInterval(() => {
            if (min === 0 && sec === 0) {
                return dispatch({ type: 'NEXT' })
                // return pause();
            }
            sec = sec - 1;
            if (sec < 0) {
                min = min - 1;
                sec = 59;
            }
            dispatch({ type: 'ACTIVE_TIMER', activeTimer: { minutes: min, seconds: sec } })
        }, 1000)
        dispatch({ type: 'INTERVAL', interval })
    }

    function reset(name) {
        pause();
        dispatch({ type: 'ACTIVE_TIMER', activeTimer: getTime(name) })
    }

    return (
        <div className='timer-container'>
            <div className='timer'>
                <div className='time'>{getDisplayValue()}</div>
                <div className='buttons'>
                    <button onClick={() => reset()}>Reset</button>
                    <button onClick={state.interval ? pause : start}>{state.interval ? "Pause" : "Start"}</button>
                </div>
            </div>
            <div className='study-section'>
                <StudySwitch
                    studyStatus={state.studyStatus}
                    setStudyStatus={(value) => dispatch({ type: 'STUDY_STATUS', studyStatus: value })}
                    reset={reset}
                />
            </div>
        </div>
    )
}