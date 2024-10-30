export const STATUSES = {
    study: 'study',
    break: 'break',
    longBreak: 'longBreak',
}

export function StudySwitch({ studyStatus, setStudyStatus, reset }) {

    function handleClick(name) {
        return function () {
            setStudyStatus(name);
            reset(name);
        }
    }

    return (
        <div className='study-switch'>
            <button
                onClick={handleClick(STATUSES.study)}
                className={`${studyStatus === STATUSES.study ? 'bold underline' : ''}`}
            >
                Study
            </button>
            <button
                onClick={handleClick(STATUSES.break)}
                className={`${studyStatus === STATUSES.break ? 'bold underline' : ''}`}
            >
                Break
            </button>
            <button
                onClick={handleClick(STATUSES.longBreak)}
                className={`${studyStatus === STATUSES.longBreak ? 'bold underline' : ''}`}
            >
                Long Break
            </button>
        </div>
    )
}