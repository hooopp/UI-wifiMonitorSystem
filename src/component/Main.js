import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Main.module.css";
import Detail from "./Detail";
import Nodes from "./Nodes";
import Graph from "./Graph";
import start from "../img/start.svg";
import { IoIosDocument } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

function Main({ selectedScenario }) {
  const [mode, setMode] = useState(0);
  const [ssid, setSsid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [scenarioName, setScenarioName] = React.useState("");
  const [scenarioDesc, setScenarioDesc] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("onAddScenario1");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedWifiType, setSelectedWifiType] = useState("2.4GHz");

  const loadScenarioDetail = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/scenario/${selectedScenario}`
    );
    console.log(data);
    return data;
  };

  const {
    data: loadScenarioDetailData,
    status: loadScenarioDetailStatus,
    refetch: refetchLoadScenarioDetail,
  } = useQuery("scenarioDetail", loadScenarioDetail);

  useEffect(() => {
    setMode(0)
    refetchLoadScenarioDetail().then(({ data: loadScenarioData }) => {
      setScenarioName(loadScenarioData.scenario_name);
      setScenarioDesc(loadScenarioData.scenario_desc);
      setSelectedOption(loadScenarioData.is_using_target_ap ? "onAddScenario2" : "onAddScenario1");
      setIsEdit(false);
      setSelectedWifiType(loadScenarioData.target_ap_radio === "5G" ? "5GHz" : "2.4GHz");
      if (loadScenarioData.is_using_target_ap) {
        setSsid(loadScenarioData.target_ap_ssid);
        setPassword(loadScenarioData.target_ap_password);
        setBorderColor1("#dee2e6");
        setBorderColor2("#333");
      }else{
        setBorderColor1("#333");
        setBorderColor2("#dee2e6");
        setPassword("");
        setSsid("");
      }
    });
  }, [selectedScenario]);

  const patchScenario = useMutation((data) => {
    return axios.patch(`http://127.0.0.1:8000/scenario/${selectedScenario}`, data);
  });

  return (
    <div className={styles.Main}>
      <div className={styles.Nav} style={{ backgroundColor: "white" }}>
        {/* header */}
        <div className={styles.Header}>
          <span
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              display: "inline-block",
              height: "50px",
            }}
          >
            {loadScenarioDetailData && loadScenarioDetailData.scenario_name}
          </span>
          <div>
            <button className="button-68" role="button">
              <span>Preview All</span>
            </button>
            <button
              className="button-68"
              role="button"
              style={{ marginLeft: "1em" }}
            >
              <div>
                <svg
                  style={{ width: "20", height: "20", marginRight: "0.25em" }}
                >
                  <image href={start} width="15" height="15" />
                </svg>
                Start
              </div>
            </button>
          </div>
        </div>
        {/* navbar */}
        <ul className="nav nav-underline">
          <li className="nav-item">
            <a
              className={`nav-link ${mode === 0 ? "active" : ""}`}
              href="#"
              style={{ color: "black" }}
              onClick={() => {
                setMode(0);
              }}
            >
              <IoIosDocument style={{ marginRight: "2px" }} />
              Detail
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${mode === 1 ? "active" : ""}`}
              href="#"
              style={{ color: "black" }}
              onClick={() => {
                setMode(1);
              }}
            >
              <FaShareNodes style={{ marginRight: "4px" }} />
              Nodes
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${mode === 2 ? "active" : ""}`}
              href="#"
              style={{ color: "black" }}
              onClick={() => {
                setMode(2);
              }}
            >
              <FaChartSimple style={{ marginRight: "4px" }} />
              Graph
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.Body} style={{ backgroundColor: "white" }}>
        {mode === 0 && (
          <Detail
            scenarioName={scenarioName}
            setScenarioName={setScenarioName}
            scenarioDesc={scenarioDesc}
            setScenarioDesc={setScenarioDesc}
            ssid={ssid}
            setSsid={setSsid}
            password={password}
            setPassword={setPassword}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            borderColor1={borderColor1}
            setBorderColor1={setBorderColor1}
            borderColor2={borderColor2}
            setBorderColor2={setBorderColor2}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            patchScenario = {patchScenario}
            refetchLoadScenarioDetail = {refetchLoadScenarioDetail}
            selectedWifiType = {selectedWifiType}
            setSelectedWifiType = {setSelectedWifiType}
          />
        )}
        {mode === 1 && <Nodes selectedScenario={selectedScenario}/>}
        {mode === 2 && <Graph />}
      </div>
    </div>
  );
}

export default Main;
