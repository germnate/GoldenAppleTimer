import { useEffect, useState } from "react"
import { DEFAULT_TIMERS } from "../../contexts/SettingsContext";
import { useSettings } from "../../hooks";

export function Settings({ close }) {
    const { saveTimers, preferences, load } = useSettings()
    const [studyMinutes, setStudyMinutes] = useState(preferences.studyTimer?.minutes || DEFAULT_TIMERS.study.minutes);
    const [breakMinutes, setBreakMinutes] = useState(preferences.breakTimer?.minutes || DEFAULT_TIMERS.break.minutes);
    const [longBreakMinutes, setLongBreakMinutes] = useState(preferences.longBreakTimer?.minutes || DEFAULT_TIMERS.longBreak.minutes);

    useEffect(() => {
        console.log(preferences)
        setStudyMinutes(preferences.studyTimer?.minutes || DEFAULT_TIMERS.study.minutes)
        setBreakMinutes(preferences.breakTimer?.minutes || DEFAULT_TIMERS.break.minutes)
        setLongBreakMinutes(preferences.longBreakTimer?.minutes || DEFAULT_TIMERS.longBreak.minutes)
    }, [preferences])

    function handleChangeMinutes(callback) {
        return function (e) {
            callback(e.target.value)
        }
    }

    function onSave() {
        saveTimers({
            studyTimer: { minutes: Number(studyMinutes), seconds: 0 },
            breakTimer: { minutes: Number(breakMinutes), seconds: 0 },
            longBreakTimer: { minutes: Number(longBreakMinutes), seconds: 0 },
        })
        close();
    }

    function cancel() {
        load();
        setStudyMinutes(preferences.studyTimer?.minutes || DEFAULT_TIMERS.study.minutes)
        setBreakMinutes(preferences.breakTimer?.minutes || DEFAULT_TIMERS.break.minutes)
        setLongBreakMinutes(preferences.longBreakTimer?.minutes || DEFAULT_TIMERS.longBreak.minutes)
        close();
    }

    return (
        <div className='settings'>
            <div className='timer-settings'>
                <div>
                    <label>Study</label>
                    <input type='number' value={studyMinutes} onChange={handleChangeMinutes(setStudyMinutes)} />
                </div>
                <div>
                    <label>Break</label>
                    <input type='number' value={breakMinutes} onChange={handleChangeMinutes(setBreakMinutes)} />
                </div>
                <div>
                    <label>Long Break</label>
                    <input type='number' value={longBreakMinutes} onChange={handleChangeMinutes(setLongBreakMinutes)} />
                </div>
            </div>
            <div className='footer'>
                <button className='cancel' onClick={cancel}>Cancel</button>
                <button onClick={onSave}>Save</button>
            </div>
        </div>
    )
}