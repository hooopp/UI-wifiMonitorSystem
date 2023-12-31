import Sidebar from './component/Sidebar';
import Main from './component/Main';
import './bootstrap/js/bootstrap.js';
import './bootstrap/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import  { useState, useEffect } from 'react';
import './App.css'

const queryClient = new QueryClient();

function App() {
  const [selectedScenario, setSelectedScenario] = useState(localStorage.getItem('selectedScenario') || "1");

  useEffect(() => {
    localStorage.setItem('selectedScenario', selectedScenario);
  }, [selectedScenario]);

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
        <div className="box"><Sidebar setSelectedScenario={setSelectedScenario}/></div>
        {selectedScenario===""}
        <div className="box"><Main selectedScenario={selectedScenario}/></div>
    </div>
    </QueryClientProvider>
  );
}

export default App;
