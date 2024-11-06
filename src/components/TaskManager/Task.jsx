import { useState, useRef } from "react"

export function Task({ task, edit, setActive, toggleChecked, setDraggingIndex, setDraggingTask, index }) {
    const [grabbing, setGrabbing] = useState(false);
    const checkBoxRef = useRef(null);

    function onToggleChecked() {
        toggleChecked(task.id)
    }

    function onEdit() {
        edit(index);
    }

    function grab(e) {
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

    function onSetActive(e) {
        if (e.target === checkBoxRef.current) return;
        setActive(task.id)
    }

    const classNames = ['task draggable']
        .concat(grabbing ? 'grabbing opacity-35' : 'grab')
        .concat(task.active ? 'active' : [])
        .join(' ')

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
            <input ref={checkBoxRef} type='checkbox' checked={task.checked} onChange={onToggleChecked} />
            <span onClick={onSetActive} className={`${task.checked ? 'strikethrough' : ''}`}>{task.name}</span>
            <button className='vellip' onClick={onEdit}>&#8942;</button>
        </div>
    )
}