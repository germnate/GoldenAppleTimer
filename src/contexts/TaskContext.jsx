import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasksState, setTasksState] = useState({ editingIndex: -1, tasks: [] })

    useEffect(() => {
        const items = localStorage.getItem('tasks')
        if (!items) return;
        setTasksState({ ...tasksState, tasks: JSON.parse(items) })
    }, [])

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

    function getActive() {
        return tasksState.tasks.find(each => each.active)
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
        <TaskContext.Provider value={{
            taskManager: {
                updateIndex,
                saveEdit,
                edit,
                setActive,
                toggleChecked,
                changeTaskName,
                clearCompleted,
                removeTask,
                addTask,
                saveToLocalStorage,
                tasksState,
                setTasksState,
                getActive
            }
        }}>
            {children}
        </TaskContext.Provider>
    )
}