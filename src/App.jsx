import { Header } from './components/Header'
import { Timer } from './components/Timer'
import './styles/index.css'
import './styles/main-page.css'

function App() {

  return (
    <div className='container'>
      <Header />
      <main>
        <Timer startingMinutes={25} startingSeconds={30} />
      </main>
    </div>
  )
}

export default App
