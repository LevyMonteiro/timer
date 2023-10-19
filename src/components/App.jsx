import '../styles/App.css'
import { Timer } from './timer'
import { Footer } from './footer'

function App() {

  return (
    <div className='wrapper'>
      <main>
        <Timer />
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
