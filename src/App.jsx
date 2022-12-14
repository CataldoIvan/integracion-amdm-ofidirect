
import './App.css'
import Home from './components/Home'
import{Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import ImpotExcel from './components/ImpotExcel'
import ResultadosDeEnvios from './components/ResultadosEnvios'

function App() {
 

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ImportarDesdeExcel" element={<ImpotExcel/>} />
        <Route path="/ResultadosDeEnvios" element={<ResultadosDeEnvios/>} />
      </Routes>
      
    </div>
  )
}

export default App
