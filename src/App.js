import Sidebar from './component/Sidebar';
import Main from './component/Main';
import './bootstrap/js/bootstrap.js';
import './bootstrap/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className="App">
        <div className="box"><Sidebar /></div>
        <div className="box"><Main /></div>
    </div>
  );
}

export default App;
