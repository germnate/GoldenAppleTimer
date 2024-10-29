import gear from '../assets/gear-svgrepo-com.svg'
import task from '../assets/list-task-svgrepo-com.svg'

export function Header() {
    return (
        <header>
            <h1>Golden Apple Timer</h1>
            <div className='actions'>
                <button><img src={task} /></button>
                <button><img src={gear} /></button>
            </div>
        </header>
    )
}