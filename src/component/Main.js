import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Main.module.css";
import Detail from "./Detail";
import Nodes from "./Nodes";
import NodePreviewAll from "./element/NodePreviewAll";
import Graphs from "./Graphs";
import start from "../img/start.svg";
import { IoIosDocument } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { set } from "date-fns";
import { TbFileExport } from "react-icons/tb";
import { MdPreview } from "react-icons/md";

function Main({ selectedScenario }) {
  const [mode, setMode] = useState(0);
  const [ssid, setSsid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [scenarioName, setScenarioName] = React.useState("");
  const [scenarioDesc, setScenarioDesc] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedWifiType, setSelectedWifiType] = useState("2.4GHz");
  const [testName, setTestName] = useState("");
  const [isExportClicked, setIsExportClicked] = useState("");

  const loadScenarioDetail = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/scenario/${selectedScenario}`
    );
    return data;
  };

  function exportScenario(data) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${scenarioName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const {
    data: loadScenarioDetailData,
    status: loadScenarioDetailStatus,
    refetch: refetchLoadScenarioDetail,
  } = useQuery("scenarioDetail", loadScenarioDetail);

  const loadNodePreview = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/node/preview`
    );
    return data;
  };

  const {
    data: loadNodePreviewData,
    status: loadNodePreviewStatus,
    refetch: refetchLoadNodePreview,
  } = useQuery("nodePreview", loadNodePreview, { enabled: false });

  const runScenario = useMutation((data) => {
    return axios.post(
      `http://127.0.0.1:8000/scenario/${selectedScenario}/simulation/run`,
      data
    );
  });

  const patchScenario = useMutation((data) => {
    return axios.patch(
      `http://127.0.0.1:8000/scenario/${selectedScenario}`,
      data
    );
  });

  const {
    data: exportScenarioData,
    status: exportScenarioStatus,
    refetch: refetchExportScenario,
  } = useQuery("exportScenario", loadScenarioDetail, { enabled: false });

  const {
    data: exportNodeData,
    status: exportNodeStatus,
    refetch: refetchExportNode,
  } = useQuery("exportNode", loadNodePreview, { enabled: false });

  useEffect(() => {
    if (isExportClicked === "") return;
    refetchExportScenario().then(({ data: exportScenarioData }) => {
      refetchExportNode().then(({ data: exportNodeData }) => {
        console.log(exportScenarioData);
        var exportData = {
          scenarioName: exportScenarioData.scenario_name,
          scenarioDesc: exportScenarioData.scenario_desc,
          scenarioType:
            exportScenarioData.is_using_target_ap === true ? "host" : "ap",
        };
        if (exportScenarioData.is_using_target_ap === true) {
          exportData["ssid"] = exportScenarioData.target_ap_ssid;
          exportData["password"] = exportScenarioData.target_ap_password;
          exportData["frequency"] =
            exportScenarioData.target_ap_radio === "5G" ? "5GHz" : "2.4GHz";
        }
        exportData["nodes"] = [];
        Object.entries(exportNodeData.network_info).map(
          ([key, value], index) => {
            Object.entries(value.aps).map(([key2, value2], index2) => {
              exportData["nodes"].push({
                name: value2.alias_name,
                ip: key2,
                mode: "ap",
                ssid: key,
                txPower: parseInt(value2.tx_power),
                frequency: value2.radio === "5G" ? "5GHz" : "2.4GHz",
              });
            });
            Object.entries(value.clients).map(([key2, value2], index2) => {
              if (value2.simulation_type === "deterministic") {
                exportData["nodes"].push({
                  name: value2.alias_name,
                  ip: key2,
                  ssid: key,
                  mode: "client",
                  simulationType: "deterministic",
                  averageIntervalTime: parseInt(value2.average_interval_time),
                  averagePacketSize: parseInt(value2.average_packet_size),
                  timeOut: parseInt(value2.timeout),
                });
              }
              if (value2.simulation_type === "web_application") {
                exportData["nodes"].push({
                  name: value2.alias_name,
                  ip: key2,
                  ssid: key,
                  mode: "client",
                  simulationType: "web",
                  averageIntervalTime: parseInt(value2.average_interval_time),
                  averagePacketSize: parseInt(value2.average_packet_size),
                  // averageNewPacketSize: parseInt(
                  //   value2.average_new_page_packet_size
                  // ),
                  // probabilityOfLoadNewPacket: parseInt(
                  //   value2.probability_of_load_new_page
                  // ),
                  timeOut: parseInt(value2.timeout),
                });
              }
              if (value2.simulation_type === "file_transfer") {
                exportData["nodes"].push({
                  name: value2.alias_name,
                  ip: key2,
                  ssid: key,
                  mode: "client",
                  simulationType: "file",
                  averagePacketSize: parseInt(value2.average_packet_size),
                  timeOut: parseInt(value2.timeout),
                });
              }
            });
          }
        );
        exportScenario(exportData);
      });
    });
  }, [isExportClicked]);

  useEffect(() => {
    setMode(0);
    refetchLoadScenarioDetail().then(({ data: loadScenarioData }) => {
      setScenarioName(loadScenarioData.scenario_name);
      setScenarioDesc(loadScenarioData.scenario_desc);
      setSelectedOption(
        loadScenarioData.is_using_target_ap
          ? "onAddScenario2"
          : "onAddScenario1"
      );
      setIsEdit(false);
      setSelectedWifiType(
        loadScenarioData.target_ap_radio === "5G"
          ? "5GHz_onAddScenario"
          : "2.4GHz_onAddScenario"
      );
      if (loadScenarioData.is_using_target_ap) {
        setSsid(loadScenarioData.target_ap_ssid);
        setPassword(loadScenarioData.target_ap_password);
        setBorderColor1("#dee2e6");
        setBorderColor2("#333");
      } else {
        setBorderColor1("#333");
        setBorderColor2("#dee2e6");
        setPassword("");
        setSsid("");
      }
    });
  }, [selectedScenario]);

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
            {loadScenarioDetailData &&
              (loadScenarioDetailData.scenario_name.length > 25
                ? `${loadScenarioDetailData.scenario_name.substring(0, 25)}...`
                : loadScenarioDetailData.scenario_name)}
          </span>
          <div>
            <button
              className="btn btn-dark"
              role="button"
              style={{ marginLeft: "1em" }}
              onClick={() => {
                setIsExportClicked(!isExportClicked);
              }}
            >
              <div>
                <TbFileExport style={{ fontSize: "1.25em" }} />
                <span style={{ fontWeight: "bold", marginLeft: "0.25em" }}>
                  Export
                </span>
              </div>
            </button>

            <button
              className="btn btn-dark"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#NodePreviewAll"
              onClick={() => {
                refetchLoadNodePreview();
              }}
              style={{ marginLeft: "1em" }}
            >
              <MdPreview style={{ fontSize: "1.25em" }} />
              <span style={{ fontWeight: "bold", marginLeft: "0.25em" }}>
                Preview All
              </span>
            </button>
            <button
              className="btn btn-dark"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#runScenario"
              style={{ marginLeft: "1em" }}
            >
              <div>
                <svg
                  style={{
                    width: "20",
                    height: "20",
                    marginRight: "0.25em",
                    marginTop: "0.25em",
                  }}
                >
                  <image href={start} width="15" height="15" />
                </svg>
                <span style={{ fontWeight: "bold" }}>Start</span>
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
              Report
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
            patchScenario={patchScenario}
            refetchLoadScenarioDetail={refetchLoadScenarioDetail}
            selectedWifiType={selectedWifiType}
            setSelectedWifiType={setSelectedWifiType}
          />
        )}
        {mode === 1 && (
          <Nodes
            selectedScenario={selectedScenario}
            loadNodePreviewData={loadNodePreviewData}
            refetchLoadNodePreview={refetchLoadNodePreview}
          />
        )}
        {mode === 2 && <Graphs selectedScenario={selectedScenario} />}
      </div>
      <div
        className="modal fade"
        id="NodePreviewAll"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <span style={{ fontWeight: "bold" }}>Preview All</span>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              {loadNodePreviewData &&
                Object.entries(loadNodePreviewData.network_info).map(
                  ([network, info], index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          borderRadius: "10px",
                          padding: "10px",
                          border: "1px solid #dee2e6",
                          marginBottom: "1em",
                        }}
                      >
                        <div
                          style={{ marginBottom: "0.5em", fontWeight: "bold" }}
                        >
                          ssid : {network}
                        </div>
                        {Object.keys(info.aps).length === 0 ? (
                          ""
                        ) : (
                          <>
                            <div
                              style={{
                                borderRadius: "10px",
                                padding: "10px",
                                border: "1px solid #dee2e6",
                                marginBottom: "1em",
                              }}
                            >
                              <div
                                style={{
                                  marginBottom: "0.5em",
                                  fontWeight: "bold",
                                }}
                              >
                                AP
                              </div>
                              {Object.entries(info.aps).map(
                                ([ap, apInfo], index) => {
                                  return (
                                    <div key={index}>
                                      <NodePreviewAll
                                        nodeMode={"ap"}
                                        name={apInfo.alias_name}
                                        ip={ap}
                                        simulationDetail={apInfo}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </>
                        )}
                        {Object.keys(info.clients).length === 0 ? (
                          ""
                        ) : (
                          <div
                            style={{
                              borderRadius: "10px",
                              padding: "10px",
                              border: "1px solid #dee2e6",
                              marginBottom: "1em",
                            }}
                          >
                            <div
                              style={{
                                marginBottom: "0.5em",
                                fontWeight: "bold",
                              }}
                            >
                              Client
                            </div>
                            {Object.entries(info.clients).map(
                              ([client, clientInfo], index) => {
                                return (
                                  <div key={index}>
                                    <NodePreviewAll
                                      nodeMode={"client"}
                                      name={clientInfo.alias_name}
                                      ip={client}
                                      simulationDetail={clientInfo}
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <div
        className="modal fade"
        id="runScenario"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <h1
                className="modal-title fs-5"
                id="title"
                style={{ fontWeight: "bold" }}
              >
                Run Scenario
              </h1>
            </div>
            <div
              className="modal-body"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Test name
                </label>
                <input
                  className="form-control"
                  id="testName"
                  value={testName}
                  onChange={(e) => {
                    setTestName(e.target.value);
                  }}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  runScenario.mutate({ title: testName });
                  setTestName("");
                }}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  setTestName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
