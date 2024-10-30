import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { Task } from "./Task";

export function TaskManager() {
    const [tasks, setTasks] = useState([])
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [draggingTask, setDraggingTask] = useState(null);

    useEffect(() => {
        if (!draggingTask) return;
        updateIndex(draggingTask?.id, draggingIndex);
    }, [draggingIndex])

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

    function updateIndex(id, newIndex) {
        setTasks(prev => {
            const oldIndex = prev.findIndex(task => task.id === id)
            const item = prev[oldIndex];
            return prev.toSpliced(oldIndex, 1).toSpliced(newIndex, 0, item)
        })
    }

    return (
        <div className='task-manager'>
            {tasks.map((task, index) => {
                return <Task
                    key={task.id}
                    task={task}
                    removeTask={removeTask}
                    changeTaskName={changeTaskName}
                    toggleChecked={toggleChecked}
                    updateIndex={updateIndex}
                    setDraggingIndex={setDraggingIndex}
                    setDraggingTask={setDraggingTask}
                    index={index}
                />
            })}
            <AddTask addTask={addTask} />
        </div>
    )
}