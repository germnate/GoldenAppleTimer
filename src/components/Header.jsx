import gear from '../assets/gear-svgrepo-com.svg'
import task from '../assets/list-task-svgrepo-com.svg'

export function Header({ onClickTask, onClickGear }) {
    return (
        <header>
            <h1>Golden Apple Timer</h1>
            <div className='actions'>
                <button id='tasks-button' onClick={onClickTask}><img src={task} /></button>
                <button id='settings-button' onClick={onClickGear}><img src={gear} /></button>
            </div>
        </header>
    )
}