import { useState } from 'react'
import { Header } from './components/Header'
import { Timer } from './components/Timer'
import './styles/index.css'
import './styles/main-page.css'
import './styles/task-manager.css'
import './styles/settings.css'
import './styles/study-switch.css'
import { Modal } from './components/Modal'
import { TaskManager } from './components/TaskManager'
import { Settings } from './components/Settings'

function App() {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [studyTime, setStudyTime] = useState({ minutes: 30, seconds: 0 })
  const [shortBreak, setBreakTime] = useState({ minutes: 5, seconds: 0 })
  const [longBreak, setLongBreakTime] = useState({ minutes: 15, seconds: 0 })

  function onClickTask() {
    setTasksOpen(true);
  }

  function onClickGear() {
    setSettingsOpen(true);
  }

  function closeTasks() {
    setTasksOpen(false);
  }

  function closeSettings() {
    setSettingsOpen(false);
  }

  function saveSettings(settingsObj) {
    console.log(settingsObj)
    setStudyTime({ minutes: settingsObj.studyMinutes, seconds: 0 })
    setBreakTime({ minutes: settingsObj.breakMinutes, seconds: 0 })
    setLongBreakTime({ minutes: settingsObj.longBreakMinutes, seconds: 0 })
  }

  return (
    <div className='container'>
      <Header onClickTask={onClickTask} onClickGear={onClickGear} />
      <main>
        <Timer studyTime={studyTime} breakTime={shortBreak} longBreakTime={longBreak} />
      </main>
      <Modal isOpen={tasksOpen} close={closeTasks} header='Tasks'>
        <TaskManager />
      </Modal>
      <Modal isOpen={settingsOpen} close={closeSettings} header='Settings'>
        <Settings save={saveSettings} close={closeSettings} />
      </Modal>
    </div>
  )
}

export default App
