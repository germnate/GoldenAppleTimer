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

    function grab(e) {
        e.dataTransfer.effectAllowed = 'move';
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
        e.preventDefault();
        e.dataTransfer.effectAllowed = 'move';
        setDraggingIndex(index);
    }

    function onTouchMove(e) {
        const touch = e.touches[0];
        draggedInRange(touch);
    }

    function draggedInRange(event) {
        const elements = document.querySelectorAll('.draggable')
        elements.forEach((element, intersectedIndex) => {
            const rect = element.getBoundingClientRect();
            const isInXRange = event.clientX >= rect.left && event.clientX <= rect.right;
            const isInYRange = event.clientY >= rect.top && event.clientY <= rect.bottom;
            if (isInXRange && isInYRange) {
                setDraggingIndex(intersectedIndex)
            }
        })
    }

    const classNames = ['task draggable'].concat(grabbing ? 'grabbing opacity-35' : 'grab').join(' ')

    return (
        <div
            className={classNames}
            onDragStart={grab}
            onDragEnd={drop}
            onDragOver={onDragOver}
            onTouchStart={grab}
            onTouchEnd={drop}
            onTouchMove={onTouchMove}
            draggable
        >
            <input type='checkbox' checked={task.checked} onChange={onToggleChecked} />
            <span className={`${task.checked ? 'strikethrough' : ''}`}>{task.name}</span>
            <button className='vellip' onClick={onRemoveTask}>&#8942;</button>
        </div>
    )
}