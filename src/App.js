import Sidebar from './component/Sidebar';
import Main from './component/Main';
import './bootstrap/js/bootstrap.js';
import './bootstrap/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import  { useState, useEffect } from 'react';
import './App.css'

const queryClient = new QueryClient();

function App() {
  const [selectedScenario, setSelectedScenario] = useState("");

  useEffect(() => {
    localStorage.setItem('selectedScenario', selectedScenario);
  }, [selectedScenario]);

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
        <div className="box"><Sidebar setSelectedScenario={setSelectedScenario} selectedScenario={selectedScenario}/></div>
        {selectedScenario==="" ? <div>Helooo</div> : <div className="box"><Main selectedScenario={selectedScenario}/></div>}
    </div>
    </QueryClientProvider>
  );
}

export default App;
