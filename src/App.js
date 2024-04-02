import Sidebar from "./component/Sidebar";
import Main from "./component/Main";
import "./bootstrap/js/bootstrap.js";
import "./bootstrap/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from "react";
import "./App.css";
import spyro from "./img/spyro.svg";
import {Modal} from "./bootstrap/js/bootstrap.js";

const queryClient = new QueryClient();

function App() {
  const storedScenario = localStorage.getItem("selectedScenario");
  const [selectedScenario, setSelectedScenario] = useState(storedScenario || "");

  //เรียกข้อมูล Scenario ที่เก็บไว้ Local Storage มาแสดง
  useEffect(() => {
    const storedScenario = localStorage.getItem("selectedScenario");
    if (storedScenario) {
      setSelectedScenario(storedScenario);
    }
  }, []);

  //บันทึก Scenario ที่เลือกไว้ใน Local Storage
  useEffect(() => {
    localStorage.setItem("selectedScenario", selectedScenario);
  }, [selectedScenario]);
  

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="box">
          <Sidebar
            setSelectedScenario={setSelectedScenario}
            selectedScenario={selectedScenario}
          />
        </div>
        {selectedScenario === "" || selectedScenario === undefined ? (
          <div className="logo-container">
            <svg width="500" height="500" viewBox="0 0 500 500">
              <image href={spyro} x="0" y="0" width="100%" height="100%" />
            </svg>
          </div>
        ) : selectedScenario === "initial" ? "" :(
          <div className="box">
            <Main selectedScenario={selectedScenario} />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
