import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { Task } from "./Task";
import { EditTask } from "./EditTask";

export function TaskManager() {
    const [tasks, setTasks] = useState([])
    const [editingIndex, setEditingIndex] = useState(-1);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [draggingTask, setDraggingTask] = useState(null);

    useEffect(() => {
        const items = localStorage.getItem('tasks')
        if (!items) return;
        setTasks(JSON.parse(items))
    }, [])

    useEffect(() => {
        if (!draggingTask) return;
        updateIndex(draggingTask?.id, draggingIndex);
    }, [draggingIndex])

    function saveToLocalStorage(items) {
        localStorage.setItem('tasks', JSON.stringify(items || tasks))
    }

    function addTask(task) {
        const updatedTasks = [...tasks, task]
        setTasks(updatedTasks)
        saveToLocalStorage(updatedTasks);
    }

    function removeTask(id) {
        const index = tasks.findIndex(task => task.id === id)
        const splicedTasks = tasks.toSpliced(index, 1)
        setTasks(splicedTasks)
        setEditingIndex(-1)
        saveToLocalStorage(splicedTasks);
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
            const newTasks = prevTasks.map((each, index) => {
                if (each.id !== id) return each;
                if (each.active && !each.checked) { // "not checked" because this represents going from unchecked to checked
                    if (index < prevTasks.length - 1) prevTasks[index + 1].active = true;
                    return { ...each, checked: !each.checked, active: false }
                }
                return { ...each, checked: !each.checked }
            })
            saveToLocalStorage(newTasks);
            return newTasks;
        })
    }

    function setActive(id) {
        setTasks(prevTasks => {
            const newTasks = prevTasks.map((each) => {
                if (each.id !== id) return { ...each, active: false };
                return { ...each, active: true }
            })
            saveToLocalStorage(newTasks)
            return newTasks
        })
    }

    function edit(index) {
        setEditingIndex(index);
    }

    function saveEdit() {
        setEditingIndex(-1);
        saveToLocalStorage();
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
                return index === editingIndex
                    ? <EditTask
                        key={task.id}
                        task={task}
                        removeTask={removeTask}
                        changeTaskName={changeTaskName}
                        save={saveEdit}
                    />
                    : <Task
                        key={task.id}
                        task={task}
                        toggleChecked={toggleChecked}
                        updateIndex={updateIndex}
                        setDraggingIndex={setDraggingIndex}
                        setDraggingTask={setDraggingTask}
                        setActive={setActive}
                        edit={edit}
                        index={index}
                    />
            })}
            <AddTask addTask={addTask} />
        </div>
    )
}