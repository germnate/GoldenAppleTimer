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
import { MusicPlayer } from './components/MusicPlayer'
import { Provider } from './contexts'
import { html } from '../README.md'

function App() {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [timers, setTimers] = useState({
    studyTime: { minutes: 30, seconds: 0 },
    breakTime: { minutes: 5, seconds: 0 },
    longBreakTime: { minutes: 15, seconds: 0 },
  })

  function onClickAbout() {
    setAboutOpen(true);
  }

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

  function closeAbout() {
    setAboutOpen(false);
  }

  function saveSettings(settingsObj) {
    setTimers({
      studyTime: { minutes: settingsObj.studyMinutes, seconds: 0 },
      breakTime: { minutes: settingsObj.breakMinutes, seconds: 0 },
      longBreakTime: { minutes: settingsObj.longBreakMinutes, seconds: 0 },
    })
  }

  function renderMarkdown() {
    const markup = { __html: html };
    return <div className='markdown' dangerouslySetInnerHTML={markup} />;
  }

  return (
    <Provider>
      <div className='container'>
        <Header onClickAbout={onClickAbout} onClickTask={onClickTask} onClickGear={onClickGear} />
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
      <Modal isOpen={aboutOpen} close={closeAbout} header='About'>
        {renderMarkdown()}
      </Modal>
    </Provider>
  )
}

export default App
