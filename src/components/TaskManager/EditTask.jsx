import { useRef, useEffect } from "react"

export function EditTask({ task, removeTask, changeTaskName, save }) {
    const inputRef = useRef(null);

    function onChangeTaskName(e) {
        changeTaskName(task.id, e.target.value)
    }

    function onRemoveTask() {
        removeTask(task.id)
    }

    function onSave() {
        save();
    }

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return;
        onSave();
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])




    return (
        <div
            className='edit-task'
        >
            <input ref={inputRef} type='text' value={task.name} onChange={onChangeTaskName} onKeyDown={handleKeyDown} />
            <div className='actions'>
                <button onClick={onRemoveTask}>Remove</button>
                <button onClick={onSave}>Save</button>
            </div>
        </div>
    )
}