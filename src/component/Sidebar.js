import React, { useEffect, useRef } from "react";
import logo from "../img/logo.svg";
import Scenario from "./Scenario";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import SelectScenarioType from "./element/SelectScenarioType";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { TbFileImport } from "react-icons/tb";
import { parse, set, sub } from "date-fns";
import { FaCheck } from "react-icons/fa";
import { MdDownloadForOffline } from "react-icons/md";

const Sidebar = ({ setSelectedScenario, selectedScenario }) => {
  const [selectedOption, setSelectedOption] = useState("onDetail1");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioDesc, setScenarioDesc] = useState("");
  const [ssid, setSsid] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [password, setPassword] = React.useState("");
  const [selectedWifiType, setSelectedWifiType] =
    React.useState("2.4GHz_onDetail");
  const [selectedWifiTypeAP, setSelectedWifiTypeAP] =
    React.useState("2.4GHz_onDetail");
  const [searchVariable, setSearchVariable] = React.useState("");
  const [isFileValid, setIsFileValid] = React.useState(false);
  const mutation = useMutation(
    (data) => {
      return axios.post("http://127.0.0.1:8000/scenario", data);
    },
    {
      onError: (error) => {
        alert(error.response.data.detail);
      },
    }
  );
  const [loopNode, setLoopNode] = React.useState("");

  const closeRef = useRef();
  const loadScenario = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/scenario?page_size=9&page=${page}${
        searchVariable ? `&search=${searchVariable}` : ""
      }`
    );
    return data;
  };
  const [isImported, setIsImport] = useState(false);
  const template = {
    scenarioName: "scenario_name",
    scenarioDesc: "scenario_description",
    scenarioType: "host",
    ssid: "ssid",
    password: "password",
    frequency: "2.4GHz",
    nodes: [
      {
        name: "node_name",
        ip: "ip",
        ssid: "ssid",
        mode: "ap",
        txPower: 1,
        frequency: "2.4GHz",
      },
      {
        name: "node_name",
        ip: "ip",
        ssid: "ssid",
        mode: "client",
        simulationType: "deterministic",
        averageIntervalTime: 0,
        averagePacketSize: 0,
        timeOut: 0,
      },
      {
        name: "node_name",
        ip: "ip",
        ssid: "ssid",
        mode: "client",
        simulationType: "web",
        averageInterTime: 0,
        averagePacketSize: 0,
        averageNewPacketSize: 0,
        probabilityOfLoadNewPacket: 0,
        timeOut: 0,
      },
      {
        name: "node_name",
        ip: "ip",
        ssid: "ssid",
        mode: "client",
        simulationType: "file",
        averagePacketSize: 0,
        timeOut: 0,
      },
    ],
  };

  const {
    data: loadScenarioData,
    status: loadScenarioStatus,
    refetch: refetchLoadScenario,
  } = useQuery("scenario", loadScenario);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const isValidIP = (ip) => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  //ในการ import ไฟล์ json จะต้องมีโครงสร้างดังนี้
  const checkFileStructure = () => {
    let message = "";
    if (fileContent.hasOwnProperty("scenarioType")) {
      // scenarioCheckpart
      if (
        fileContent.scenarioType === "ap" ||
        fileContent.scenarioType === "host"
      ) {
        if (fileContent.scenarioType === "host") {
          if (fileContent.hasOwnProperty("ssid")) {
          } else {
            message += "- no ssid\n";
          }
          if (fileContent.hasOwnProperty("password")) {
          } else {
            message += "- no password\n";
          }
          if (fileContent.hasOwnProperty("frequency")) {
            if (
              fileContent.frequency === "2.4GHz" ||
              fileContent.frequency === "5GHz"
            ) {
            } else {
              message += "- frequency should be 2.4GHz or 5GHz\n";
            }
          } else {
            message += "- no frequency\n";
          }
        }
      } else {
        message += "- scenarioType should be ap or host\n";
      }
    } else {
      message += "- no scenarioType\n";
    }
    // nodeCheckpart
    let ipNode = [];
    for (let i = 0; i < fileContent.nodes.length; i++) {
      var submessage = `on index ${i}\n`;
      if (fileContent.nodes[i].hasOwnProperty("ip")) {
        if (isValidIP(fileContent.nodes[i].ip)) {
          if (ipNode.includes(fileContent.nodes[i].ip)) {
            submessage += "\t ip is duplicated\n";
          }
        } else {
          submessage += "\t ip is not valid\n";
        }
      } else {
        submessage += "\t no ip\n";
      }
      ipNode.push(fileContent.nodes[i].ip);
      if (fileContent.nodes[i].hasOwnProperty("ssid")) {
      } else {
        submessage += "\t no ssid\n";
      }
      if (fileContent.nodes[i].hasOwnProperty("mode")) {
        if (
          fileContent.nodes[i].mode === "ap" ||
          fileContent.nodes[i].mode === "client"
        ) {
          if (fileContent.nodes[i].mode === "ap") {
            if (fileContent.nodes[i].hasOwnProperty("txPower")) {
              let value = fileContent.nodes[i].txPower;
              if (Number.isInteger(value) && value > 0 && value <= 20) {
              } else {
                submessage +=
                  "\t txPower should be integer and more than 0 and less than 20\n";
              }
            } else {
              submessage += "\t no txPower\n";
            }
            if (fileContent.nodes[i].hasOwnProperty("frequency")) {
              if (
                fileContent.nodes[i].frequency === "2.4GHz" ||
                fileContent.nodes[i].frequency === "5GHz"
              ) {
              } else {
                submessage += "\t frequency should be 2.4GHz or 5GHz\n";
              }
            } else {
              submessage += "\t no frequency\n";
            }
          }
          if (fileContent.nodes[i].mode === "client") {
            if (fileContent.nodes[i].hasOwnProperty("simulationType")) {
              if (
                fileContent.nodes[i].simulationType === "deterministic" ||
                fileContent.nodes[i].simulationType === "web" ||
                fileContent.nodes[i].simulationType === "file"
              ) {
                if (fileContent.nodes[i].simulationType === "deterministic") {
                  if (
                    fileContent.nodes[i].hasOwnProperty("averageIntervalTime")
                  ) {
                    let value = fileContent.nodes[i].averageIntervalTime;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t averageIntervalTime should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no averageIntervalTime\n";
                  }
                  if (
                    fileContent.nodes[i].hasOwnProperty("averagePacketSize")
                  ) {
                    let value = fileContent.nodes[i].averagePacketSize;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t averagePacketSize should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no averagePacketSize\n";
                  }
                  if (fileContent.nodes[i].hasOwnProperty("timeOut")) {
                    let value = fileContent.nodes[i].timeOut;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t timeOut should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no timeOut\n";
                  }
                }
                if (fileContent.nodes[i].simulationType === "web") {
                  if (
                    fileContent.nodes[i].hasOwnProperty("averageIntervalTime")
                  ) {
                    let value = fileContent.nodes[i].averageIntervalTime;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t averageInterTime should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no averageInterTime\n";
                  }
                  if (
                    fileContent.nodes[i].hasOwnProperty("averagePacketSize")
                  ) {
                    let value = fileContent.nodes[i].averagePacketSize;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t averagePacketSize should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no averagePacketSize\n";
                  }
                  // if (
                  //   fileContent.nodes[i].hasOwnProperty("averageNewPacketSize")
                  // ) {
                  //   let value = fileContent.nodes[i].averageNewPacketSize;
                  //   if (Number.isInteger(value) && value >= 0) {
                  //   } else {
                  //     submessage +=
                  //       "\t averageNewPacketSize should be integer and more than 0\n";
                  //   }
                  // } else {
                  //   submessage += "\t no averageNewPacketSize\n";
                  // }
                  // if (
                  //   fileContent.nodes[i].hasOwnProperty(
                  //     "probabilityOfLoadNewPacket"
                  //   )
                  // ) {
                  //   let value = fileContent.nodes[i].probabilityOfLoadNewPacket;
                  //   if (typeof value === "number" && value >= 0 && value <= 1) {
                  //   } else {
                  //     submessage +=
                  //       "\t probabilityOfLoadNewPacket should be number and range between 0 to 1\n";
                  //   }
                  // } else {
                  //   submessage += "\t no probabilityOfLoadNewPacket\n";
                  // }
                  if (fileContent.nodes[i].hasOwnProperty("timeOut")) {
                    let value = fileContent.nodes[i].timeOut;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t timeOut should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no timeOut\n";
                  }
                }
                if (fileContent.nodes[i].simulationType === "file") {
                  if (
                    fileContent.nodes[i].hasOwnProperty("averagePacketSize")
                  ) {
                    let value = fileContent.nodes[i].averagePacketSize;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t averagePacketSize should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no averagePacketSize\n";
                  }
                  if (fileContent.nodes[i].hasOwnProperty("timeOut")) {
                    let value = fileContent.nodes[i].timeOut;
                    if (Number.isInteger(value) && value >= 0) {
                    } else {
                      submessage +=
                        "\t timeOut should be integer and more than 0\n";
                    }
                  } else {
                    submessage += "\t no timeOut\n";
                  }
                }
              } else {
                submessage +=
                  "\t simulationType should be deterministic, web or file\n";
              }
            } else {
              submessage += "\t no simulationType\n";
            }
          }
        } else {
          submessage += "\t mode should be ap or client\n";
        }
      } else {
        submessage += "\t no mode\n";
      }
      if (submessage !== `on index ${i}\n`) {
        message += submessage;
      }
    }

    if (message !== "") {
      alert("File is not valided\n" + message);
      setIsFileValid(false);
      return;
    } else {
      alert("File is valided");
      setIsFileValid(true);
    }
  };

  //ไว้สร้าง string สุ่ม
  function generateRandomString() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 4; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  const addScenario = useMutation((data) => {
    return axios.post(`http://127.0.0.1:8000/scenario/`, data);
  },{onError: (error) => {alert(error.response.data.detail);}});

  const addNode = useMutation((data) => {
    return axios.post(`http://127.0.0.1:8000/scenario/${loopNode}/node`, data);
  },{onError: (error) => {alert(error.response.data.detail);}});

  //สำหรับ import ไฟล์ json ถ้าผ่าน checkFileStructure จะทำการ import ข้อมูลลง database
  const importScenario = () => {
    addScenario.mutate(
      {
        scenario_name:
          fileContent.scenarioName === ""
            ? "Scenario#" + generateRandomString()
            : fileContent.scenarioName,
        scenario_desc: fileContent.scenarioDesc,
        is_using_target_ap: fileContent.scenarioType === "host" ? true : false,
        target_ap_ssid: fileContent.ssid,
        target_ap_password: fileContent.password,
        target_ap_radio: fileContent.frequency === "2.4GHz" ? "2.4G" : "5G",
      },
      {
        onSuccess: (data) => {
          setLoopNode(data.data.scenario_id);
          setSelectedScenario(data.data.scenario_id);
          window.location.reload();
        },
      }
    );
  };

  //สำหรับ download ไฟล์ json ที่เป็น template
  function downloadData(data) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "template.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    event.target.value = null;
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        setFileContent(JSON.parse(event.target.result));
      } catch (error) {
        if (error instanceof SyntaxError) {
          alert("Invalid JSON in file.");
        } else {
          throw error;
        }
      }
    };
    reader.onerror = function (event) {
      alert("Please upload file again due to file change");
      setSelectedFile(null);
    };
    reader.readAsText(selectedFile);
  };

  useEffect(() => {
    if (fileContent) {
      checkFileStructure();
    }
  }, [fileContent]);

  useEffect(() => {
    refetchLoadScenario().then(({ data: loadScenarioData }) => {
      if (loadScenarioData.length === 0 && page > 1) {
        setPage(page - 1);
      }
    });
  }, [page]);

  useEffect(() => {
    if (loopNode) {
      for (let i = 0; i < fileContent.nodes.length; i++) {
        if (fileContent.nodes[i].mode === "ap") {
          addNode.mutate(
            {
              alias_name: fileContent.nodes[i].name,
              control_ip_addr: fileContent.nodes[i].ip,
              network_ssid: fileContent.nodes[i].ssid,
              network_mode: "ap",
              tx_power: parseInt(fileContent.nodes[i].txPower),
              simulation_detail: {},
              radio:
                fileContent.nodes[i].frequency === "2.4GHz" ? "2.4G" : "5G",
            },
            {
              onSuccess: (data) => {},
            },
            {
              onError: (data) => {
                alert("error occur when add node, please import again");
              },
            }
          );
        }
        if (fileContent.nodes[i].mode === "client") {
          if (fileContent.nodes[i].simulationType === "deterministic") {
            addNode.mutate(
              {
                alias_name: fileContent.nodes[i].name,
                control_ip_addr: fileContent.nodes[i].ip,
                network_ssid: fileContent.nodes[i].ssid,
                network_mode: "client",
                simulation_detail: {
                  simulation_type: "deterministic",
                  average_interval_time: parseInt(
                    fileContent.nodes[i].averageIntervalTime
                  ),
                  average_packet_size: parseInt(
                    fileContent.nodes[i].averagePacketSize
                  ),
                  timeout: parseInt(fileContent.nodes[i].timeOut),
                },
              },
              {
                onSuccess: (data) => {},
              },
              {
                onError: (data) => {
                  alert("error occur when add node, please import again");
                },
              }
            );
          }
          if (fileContent.nodes[i].simulationType === "web") {
            addNode.mutate(
              {
                alias_name: fileContent.nodes[i].name,
                control_ip_addr: fileContent.nodes[i].ip,
                network_ssid: fileContent.nodes[i].ssid,
                network_mode: "client",
                simulation_detail: {
                  simulation_type: "web_application",
                  average_interval_time: parseInt(
                    fileContent.nodes[i].averageIntervalTime
                  ),
                  average_packet_size: parseInt(
                    fileContent.nodes[i].averagePacketSize
                  ),
                  // average_new_page_packet_size: parseInt(
                  //   fileContent.nodes[i].averageNewPacketSize
                  // ),
                  // probability_of_load_new_page: parseFloat(
                  //   fileContent.nodes[i].probabilityOfLoadNewPacket
                  // ),
                  timeout: parseInt(fileContent.nodes[i].timeOut),
                },
              },
              {
                onSuccess: (data) => {},
              },
              {
                onError: (data) => {
                  alert("error occur when add node, please import again");
                },
              }
            );
          }
          if (fileContent.nodes[i].simulationType === "file") {
            addNode.mutate(
              {
                alias_name: fileContent.nodes[i].name,
                control_ip_addr: fileContent.nodes[i].ip,
                network_ssid: fileContent.nodes[i].ssid,
                network_mode: "client",
                simulation_detail: {
                  simulation_type: "file_transfer",
                  average_packet_size: parseInt(
                    fileContent.nodes[i].averagePacketSize
                  ),
                  timeout: parseInt(fileContent.nodes[i].timeOut),
                },
              },
              {
                onSuccess: (data) => {},
              },
              {
                onError: (data) => {
                  alert("error occur when add node, please import again");
                },
              }
            );
          }
        }
      }
    }
  }, [loopNode]);

  return (
    <div className={styles.sidebar}>
      {/* logo */}
      <div className="logo-container" style={{ marginBottom: "-220px" }}>
        <svg viewBox="0 60 300 300">
          <image href={logo} width="300" height="300" />
        </svg>
      </div>
      {/* searchbar */}
      <form style={{ padding: "0 1em 0em 1em" }}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={(e) => setSearchVariable(e.target.value)}
          />
          <div className="input-group-btn">
            <button
              className="button-2"
              type="submit"
              style={{
                padding: "0.6em",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                border: "1px solid #dee2e6",
              }}
              onClick={(e) => {
                e.preventDefault();
                refetchLoadScenario();
              }}
            >
              <IoSearch style={{ fontSize: "1.5em" }} />
            </button>
          </div>
        </div>
        <div
          style={{
            padding: "0.5em",
            borderBottom: "2px solid #ccc",
            borderRadius: "2px",
          }}
        ></div>
      </form>
      {/* listScenario */}
      <div className="list-group" style={{ padding: "1em 1em 1em 1em" }}>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ borderRadius: "50px", textAlign: "center", color: "grey" }}
          onClick={() => {
            setScenarioName("");
            setScenarioDesc("");
            setSsid("");
            setPassword("");
            setSelectedOption("onDetail1");
            setBorderColor1("#333");
            setBorderColor2("#dee2e6");
          }}
        >
          <IoMdAdd />
          <span style={{ fontSize: "1em" }}>Add Scenario</span>
        </button>

        <div>
          {loadScenarioData &&
            loadScenarioData.map((scenario, i) => (
              <Scenario
                key={i}
                refetchLoadScenario={refetchLoadScenario}
                setSelectedScenario={setSelectedScenario}
                loadScenarioData={loadScenarioData}
                selectedScenario={selectedScenario}
                setPage={setPage}
                page={page}
                data={{
                  name: scenario.scenario_name,
                  id: scenario.scenario_id,
                }}
              />
            ))}
          {loadScenarioStatus === "loading" && (
            <p className="placeholder-glow">
              <span className="placeholder col-12"></span>
            </p>
          )}
        </div>
      </div>

      {/* pagination */}
      <button
        style={{
          position: "absolute",
          bottom: "1em",
          left: "1em",
          color: `${page === 1 ? "grey" : "#333"}`,
          backgroundColor: "transparent",
          border: "none",
        }}
        disabled={page === 1 ? true : false}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        <FaArrowAltCircleLeft style={{ fontSize: "2rem" }} />
        <span style={{ fontWeight: "bold" }}> Previous</span>
      </button>
      <button
        style={{
          position: "absolute",
          bottom: "1em",
          left: "19.3em",
          color: "#333",
          backgroundColor: "transparent",
          border: "none",
          width: "5em",
        }}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        <span style={{ fontWeight: "bold" }}>Next </span>
        <FaArrowAltCircleRight style={{ fontSize: "2rem" }} />
      </button>
      {/* modal */}
      <div
        className="modal fade"
        id="importModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
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
                id="staticBackdropLabel"
                style={{ fontWeight: "bold" }}
              >
                Import JSON
              </h1>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  downloadData(template);
                }}
              >
                <MdDownloadForOffline style={{ fontSize: "1.5em" }} />
                <span style={{ marginLeft: "0.5em" }}>template</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex" }}>
                <div style={{ width: "23em" }}>
                  <input
                    style={{ display: "none" }}
                    id="file-upload"
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="btn btn-secondary">
                    Choose File
                  </label>
                  {selectedFile && (
                    <span style={{ marginLeft: "0.5em" }}>
                      {selectedFile.name.length > 20
                        ? selectedFile.name.substring(0, 20) + "... .json"
                        : selectedFile.name}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleUpload}
                  className="btn btn-secondary"
                  style={{ border: "none", marginLeft: "2em" }}
                >
                  Check
                </button>
              </div>
              {fileContent !== null ? (
                <div className="mb-3" style={{ marginTop: "0.5em" }}>
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    File Detail
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={JSON.stringify(fileContent, null, 2)}
                    disabled
                    style={{
                      resize: "none",
                      whiteSpace: "pre-wrap",
                      height: "20em",
                    }}
                  ></textarea>
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className="modal-footer"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                disabled={!isFileValid}
                onClick={() => {
                  importScenario();
                }}
              >
                Confirm
              </button>
              <button
                type="button  "
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  setFileContent(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
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
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                <span style={{ fontWeight: "bold" }}>Add Scenario</span>
              </h1>
              <span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#importModal"
                >
                  <TbFileImport style={{ fontSize: "1.25em" }} />
                  <span style={{ marginLeft: "0.25em" }}>Import JSON</span>
                </button>
              </span>
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
                  Scenario Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Scenario Name"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  placeholder="Description"
                  value={scenarioDesc}
                  onChange={(e) => setScenarioDesc(e.target.value)}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <SelectScenarioType
                data={{
                  name: "onDetail",
                  isEdit: true,
                  selectedOption,
                  setSelectedOption,
                  borderColor1,
                  setBorderColor1,
                  borderColor2,
                  setBorderColor2,
                  ssid,
                  setSsid,
                  password,
                  setPassword,
                  selectedWifiType,
                  setSelectedWifiType,
                  setSelectedWifiTypeAP,
                  selectedWifiTypeAP,
                }}
              />
            </div>
            <div
              className="modal-footer"
              style={{
                marginLeft: "0em",
                marginRight: "0em",
                textAlign: "center",
              }}
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
                  if ((!ssid || !password) && selectedOption === "onDetail2") {
                    alert("SSID and Password cannot be empty");
                    return;
                  }

                  mutation.mutate(
                    {
                      scenario_name:
                        scenarioName === ""
                          ? "Scenario#" + generateRandomString()
                          : scenarioName,
                      scenario_desc: scenarioDesc,
                      is_using_target_ap:
                        selectedOption === "onDetail1" ? false : true,
                      target_ap_ssid: ssid,
                      target_ap_password: password,
                      target_ap_radio:
                        selectedWifiType === "2.4GHz_onDetail" ? "2.4G" : "5G",
                    },
                    {
                      onSuccess: (data) => {
                        setSelectedScenario(data.data.scenario_id);
                        refetchLoadScenario();
                        closeRef.current.click();
                      },
                    }
                  );
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
};

export default Sidebar;
