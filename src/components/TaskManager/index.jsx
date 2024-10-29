import { useState } from "react";
import { AddTask } from "./AddTask";
import { Task } from "./Task";

export function TaskManager() {
    const [tasks, setTasks] = useState([])

    function addTask(task) {
        setTasks([...tasks, task])
    }

    function removeTask(id) {
        const index = tasks.findIndex(task => task.id === id)
        setTasks(tasks.toSpliced(index, 1))
    }

    function changeTaskName(id, name) {
        setTasks(prevTasks => {
            return prevTasks.map((each) => {
                if (each.id !== id) return each;
                return { ...each, name }
            })
        })
    }

    function toggleChecked(id) {
        setTasks(prevTasks => {
            return prevTasks.map((each) => {
                if (each.id !== id) return each;
                return { ...each, checked: !each.checked }
            })
        })
    }

    return (
        <div className='task-manager'>
            {tasks.map(task => {
                return <Task
                    key={task.id}
                    task={task}
                    removeTask={removeTask}
                    changeTaskName={changeTaskName}
                    toggleChecked={toggleChecked}
                />
            })}
            <AddTask addTask={addTask} />
        </div>
    )
}