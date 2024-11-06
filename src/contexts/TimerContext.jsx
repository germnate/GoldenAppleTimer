import { createContext, useReducer, useEffect, useRef } from "react";
import { STATUSES } from "../components/StudySwitch";
import { useSettings } from "../hooks";
import bell from '../assets/bell.mp3'

export const TimerContext = createContext();

const initialState = {
    activeTimer: { minutes: 0, seconds: 0 },
    studyStatus: null,
    interval: null,
    numStudies: 0,
}

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
                if (state.numStudies >= 1) {
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
                activeTimer: action.getTime(nextStatus),
                numStudies: nextNumStudies,
            }
        default:
            throw new Error(`${action?.type} not implemented`)
    }
}

export function TimerProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { preferences } = useSettings();
    const audioBellRef = useRef();
    const isTimerStarted = !!state.interval

    useEffect(() => {
        if (!isTimerStarted && !!state.activeTimer?.minutes && state.studyStatus) {
            return start();
        }
    }, [state.studyStatus])

    useEffect(() => {
        if (!isTimerStarted) reset();
    }, [preferences.studyTimer, preferences.breakTimer, preferences.longBreakTimer])

    function getTime(name) {
        switch (name || state.studyStatus) {
            case STATUSES.study:
                return preferences.studyTimer;
            case STATUSES.break:
                return preferences.breakTimer;
            case STATUSES.longBreak:
                return preferences.longBreakTimer;
            default:
                return preferences.studyTimer;
        }
    }

    function start() {
        console.log('START!', state)
        if (!state.studyStatus) dispatch({ type: 'STUDY_STATUS', studyStatus: STATUSES.study })
        let min = state.activeTimer.minutes;
        let sec = state.activeTimer.seconds;
        const interval = setInterval(() => {
            if (min === 0 && sec === 0) {
                audioBellRef.current.currentTime = 0;
                audioBellRef.current.play();
                return dispatch({ type: 'NEXT', getTime })
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

    function pause() {
        dispatch({ type: 'PAUSE' })
    }

    function reset(name) {
        pause();
        dispatch({ type: 'ACTIVE_TIMER', activeTimer: getTime(name) })
    }

    function setStudyStatus(value) {
        dispatch({ type: 'STUDY_STATUS', studyStatus: value })
    }

    function setActiveTimer(timer = { minutes: 0, seconds: 0 }) {
        dispatch({ type: 'ACTIVE_TIMER', activeTimer: timer })
    }

    return (
        <TimerContext.Provider value={{
            start,
            pause,
            reset,
            isTimerStarted,
            timer: state,
            dispatchToTimer: dispatch,
            setStudyStatus,
            setActiveTimer,
        }}>
            {children}
            <audio ref={audioBellRef} src={bell}></audio>
        </TimerContext.Provider>
    )
}