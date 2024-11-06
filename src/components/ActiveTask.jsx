import { useTaskManager } from "../hooks";

export function ActiveTask() {
    const { taskManager } = useTaskManager();

    const activeTask = taskManager.getActive();

    return (
        <div className='display-active-task active' onClick={() => taskManager.toggleChecked(activeTask?.id)}>
            {activeTask ? <input type='checkbox' checked={activeTask?.checked || false} onChange={() => { }} /> : null}
            <span className={activeTask?.checked ? 'strikethrough' : ''}>{activeTask?.id ? activeTask.name : 'No active task selected'}</span>
        </div>
    )
}