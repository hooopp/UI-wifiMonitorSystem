import React, { useEffect, useRef } from "react";
import styles from "./NodePopUpEdit.module.css";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useQuery } from "react-query";
import { set } from "date-fns";

function NodePopUpEdit({
  selectedScenario,
  id,
  refetchLoadNode,
  loadNodeDetailData,
  editButonClicked,
  loadNodePreviewData,
  refetchLoadNodePreview,
}) {
  const [value, setValue] = useState("");
  const [clientType, setClientType] = useState("Deterministic");
  const [nodeMode, setNodeMode] = useState("AP");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [borderColor3, setBorderColor3] = useState("#dee2e6");
  const [nodeName, setNodeName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [ssid, setSsid] = useState("");
  const [timeOut, setTimeOut] = useState(0);
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
  const [changeMode, setChangeMode] = useState(false);
  const [changeClientType, setChangeClientType] = useState(false);
  const closeRef = useRef();

  const editNode = useMutation((data) => {
    return axios.patch(
      `http://127.0.0.1:8000/scenario/${selectedScenario}/node/${id}`,
      data
    );
  });

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const isValidIP = (ip) => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const editNodeFunction = () => {
    if (isValidIP(ipAddress) === false) {
      alert("IP Address is not valid");
      return;
    }
    if (nodeMode === "AP") {
      editNode.mutate(
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
            closeRef.current.click();
          },
        }
      );
    } else {
      if (clientType === "Deterministic") {
        editNode.mutate(
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
              closeRef.current.click();
            },
          }
        );
      } else if (clientType === "Web") {
        editNode.mutate(
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
              closeRef.current.click();
            },
          }
        );
      } else {
        editNode.mutate(
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
    if (loadNodeDetailData) {
      setNodeName(loadNodeDetailData.alias_name);
      setIpAddress(loadNodeDetailData.control_ip_addr);
      setSsid(loadNodeDetailData.network_ssid);
      setFrequency(loadNodeDetailData.radio === "2.4G" ? "2.4GHz" : "5GHz");
      setTxPower(loadNodeDetailData.tx_power);
      if (loadNodeDetailData.network_mode === "ap") {
        setNodeMode("AP");
      } else {
        setNodeMode("Client");
      }
      setTimeOut(loadNodeDetailData.simulation_detail.timeout);
      if (loadNodeDetailData.network_mode === "client") {
        if (
          loadNodeDetailData.simulation_detail.simulation_type ===
          "deterministic"
        ) {
          setClientType("Deterministic");
          setDeterministicAverageIntervalTime(
            loadNodeDetailData.simulation_detail.average_interval_time
          );
          setDeterministicAveragePacketSize(
            loadNodeDetailData.simulation_detail.average_packet_size
          );
          setBorderColor1("#333");
          setBorderColor2("#dee2e6");
          setBorderColor3("#dee2e6");
        } else if (
          loadNodeDetailData.simulation_detail.simulation_type ===
          "web_application"
        ) {
          setClientType("Web");
          setWebAverageIntervalTime(
            loadNodeDetailData.simulation_detail.average_interval_time
          );
          setWebAveragePacketSize(
            loadNodeDetailData.simulation_detail.average_packet_size
          );
          setWebAverageNewPagePacketSize(
            loadNodeDetailData.simulation_detail.average_new_page_packet_size
          );
          setWebProabilityOfLoadNewPage(
            loadNodeDetailData.simulation_detail.probability_of_load_new_page
          );
          setBorderColor1("#dee2e6");
          setBorderColor2("#333");
          setBorderColor3("#dee2e6");
        } else {
          setClientType("File");
          setFileAveragePacketSize(
            loadNodeDetailData.simulation_detail.average_packet_size
          );
        }
      }
    }
  }, [editButonClicked]);

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
    setBorderColor1("#dee2e6");
    setBorderColor2("#dee2e6");
    setBorderColor3("#333");
  }, [changeMode]);

  useEffect(() => {
    if (clientType === "Deterministic") {
      console.log("Deterministic");
      setBorderColor1("#333");
      setBorderColor2("#dee2e6");
      setBorderColor3("#dee2e6");
      setDeterministicAverageIntervalTime(0);
      setDeterministicAveragePacketSize(0);
      setTimeOut(0);
    }
    if (clientType === "Web") {
      console.log("Web");
      setBorderColor1("#dee2e6");
      setBorderColor2("#333");
      setBorderColor3("#dee2e6");
      setWebAverageIntervalTime(0);
      setWebAverageNewPagePacketSize(0);
      setWebAveragePacketSize(0);
      setWebProabilityOfLoadNewPage(0);
      setTimeOut(0);
    }
    if (clientType === "File") {
      console.log("File");
      setBorderColor1("#dee2e6");
      setBorderColor2("#dee2e6");
      setBorderColor3("#333");
      setFileAveragePacketSize(0);
      setTimeOut(0);
    }
  }, [changeClientType]);

  return (
    <div>
      <div
        className="modal fade"
        id="NodePopUpEdit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <h1
                className="modal-title fs-5"
                id="staticBackdropLabeledit"
                style={{ marginLeft: "0em", marginRight: "0em" }}
              >
                <span style={{ fontWeight: "bold" }}>Edit Node</span>
              </h1>
            </div>
            <div
              className="modal-body"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <div>
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    Node Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Node Name"
                    value={nodeName}
                    onChange={(e) => {
                      setNodeName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    IP Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="IP Address"
                    value={ipAddress}
                    onChange={(e) => {
                      setIpAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
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
                      setChangeMode(!changeMode);
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
                      name="exampleRadioseditdeter"
                      value="Deterministic"
                      id={`radioDeterministicEdit${id}`}
                      checked={clientType === "Deterministic"}
                      onChange={(event) => {
                        setClientType(event.target.value);
                        setChangeClientType(!changeClientType);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`radioDeterministicEdit${id}`}
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
                      name="exampleRadioseditweb"
                      value="Web"
                      id={`radioWebEdit${id}`}
                      checked={clientType === "Web"}
                      onChange={(e) => {
                        handleRadioChange(e);
                        setChangeClientType(!changeClientType);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`radioWebEdit${id}`}
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
                      name="exampleRadiosedittfile"
                      value="File"
                      id={`radioFileEdit${id}`}
                      checked={clientType === "File"}
                      onChange={(e) => {
                        handleRadioChange(e);
                        setChangeClientType(!changeClientType);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`radioFileEdit${id}`}
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
              ) : (
                <div
                  className={styles.selectClientType}
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    border: "1px solid #dee2e6",
                    marginBottom: "1em",
                  }}
                >
                  <div style={{ marginBottom: "0.5em" }}>Tx-power</div>
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
                    name="exampleRadios1"
                    id="frequencyedit1"
                    value="2.4GHz"
                    checked={frequency === "2.4GHz"}
                    onChange={handleFrequencyChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="frequencyedit1"
                    style={{ marginRight: "1em", marginLeft: "0.5em" }}
                  >
                    2.4GHz
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios2"
                    id="frequencyedit2"
                    value="5GHz"
                    checked={frequency === "5GHz"}
                    onChange={handleFrequencyChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="frequencyedit2"
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
                  editNodeFunction();
                }}
                style={{ fontWeight: "bold" }}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
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

export default NodePopUpEdit;
