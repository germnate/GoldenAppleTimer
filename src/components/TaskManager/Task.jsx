export function Task({ task, removeTask, changeTaskName, toggleChecked }) {
    function onChangeTaskName(e) {
        changeTaskName(task.id, e.target.value)
    }

    function onRemoveTask() {
        removeTask(task.id)
    }

    function onToggleChecked() {
        toggleChecked(task.id)
    }

    return (
        <div className='task'>
            <input type='checkbox' checked={task.checked} onChange={onToggleChecked} />
            <span className={`${task.checked ? 'strikethrough' : ''}`}>{task.name}</span>
            <button onClick={onRemoveTask}>&times;</button>
        </div>
    )
}