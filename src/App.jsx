
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
        <Route path="/integracion-amdm-ofidirect/" element={<Home/>} />
        <Route path="/integracion-amdm-ofidirect/ImportarDesdeExcel" element={<ImpotExcel/>} />
        <Route path="/integracion-amdm-ofidirect/ResultadosDeEnvios" element={<ResultadosDeEnvios/>} />
        <Route path="*" element={<Home/>} />
      </Routes>
      
    </div>
  )
}

export default App
