import { useState } from "react"

export function Task({ task, removeTask, changeTaskName, toggleChecked, setDraggingIndex, setDraggingTask, index }) {
    const [grabbing, setGrabbing] = useState(false);

    function onChangeTaskName(e) {
        changeTaskName(task.id, e.target.value)
    }

    function onRemoveTask() {
        removeTask(task.id)
    }

    function onToggleChecked() {
        toggleChecked(task.id)
    }

    function grab() {
        setDraggingTask(task);
        setDraggingIndex(index)
        setGrabbing(true);
    }

    function drop() {
        setDraggingTask(null);
        setDraggingIndex(null);
        setGrabbing(false);
    }

    function onDragOver(e) {
        setDraggingIndex(index);
    }

    const classNames = ['task'].concat(grabbing ? 'grabbing hidden' : 'grab').join(' ')

    return (
        <div className={classNames} onDragStart={grab} onDragEnd={drop} onDragOver={onDragOver} draggable>
            <input type='checkbox' checked={task.checked} onChange={onToggleChecked} />
            <span className={`${task.checked ? 'strikethrough' : ''}`}>{task.name}</span>
            <button onClick={onRemoveTask}>&times;</button>
        </div>
    )
}