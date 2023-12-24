import Sidebar from './component/Sidebar';
import Main from './component/Main';
import './bootstrap/js/bootstrap.js';
import './bootstrap/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
        <div className="box"><Sidebar /></div>
        <div className="box"><Main data={{name:"BanA"}}/></div>
    </div>
    </QueryClientProvider>
  );
}

export default App;
