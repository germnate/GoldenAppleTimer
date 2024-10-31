import { createContext, useReducer } from "react";

export const SettingsContext = createContext();

export const DEFAULT_TIMERS = {
    study: { minutes: 30, seconds: 0 },
    break: { minutes: 5, seconds: 0 },
    longBreak: { minutes: 15, seconds: 0 },
}

const SETTINGS_ACTIONS = {
    updateTimers: 'UPDATE_TIMERS'
}

const initialState = {
    studyTimer: { ...DEFAULT_TIMERS.study },
    breakTimer: { ...DEFAULT_TIMERS.break },
    longBreakTimer: { ...DEFAULT_TIMERS.longBreak },
}

function reducer(state, action) {
    switch (action.type) {
        case SETTINGS_ACTIONS.updateTimers:
            return {
                ...state,
                studyTimer: action?.studyTimer || state.studyTimer,
                breakTimer: action?.breakTimer || state.breakTimer,
                longBreakTimer: action?.longBreakTimer || state.longBreakTimer,
            }
        default:
            throw new Error(`${action?.type} not implemented.`)
    }
}

export function SettingsProvider({ children }) {
    const [preferences, dispatchPreferences] = useReducer(reducer, initialState);

    function load() {
        // load settings from localStorage
    }


    function save(settings = {}) {
        const { studyTimer, breakTimer, longBreakTimer } = settings;
        dispatchPreferences({
            type: SETTINGS_ACTIONS.updateTimers,
            studyTimer,
            breakTimer,
            longBreakTimer,
        })
        // save settings to localStorage
    }

    return <SettingsContext.Provider value={{
        save,
        load,
        preferences,
        dispatchPreferences,
    }}>
        {children}
    </SettingsContext.Provider>
}