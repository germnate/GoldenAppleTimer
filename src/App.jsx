import { useState } from 'react'
import { Header } from './components/Header'
import { Timer } from './components/Timer'
import './styles/index.css'
import './styles/main-page.css'
import './styles/task-manager.css'
import { Modal } from './components/Modal'
import { TaskManager } from './components/TaskManager'

function App() {
  const [tasksOpen, setTasksOpen] = useState(false);

  function onClickTask() {
    setTasksOpen(true);
  }

  function closeTasks() {
    setTasksOpen(false);
  }

  return (
    <div className='container'>
      <Header onClickTask={onClickTask} />
      <main>
        <Timer startingMinutes={25} startingSeconds={30} />
      </main>
      <Modal isOpen={tasksOpen} close={closeTasks} header='Tasks'>
        <TaskManager />
      </Modal>
    </div>
  )
}

export default App
