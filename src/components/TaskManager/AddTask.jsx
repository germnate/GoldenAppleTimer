import { useState } from "react"

export function AddTask({ addTask }) {
    const [task, setTask] = useState({ id: '', name: '', checked: false })

    function onChangeName(e) {
        setTask({ ...task, name: e.target.value })
    }

    function onAdd() {
        addTask({ ...task, id: crypto.randomUUID() })
        setTask({ id: '', name: '', checked: false })
    }

    return (
        <div>
            <input type='text' value={task.name} onChange={onChangeName} />
            <button onClick={onAdd}>Add</button>
        </div>
    )
}