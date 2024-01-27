import React, { useEffect } from "react";
import styles from "./ViewGraphPopUp.module.css";
import RechartGraph from "./RechartGraph";
import Chart from "./Chart";
import ChartApp from "./ChartApp";
import { set } from "date-fns";
import { TbFileExport } from "react-icons/tb";
import Graph from "../Graph";

function ViewGraphPopUp({
  reportIsClicked,
  setIntervalRefetch,
  simulationData,
  setSimulationData,
  listNode,
  setListNode,
  selectedMetric,
  setSelectedMetric,
  loadGraphDetailData,
  simulationDataApp,
  ssidMonitor,
  setSsidMonitor,
  setHasShownAlert,
  hasShownAlert,
}) {
  const [name, setName] = React.useState("");
  const [state, setState] = React.useState("");
  const [createdTime, setCreatedTime] = React.useState("");
  const [stateMessage, setStateMessage] = React.useState("");
  const [autoScroll, setAutoScroll] = React.useState(true);
  const formattedMessage = stateMessage
    .split("\n")
    .map((line) => "# " + line)
    .join("\n");
  const messagesEndRef = React.useRef(null);
  const [selecetdSsid, setSelectedSsid] = React.useState("");
  const [selecetdNode, setSelectedNode] = React.useState("");
  const [mode, setMode] = React.useState(0);
  const [monitorSide, setMonitorSide] = React.useState(
    "serverMonitoredByClient"
  );

  function downloadData(data) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${name}_${createdTime}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    if (loadGraphDetailData) {
      setName(loadGraphDetailData.title);
      setState(loadGraphDetailData.state);
      setCreatedTime(loadGraphDetailData.created_at);
      setStateMessage(loadGraphDetailData.state_message);
    }
  }, [reportIsClicked]);

  useEffect(() => {
    if (loadGraphDetailData) {
      setStateMessage(loadGraphDetailData.state_message);
    }
  }, [loadGraphDetailData]);

  useEffect(() => {
    if (autoScroll) {
      const handleShown = () => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop =
            messagesEndRef.current.scrollHeight;
        }
      };

      handleShown();

      const modalElement = document.getElementById("ViewGraphPopUp");
      modalElement.addEventListener("shown.bs.modal", handleShown);
      return () => {
        modalElement.removeEventListener("shown.bs.modal", handleShown);
      };
    }
  }, [reportIsClicked, stateMessage]);

  return (
    <div>
      <div
        className="modal fade"
        id="ViewGraphPopUp"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="True"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header" style={{ margin: "0em" }}>
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ fontWeight: "bold" }}
              >
                {name}
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "0.75em",
                    marginBottom: "0em",
                    marginLeft: "0.5em",
                  }}
                >
                  {createdTime}
                </span>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setIntervalRefetch(false);
                  setAutoScroll(true);
                  setSimulationData(null);
                  setHasShownAlert(false);
                }}
              ></button>
            </div>
            <div className="modal-body" style={{ margin: "0em" }}>
              <div
                style={{
                  borderRadius: "10px",
                  border: "1px solid #dee2e6",
                  marginBottom: "1em",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    margin: "0.5em 1em",
                    display: "flex",
                  }}
                >
                  <div style={{ marginLeft: "0.5em", fontSize: "1.5em" }}>
                    Log
                  </div>
                  <div
                    className={styles.autoScroll}
                    style={{ marginRight: "0em" }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoScroll"
                      value=""
                      aria-label=""
                      checked={autoScroll}
                      onChange={() => {
                        setAutoScroll(!autoScroll);
                      }}
                    />
                    <span style={{ fontWeight: "normal", marginLeft: "0.5em" }}>
                      auto scroll
                    </span>
                  </div>
                </div>
                <div style={{ padding: "0em 1em" }}>
                  <div
                    ref={messagesEndRef}
                    style={{
                      overflowY: "scroll",
                      width: "100%",
                      height: "20em",
                      backgroundColor: "#f8f9fa",
                      marginBottom: "1em",
                    }}
                  >
                    <pre style={{ marginLeft: "1em", overflow: "unset" }}>
                      {formattedMessage}
                    </pre>
                  </div>
                </div>
              </div>
              {simulationData !== null ? (
                <div
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #dee2e6",
                    margin: "0.5m",
                  }}
                >
                  <div
                    style={{
                      margin: "0.5em 0em -0.5em 1em",
                      fontWeight: "bold",
                      fontSize: "1.5em",
                    }}
                  >
                    Visualization
                  </div>
                  <ul
                    className="nav nav-underline"
                    style={{ marginTop: "1em", marginLeft: "2em" }}
                  >
                    <li className="nav-item">
                      <a
                        className={`nav-link ${mode === 0 ? "active" : ""}`}
                        href="#"
                        style={{ color: "black" }}
                        onClick={() => {
                          setMode(0);
                        }}
                      >
                        Physical Layer
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
                        Application Layer
                      </a>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className={`nav-link ${mode === 2 ? "active" : ""}`}
                        href="#"
                        style={{ color: "black" }}
                        onClick={() => {
                          setMode(2);
                        }}
                      >
                        Summary
                      </a>
                    </li> */}
                  </ul>
                  {mode === 0 ? (
                    <div style={{ width: "100%" }}>
                      <Chart
                        key={1}
                        downloadData={downloadData}
                        simulationData={simulationData}
                        listNode={listNode}
                        setListNode={setListNode}
                        selectedMetric={selectedMetric}
                        setSelectedMetric={setSelectedMetric}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {mode === 1 ? (
                    <div style={{ width: "100%" }}>
                      <ChartApp
                        monitorSide={monitorSide}
                        setMonitorSide={setMonitorSide}
                        simulationDataApp={simulationDataApp}
                        downloadData={downloadData}
                        ssidMonitor={ssidMonitor}
                        setSsidMonitor={setSsidMonitor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewGraphPopUp;
