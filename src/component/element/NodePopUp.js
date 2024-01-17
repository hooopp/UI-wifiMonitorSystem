import React, { useEffect } from "react";
import styles from "./NodePopUp.module.css";
import { useState, useRef } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { Modal } from "../../bootstrap/js/bootstrap.js";

function NodePopUp({ selectedScenario, refetchLoadNode }) {
  const [clientType, setClientType] = useState("Deterministic");
  const [nodeMode, setNodeMode] = useState("AP");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [borderColor3, setBorderColor3] = useState("#dee2e6");
  const [nodeName, setNodeName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [ssid, setSsid] = useState("");
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
    console.log(data);
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
              average_new_page_packet_size: parseFloat(
                webAverageNewPagePacketSize
              ),
              probability_of_load_new_page: parseFloat(
                webProabilityOfLoadNewPage
              ),
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="SSID"
                    id="ssid"
                    value={ssid}
                    onChange={(e) => {
                      setSsid(e.target.value);
                    }}
                  />
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
                <div className={styles.selectClientType}>
                  <div style={{ marginBottom: "0.5em" }}>
                    Select Scenario Type
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
                            Average Interval Time
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
                            Average Packet Size
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
                          <label className="form-label">Time Out</label>
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
                            Average Interval Time
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
                            Average Packet Size
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
                        <div className="mb-3" style={{ marginTop: "1em" }}>
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
                            onChange={(e) => {
                              setWebProabilityOfLoadNewPage(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-3" style={{ marginTop: "1em" }}>
                          <label className="form-label">Time Out</label>
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
                          Average Packet Size
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
                          <label className="form-label">Time Out</label>
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
              ) : null}
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
              ></button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addNodeFunction();
                }}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  refetchLoadNode();
                  setNodeMode("AP");
                  setNodeName("");
                  setIpAddress("");
                  setSsid("");
                  closeRef.current.click();
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

export default NodePopUp;
