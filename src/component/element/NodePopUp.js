import React, { useEffect } from "react";
import styles from "./NodePopUp.module.css";
import { useState, useRef } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { Modal } from "../../bootstrap/js/bootstrap.js";
import { set } from "date-fns";

function NodePopUp({
  selectedScenario,
  refetchLoadNode,
  loadNodePreviewData,
  refetchLoadNodePreview,
}) {
  const [clientType, setClientType] = useState("Deterministic");
  const [nodeMode, setNodeMode] = useState("AP");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [borderColor3, setBorderColor3] = useState("#dee2e6");
  const [nodeName, setNodeName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [ssid, setSsid] = useState("");
  const [txPower, setTxPower] = useState(1);
  const [frequency, setFrequency] = useState("2.4GHz");
  const [
    deterministicAverageIntervalTime,
    setDeterministicAverageIntervalTime,
  ] = useState(0);
  const [deterministicAveragePacketSize, setDeterministicAveragePacketSize] =
    useState(0);
  const [webAverageIntervalTime, setWebAverageIntervalTime] = useState(0);
  const [webAveragePacketSize, setWebAveragePacketSize] = useState(0);
  const [webAverageNewPagePacketSize, setWebAverageNewPagePacketSize] =
    useState(0);
  const [webProabilityOfLoadNewPage, setWebProabilityOfLoadNewPage] =
    useState(0);
  const [fileAveragePacketSize, setFileAveragePacketSize] = useState(0);
  const [timeOut, setTimeOut] = useState(0);

  const addNode = useMutation((data) => {
    return axios.post(
      `http://127.0.0.1:8000/scenario/${selectedScenario}/node`,
      data
    );
  });

  const isValidIP = (ip) => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const addNodeFunction = () => {
    if (isValidIP(ipAddress) === false) {
      alert("IP Address is not valid");
      return;
    }
    if (nodeMode === "AP") {
      addNode.mutate(
        {
          control_ip_addr: ipAddress,
          alias_name: nodeName,
          network_mode: "ap",
          network_ssid: ssid,
          simulation_detail: {},
          radio: frequency === "2.4GHz" ? "2.4G" : "5G",
          tx_power: txPower.toString(),
        },
        {
          onSuccess: () => {
            refetchLoadNode();
            setNodeMode("AP");
            setNodeName("");
            setIpAddress("");
            setSsid("");
            setTxPower(1);
            setFrequency("2.4GHz");
            closeRef.current.click();
          },
          onError: (error) => {
            alert("ip is duplicated from another node");
          },
        }
      );
    } else {
      if (clientType === "Deterministic") {
        addNode.mutate(
          {
            alias_name: nodeName,
            control_ip_addr: ipAddress,
            network_ssid: ssid,
            network_mode: "client",
            simulation_detail: {
              simulation_type: "deterministic",
              average_interval_time: parseFloat(
                deterministicAverageIntervalTime
              ),
              average_packet_size: parseFloat(deterministicAveragePacketSize),
              timeout: parseFloat(timeOut),
            },
          },
          {
            onSuccess: () => {
              refetchLoadNode();
              setNodeMode("AP");
              setNodeName("");
              setIpAddress("");
              setSsid("");
              closeRef.current.click();
            },
          }
        );
      } else if (clientType === "Web") {
        addNode.mutate(
          {
            alias_name: nodeName,
            control_ip_addr: ipAddress,
            network_ssid: ssid,
            network_mode: "client",
            simulation_detail: {
              simulation_type: "web_application",
              average_interval_time: parseFloat(webAverageIntervalTime),
              average_packet_size: parseFloat(webAveragePacketSize),
              // average_new_page_packet_size: parseFloat(
              //   webAverageNewPagePacketSize
              // ),
              // probability_of_load_new_page: parseFloat(
              //   webProabilityOfLoadNewPage
              // ),
              timeout: parseFloat(timeOut),
            },
          },
          {
            onSuccess: () => {
              refetchLoadNode();
              setNodeMode("AP");
              setNodeName("");
              setIpAddress("");
              setSsid("");
              closeRef.current.click();
            },
          }
        );
      } else {
        addNode.mutate(
          {
            alias_name: nodeName,
            control_ip_addr: ipAddress,
            network_ssid: ssid,
            network_mode: "client",
            simulation_detail: {
              simulation_type: "file_transfer",
              average_packet_size: parseFloat(fileAveragePacketSize),
              timeout: parseFloat(timeOut),
            },
          },
          {
            onSuccess: () => {
              refetchLoadNode();
              setNodeMode("AP");
              setNodeName("");
              setIpAddress("");
              setSsid("");
              closeRef.current.click();
            },
          }
        );
      }
    }
  };

  const handleRadioChange = (event) => {
    setClientType(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  useEffect(() => {
    setTimeOut(0);
    if (clientType === "Deterministic") {
      setBorderColor1("#333");
      setBorderColor2("#dee2e6");
      setBorderColor3("#dee2e6");
      setWebAverageIntervalTime(0);
      setWebAverageNewPagePacketSize(0);
      setWebAveragePacketSize(0);
      setWebProabilityOfLoadNewPage(0);
      setFileAveragePacketSize(0);
    } else if (clientType === "Web") {
      setBorderColor1("#dee2e6");
      setBorderColor2("#333");
      setBorderColor3("#dee2e6");
      setDeterministicAverageIntervalTime(0);
      setDeterministicAveragePacketSize(0);
      setFileAveragePacketSize(0);
    } else {
      setBorderColor1("#dee2e6");
      setBorderColor2("#dee2e6");
      setBorderColor3("#333");
      setWebAverageIntervalTime(0);
      setWebAverageNewPagePacketSize(0);
      setWebAveragePacketSize(0);
      setWebProabilityOfLoadNewPage(0);
      setDeterministicAverageIntervalTime(0);
      setDeterministicAveragePacketSize(0);
    }
  }, [clientType]);

  useEffect(() => {
    setDeterministicAverageIntervalTime(0);
    setDeterministicAveragePacketSize(0);
    setWebAverageIntervalTime(0);
    setWebAveragePacketSize(0);
    setWebAverageNewPagePacketSize(0);
    setWebProabilityOfLoadNewPage(0);
    setFileAveragePacketSize(0);
    setClientType("Deterministic");
    setTimeOut(0);
  }, [nodeMode]);

  const closeRef = useRef();

  return (
    <div>
      <div
        className="modal fade"
        id="NodePopUp"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="True"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <h1
                className="modal-title fs-5"
                id="staticBackdropLabel"
                style={{ marginLeft: "0em", marginRight: "0em" }}
              >
                <span style={{ fontWeight: "bold" }}>Add Node</span>
              </h1>
            </div>
            <div
              className="modal-body"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <div>
                <div className="mb-3">
                  <label
                    htmlFor="nodename"
                    className="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    Node Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Node Name"
                    id="nodename"
                    value={nodeName}
                    onChange={(e) => {
                      setNodeName(e.target.value);
                    }}
                    maxLength="18"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="ipaddress"
                    className="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    IP Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="IP Address"
                    id="ipaddress"
                    value={ipAddress}
                    onChange={(e) => {
                      setIpAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="ssid"
                    className="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    SSID
                  </label>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="SSID"
                      id="ssid"
                      value={ssid}
                      onChange={(e) => {
                        setSsid(e.target.value);
                      }}
                      style={{ width: "26em", marginRight: "0.5em" }}
                    />
                    <div
                      className="dropdown"
                      style={{
                        position: "relative",
                      }}
                    >
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => {
                          refetchLoadNodePreview();
                        }}
                      ></button>
                      <ul className="dropdown-menu">
                        {loadNodePreviewData &&
                          Object.entries(loadNodePreviewData.network_info).map(
                            ([key, value], index) => {
                              return (
                                <li key={index}>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                      setSsid(key);
                                    }}
                                  >
                                    {key}
                                  </a>
                                </li>
                              );
                            }
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    Mode
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={nodeMode}
                    onChange={(event) => {
                      setNodeMode(event.target.value);
                      setClientType("Deterministic");
                    }}
                  >
                    <option value="AP">AP</option>
                    <option value="Client">Client</option>
                  </select>
                </div>
              </div>
              {nodeMode === "Client" ? (
                <div
                  className={styles.selectClientType}
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    border: "1px solid #dee2e6",
                    marginBottom: "1em",
                  }}
                >
                  <div style={{ marginBottom: "0.5em" }}>
                    Select Simulation Type
                  </div>
                  <div
                    className="form-check"
                    style={{
                      borderRadius: "5px",
                      border: `3px solid ${borderColor1}`,
                      padding: "1em 1em 1em 2em",
                      marginBottom: "0.5em",
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="Deterministic"
                      checked={clientType === "Deterministic"}
                      onChange={handleRadioChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Deterministic
                    </label>
                    {clientType === "Deterministic" ? (
                      <div>
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">
                            Average Interval Time (ms)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Deterministic"}
                            value={deterministicAverageIntervalTime}
                            onChange={(e) => {
                              setDeterministicAverageIntervalTime(
                                e.target.value
                              );
                            }}
                          />
                        </div>
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">
                            Average Packet Size (Byte)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Deterministic"}
                            value={deterministicAveragePacketSize}
                            onChange={(e) => {
                              setDeterministicAveragePacketSize(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">Time Out (s)</label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Deterministic"}
                            value={timeOut}
                            onChange={(e) => {
                              setTimeOut(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="form-check"
                    style={{
                      borderRadius: "5px",
                      border: `3px solid ${borderColor2}`,
                      padding: "1em 1em 1em 2em",
                      marginBottom: "0.5em",
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="Web"
                      checked={clientType === "Web"}
                      onChange={handleRadioChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Web
                    </label>
                    {clientType === "Web" ? (
                      <div>
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">
                            Average Interval Time (ms)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Web"}
                            value={webAverageIntervalTime}
                            onChange={(e) => {
                              setWebAverageIntervalTime(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">
                            Average Packet Size (Byte)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Web"}
                            value={webAveragePacketSize}
                            onChange={(e) => {
                              setWebAveragePacketSize(e.target.value);
                            }}
                          />
                        </div>
                        {/* <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">
                            Average New Page Packet Size
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Web"}
                            value={webAverageNewPagePacketSize}
                            onChange={(e) => {
                              setWebAverageNewPagePacketSize(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">
                            Probability of Load New Page
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Web"}
                            value={webProabilityOfLoadNewPage}
                            min={0}
                            max={1}
                            step={0.01} // This allows for float numbers with two decimal places
                            onChange={(e) => {
                              let value = parseFloat(e.target.value);
                              if (value < 0) {
                                value = 0;
                              } else if (value > 1) {
                                value = 1;
                              }
                              setWebProabilityOfLoadNewPage(value);
                            }}
                          />
                        </div> */}
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">Time Out (s)</label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "Web"}
                            value={timeOut}
                            onChange={(e) => {
                              setTimeOut(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="form-check"
                    style={{
                      borderRadius: "5px",
                      border: `3px solid ${borderColor3}`,
                      padding: "1em 1em 1em 2em",
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios3"
                      value="File"
                      checked={clientType === "File"}
                      onChange={handleRadioChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      File
                    </label>
                    {clientType === "File" ? (
                      <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">
                          Average Packet Size (Byte)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "File"}
                          value={fileAveragePacketSize}
                          onChange={(e) => {
                            setFileAveragePacketSize(e.target.value);
                          }}
                        />
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">Time Out (s)</label>
                          <input
                            type="number"
                            className="form-control"
                            disabled={clientType !== "File"}
                            value={timeOut}
                            onChange={(e) => {
                              setTimeOut(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                // doing
                <div
                  className={styles.selectClientType}
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    border: "1px solid #dee2e6",
                    marginBottom: "1em",
                  }}
                >
                  <div style={{ marginBottom: "0.5em" }}>Tx Power</div>
                  <input
                    type="number"
                    className="form-control"
                    value={txPower}
                    min="1"
                    max="20"
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value < 1) {
                        value = 1;
                      } else if (value > 20) {
                        value = 20;
                      }
                      setTxPower(value);
                    }}
                  />
                  <div style={{ marginBottom: "0.5em", marginTop: "1em" }}>
                    Select Frequency
                  </div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="frequency1"
                    value="2.4GHz"
                    checked={frequency === "2.4GHz"}
                    onChange={handleFrequencyChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="frequency1"
                    style={{ marginRight: "1em", marginLeft: "0.5em" }}
                  >
                    2.4GHz
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="frequency2"
                    value="5GHz"
                    checked={frequency === "5GHz"}
                    onChange={handleFrequencyChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="frequency2"
                    style={{ marginRight: "0.5em", marginLeft: "0.5em" }}
                  >
                    5GHz
                  </label>
                </div>
              )}
            </div>
            <div
              className="modal-footer"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
                style={{ border: "none" }}
              ></button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => {
                  addNodeFunction();
                }}
                style={{ fontWeight: "bold" }}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  refetchLoadNode();
                  setNodeMode("AP");
                  setNodeName("");
                  setIpAddress("");
                  setSsid("");
                  closeRef.current.click();
                }}
                style={{ fontWeight: "bold" }}
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

export default NodePopUp;
