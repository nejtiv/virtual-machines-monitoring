import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VirtualMachines from './pages/VirtualMachines';
import RDPSessions from './pages/RDPSessions';
import HealthMonitor from './pages/HealthMonitor';

//Main application
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/virtual-machines' element={<VirtualMachines/>}/>
          <Route path='/rdp-sessions' element={<RDPSessions/>}/>
          <Route path='/health-monitor' element={<HealthMonitor/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;