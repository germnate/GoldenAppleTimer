import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { Task } from "./Task";
import { EditTask } from "./EditTask";
import { useTaskManager } from "../../hooks";

export function TaskManager() {
    const { taskManager } = useTaskManager();
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [draggingTask, setDraggingTask] = useState(null);

    useEffect(() => {
        if (!draggingTask) return;
        taskManager.updateIndex(draggingTask?.id, draggingIndex);
    }, [draggingIndex])

    return (
        <div className='task-manager'>
            <div className='clear-completed-container'>
                <button className='subtle-btn clear-completed' onClick={taskManager.clearCompleted}>Clear Completed</button>
            </div>
            {taskManager.tasksState.tasks.map((task, index) => {
                return index === taskManager.tasksState.editingIndex
                    ? <EditTask
                        key={task.id}
                        task={task}
                        removeTask={taskManager.removeTask}
                        changeTaskName={taskManager.changeTaskName}
                        save={taskManager.saveEdit}
                    />
                    : <Task
                        key={task.id}
                        task={task}
                        toggleChecked={taskManager.toggleChecked}
                        updateIndex={taskManager.updateIndex}
                        setDraggingIndex={setDraggingIndex}
                        setDraggingTask={setDraggingTask}
                        setActive={taskManager.setActive}
                        edit={taskManager.edit}
                        index={index}
                    />
            })}
            <AddTask addTask={taskManager.addTask} />
        </div>
    )
}