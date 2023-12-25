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

function Main({selectedScenario}) {
  const [mode, setMode] = useState(0);
  return (
    <div className={styles.Main}>
      <div className={styles.Nav} style={{ backgroundColor: "white" }}>
        {/* header */}
        <div className={styles.Header}>
          <span style={{ fontSize: "2rem", fontWeight: "bold" , display:"inline-block", height:"50px"}}>
            {selectedScenario}
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
        {mode === 0 && <Detail />}
        {mode === 1 && <Nodes />}
        {mode === 2 && <Graph />}
      </div>
    </div>
  );
}

export default Main;
