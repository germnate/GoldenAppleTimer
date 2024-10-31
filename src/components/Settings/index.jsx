import { useState } from "react"
import { DEFAULT_TIMERS } from "../../contexts/SettingsContext";
import { useSettings } from "../../hooks";

export function Settings({ close }) {
    const { save } = useSettings()
    const [studyMinutes, setStudyMinutes] = useState(DEFAULT_TIMERS.study.minutes);
    const [breakMinutes, setBreakMinutes] = useState(DEFAULT_TIMERS.break.minutes);
    const [longBreakMinutes, setLongBreakMinutes] = useState(DEFAULT_TIMERS.longBreak.minutes);

    function handleChangeMinutes(callback) {
        return function (e) {
            callback(e.target.value)
        }
    }

    function onSave() {
        save({
            studyTimer: { minutes: studyMinutes, seconds: 0 },
            breakTimer: { minutes: breakMinutes, seconds: 0 },
            longBreakTimer: { minutes: longBreakMinutes, seconds: 0 },
        })
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
                <button onClick={onSave}>Save</button>
            </div>
        </div>
    )
}