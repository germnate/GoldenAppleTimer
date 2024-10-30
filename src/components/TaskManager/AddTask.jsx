import { useState } from "react"
import { v4 as uuid } from 'uuid'

export function AddTask({ addTask }) {
    const [task, setTask] = useState({ id: '', name: '', checked: false })

    function onChangeName(e) {
        setTask({ ...task, name: e.target.value })
    }

    function onAdd() {
        addTask({ ...task, id: uuid() })
        setTask({ id: '', name: '', checked: false })
    }

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return;
        onAdd();
    }

    return (
        <div className='add-task'>
            <input type='text' value={task.name} onChange={onChangeName} onKeyDown={handleKeyDown} />
            <button onClick={onAdd}>Add</button>
        </div>
    )
}