import { useState } from "react"

export function Settings({ save, close }) {
    const [studyMinutes, setStudyMinutes] = useState(30);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [longBreakMinutes, setLongBreakMinutes] = useState(15);

    function handleChangeMinutes(callback) {
        return function (e) {
            callback(e.target.value)
        }
    }

    function onSave() {
        save({
            studyMinutes,
            breakMinutes,
            longBreakMinutes,
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