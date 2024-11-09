import gear from '../assets/gear-svgrepo-com.svg'
import task from '../assets/list-task-svgrepo-com.svg'
import questionMark from '../assets/fluent--question-28-filled.svg'

export function Header({ onClickTask, onClickGear, onClickAbout }) {
    return (
        <header>
            <h1>Golden Apple Timer</h1>
            <div className='actions'>
                <button id='tasks-button' onClick={onClickTask}><img src={task} /></button>
                <button id='settings-button' onClick={onClickGear}><img src={gear} /></button>
                <button id='about-button' onClick={onClickAbout}><img src={questionMark} /></button>
            </div>
        </header>
    )
}