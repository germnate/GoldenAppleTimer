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
import { TimerProvider } from './contexts/TimerContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { MusicPlayer } from './components/MusicPlayer'
import { MusicPlayerProvider } from './contexts/MusicPlayerContext'

function App() {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [timers, setTimers] = useState({
    studyTime: { minutes: 30, seconds: 0 },
    breakTime: { minutes: 5, seconds: 0 },
    longBreakTime: { minutes: 15, seconds: 0 },
  })

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
    setTimers({
      studyTime: { minutes: settingsObj.studyMinutes, seconds: 0 },
      breakTime: { minutes: settingsObj.breakMinutes, seconds: 0 },
      longBreakTime: { minutes: settingsObj.longBreakMinutes, seconds: 0 },
    })
  }

  function onChangeFile(e) {
    setFiles(() => {
      const f = e.target.files
      if (!f?.length) return;
      return [...f].map(each => {
        return { file: each, url: URL.createObjectURL(each) }
      })
    })
  }

  return (
    <SettingsProvider>
      <TimerProvider>
        <MusicPlayerProvider>
          <div className='container'>
            <Header onClickTask={onClickTask} onClickGear={onClickGear} />
            <main>
              <Timer studyTime={timers.studyTime} breakTime={timers.breakTime} longBreakTime={timers.longBreakTime} />
              <MusicPlayer />
            </main>
            <Modal isOpen={tasksOpen} close={closeTasks} header='Tasks'>
              <TaskManager />
            </Modal>
            <Modal isOpen={settingsOpen} close={closeSettings} header='Settings'>
              <Settings save={saveSettings} close={closeSettings} />
            </Modal>
          </div>
        </MusicPlayerProvider>
      </TimerProvider>
    </SettingsProvider>
  )
}

export default App
