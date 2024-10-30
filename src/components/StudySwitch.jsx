import { useState } from "react";

const NAMES = {
    study: 'study',
    break: 'break',
    longBreak: 'longBreak',
}

export function StudySwitch({ studyStatus, setStudyStatus }) {

    function handleClick(name) {
        return function () {
            setStudyStatus(name);
        }
    }

    return (
        <div className='study-switch'>
            <button
                onClick={handleClick(NAMES.study)}
                className={`${studyStatus === NAMES.study ? 'bold underline' : ''}`}
            >
                Study
            </button>
            <button
                onClick={handleClick(NAMES.break)}
                className={`${studyStatus === NAMES.break ? 'bold underline' : ''}`}
            >
                Break
            </button>
            <button
                onClick={handleClick(NAMES.longBreak)}
                className={`${studyStatus === NAMES.longBreak ? 'bold underline' : ''}`}
            >
                Long Break
            </button>
        </div>
    )
}