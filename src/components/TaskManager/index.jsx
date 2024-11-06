import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { Task } from "./Task";
import { EditTask } from "./EditTask";

export function TaskManager() {
    const [tasksState, setTasksState] = useState({ editingIndex: -1, tasks: [] })
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [draggingTask, setDraggingTask] = useState(null);

    useEffect(() => {
        const items = localStorage.getItem('tasks')
        if (!items) return;
        setTasksState({ ...tasksState, tasks: JSON.parse(items) })
    }, [])

    useEffect(() => {
        if (!draggingTask) return;
        updateIndex(draggingTask?.id, draggingIndex);
    }, [draggingIndex])

    function saveToLocalStorage(items) {
        localStorage.setItem('tasks', JSON.stringify(items || tasksState.tasks))
    }

    function addTask(task) {
        const updatedTasks = [...tasksState.tasks, task]
        setTasksState({ ...tasksState, tasks: updatedTasks, editingIndex: updatedTasks.length - 1 })
        saveToLocalStorage(updatedTasks);
    }

    function removeTask(id) {
        const index = tasksState.tasks.findIndex(task => task.id === id);
        const splicedTasks = tasksState.tasks.toSpliced(index, 1);
        setTasksState({ editingIndex: -1, tasks: splicedTasks })
        saveToLocalStorage(splicedTasks);
    }

    function clearCompleted() {
        const newTasks = tasksState.tasks.filter(task => !task.checked)
        setTasksState({ editingIndex: -1, tasks: newTasks })
        saveToLocalStorage(newTasks);
    }

    function changeTaskName(id, name) {
        setTasksState(prevTasksState => {
            const newTasks = prevTasksState.tasks.map((each) => {
                if (each.id !== id) return each;
                return { ...each, name }
            })
            return { ...prevTasksState, tasks: newTasks }
        })
    }

    function toggleChecked(id) {
        setTasksState(prevTasksState => {
            const newTasks = prevTasksState.tasks.map((each, index) => {
                if (each.id !== id) return each;
                if (each.active && !each.checked) { // "not checked" because this represents going from unchecked to checked
                    if (index < prevTasksState.tasks.length - 1) prevTasksState.tasks[index + 1].active = true;
                    return { ...each, checked: !each.checked, active: false }
                }
                return { ...each, checked: !each.checked }
            })
            saveToLocalStorage(newTasks);
            return { ...prevTasksState, tasks: newTasks };
        })
    }

    function setActive(id) {
        setTasksState(prevTasksState => {
            const newTasks = prevTasksState.tasks.map((each) => {
                if (each.id !== id) return { ...each, active: false };
                return { ...each, active: true }
            })
            saveToLocalStorage(newTasks)
            return { ...prevTasksState, tasks: newTasks }
        })
    }

    function edit(index) {
        setTasksState({ ...tasksState, editingIndex: index })
    }

    function saveEdit() {
        setTasksState({ ...tasksState, editingIndex: -1 })
        saveToLocalStorage();
    }

    function updateIndex(id, newIndex) {
        setTasksState(prevTasksState => {
            const oldIndex = prevTasksState.tasks.findIndex(task => task.id === id)
            const item = prevTasksState.tasks[oldIndex];
            return { ...prevTasksState, tasks: prevTasksState.tasks.toSpliced(oldIndex, 1).toSpliced(newIndex, 0, item) }
        })
    }

    return (
        <div className='task-manager'>
            <div className='clear-completed-container'>
                <button className='subtle-btn clear-completed' onClick={clearCompleted}>Clear Completed</button>
            </div>
            {tasksState.tasks.map((task, index) => {
                return index === tasksState.editingIndex
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