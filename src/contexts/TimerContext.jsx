import { createContext, useReducer } from "react";
import { STATUSES } from "../components/StudySwitch";

export const TimerContext = createContext();

const initialState = {
    activeTimer: { minutes: 0, seconds: 0 },
    studyStatus: null,
    interval: null,
    numStudies: 0,
}

export function TimerProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

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
                return { minutes: 30, seconds: 0 }
            case STATUSES.break:
                return { minutes: 5, seconds: 0 }
            case STATUSES.longBreak:
                return { minutes: 15, seconds: 0 }
            default:
                return { minutes: 30, seconds: 0 }
        }
    }

    function start() {
        console.log('START!', state)
        if (!state.studyStatus) dispatch({ type: 'STUDY_STATUS', studyStatus: STATUSES.study })
        let min = state.activeTimer.minutes;
        let sec = state.activeTimer.seconds;
        const interval = setInterval(() => {
            if (min === 0 && sec === 0) {
                return dispatch({ type: 'NEXT' })
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
            isTimerStarted: !!state.interval,
            timer: state,
            dispatchToTimer: dispatch,
            setStudyStatus,
            setActiveTimer,
        }}>
            {children}
        </TimerContext.Provider>
    )
}