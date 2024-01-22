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

  const loadScenarioDetail = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/scenario/${selectedScenario}`
    );
    return data;
  };

  const {
    data: loadScenarioDetailData,
    status: loadScenarioDetailStatus,
    refetch: refetchLoadScenarioDetail,
  } = useQuery("scenarioDetail", loadScenarioDetail);

  const loadNodePreview = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/node/preview`
    );
    console.log(data);
    return data;
  };

  const {
    data: loadNodePreviewData,
    status: loadNodePreviewStatus,
    refetch: refetchLoadNodePreview,
  } = useQuery("nodePreview", loadNodePreview, { enabled: false });

  const runScenario = useMutation((data) => {
    return axios.post(
      `http://127.0.0.1:8000/scenario/${selectedScenario}/simulation/run`,data
    );
  });

  useEffect(() => {
    setMode(0);
    refetchLoadScenarioDetail().then(({ data: loadScenarioData }) => {
      console.log(loadScenarioData);
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

  const patchScenario = useMutation((data) => {
    return axios.patch(
      `http://127.0.0.1:8000/scenario/${selectedScenario}`,
      data
    );
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
            {loadScenarioDetailData &&
              (loadScenarioDetailData.scenario_name.length > 25
                ? `${loadScenarioDetailData.scenario_name.substring(0, 25)}...`
                : loadScenarioDetailData.scenario_name)}
          </span>
          <div>
            <button
              className="btn btn-dark"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#NodePreviewAll"
              onClick={() => {
                refetchLoadNodePreview();
              }}
            >
              <span style={{ fontWeight: "bold" }}>Preview All</span>
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
                  style={{ width: "20", height: "20", marginRight: "0.25em" }}
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
        class="modal fade"
        id="runScenario"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <h1
                class="modal-title fs-5"
                id="title"
                style={{ fontWeight: "bold" }}
              >
                Run Scenario
              </h1>
            </div>
            <div
              class="modal-body"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Test name
                </label>
                <input
                  class="form-control"
                  id="testName"
                  value={testName}
                  onChange={(e)=>{setTestName(e.target.value)}}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div
              class="modal-footer"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
                style={{ fontWeight: "bold" }}
                onClick={()=>{runScenario.mutate({title:testName});setTestName("")}}
              >
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                style={{ fontWeight: "bold" }}
                onClick={()=>{setTestName("")}}
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
