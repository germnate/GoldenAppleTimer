import { createContext, useEffect, useReducer } from "react";

export const SettingsContext = createContext();

export const DEFAULT_TIMERS = {
    study: { minutes: 30, seconds: 0 },
    break: { minutes: 5, seconds: 0 },
    longBreak: { minutes: 15, seconds: 0 },
}

const SETTINGS = {
    save: 'SAVE',
    load: 'LOAD',
    updateTimers: 'UPDATE_TIMERS',
}

const initialState = {
    studyTimer: { ...DEFAULT_TIMERS.study },
    breakTimer: { ...DEFAULT_TIMERS.break },
    longBreakTimer: { ...DEFAULT_TIMERS.longBreak },
}

function save(settings) {
    localStorage.setItem('settings', JSON.stringify(settings))
}

function load() {
    const settings = localStorage.getItem('settings')
    if (!settings) return null;
    return JSON.parse(settings)
}

function reducer(state, action) {
    switch (action.type) {
        case SETTINGS.save:
            save(actions.settings || state)
            return action.settings
        case SETTINGS.load:
            const settings = load();
            return settings || initialState
        case SETTINGS.updateTimers:
            const updatedState = {
                ...state,
                studyTimer: action?.studyTimer || state.studyTimer,
                breakTimer: action?.breakTimer || state.breakTimer,
                longBreakTimer: action?.longBreakTimer || state.longBreakTimer,
            }
            save(updatedState);
            return updatedState;
        default:
            throw new Error(`${action?.type} not implemented.`)
    }
}

export function SettingsProvider({ children }) {
    const [preferences, dispatchPreferences] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatchLoad();
    }, [])

    function saveTimers(settings = {}) {
        const { studyTimer, breakTimer, longBreakTimer } = settings;
        return dispatchPreferences({
            type: SETTINGS.updateTimers,
            studyTimer,
            breakTimer,
            longBreakTimer,
        })
    }

    function dispatchSave(settings) {
        if (!settings) throw new Error('cannot save undefined or null. If you want to clear settings save and empty object.')
        return dispatchPreferences({ type: SETTINGS.save })
    }

    function dispatchLoad() {
        return dispatchPreferences({ type: SETTINGS.load })
    }

    return <SettingsContext.Provider value={{
        saveTimers,
        save: dispatchSave,
        load: dispatchLoad,
        preferences,
        dispatchPreferences,
    }}>
        {children}
    </SettingsContext.Provider>
}