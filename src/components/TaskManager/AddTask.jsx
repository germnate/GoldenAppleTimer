import { useState } from "react"
import { v4 as uuid } from 'uuid'

export function AddTask({ addTask }) {
    const [task, setTask] = useState({ id: '', name: '', checked: false })

    function onAdd() {
        addTask({ ...task, id: uuid() })
        setTask({ id: '', name: '', checked: false })
    }

    return (
        <button className='add-task' onClick={onAdd}>Add</button>
    )
}