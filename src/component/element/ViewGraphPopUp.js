import React, { useEffect } from "react";
import styles from "./ViewGraphPopUp.module.css";
import RechartGraph from "./RechartGraph";

function ViewGraphPopUp({
  reportIsClicked,
  loadGraphDetailData,
  loadGraphRefetch,
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

  const raw_data = {
    id: 13,
    state: "finished",
    simulation_data: {
      "192.168.1.1": {
        "Tx-Power": [
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
        ],
        Signal: [
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
        ],
        Noise: [
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
        ],
        BitRate: [
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
        ],
      },
      "192.168.1.2": {
        "Tx-Power": [
          [1704356715.2233462, "7"],
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
          [1704356721.575918, "6"],
        ],
        Signal: [
          [1704356721.575918, "6"],
          [1704356715.2233462, "7"],
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
        ],
        Noise: [
          [1704356715.2233462, "7"],
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
          [1704356721.575918, "6"],
        ],
        BitRate: [
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
          [1704356721.575918, "6"],
          [1704356715.2233462, "7"],
        ],
      },
    },
  };

  const simulation_data = {
    nodes: ["192.168.1.1", "192.168.1.2"],
    TxPower: [
      { timeStamp: "08:25:15", "192.168.1.1": "6", "192.168.1.2": "7" },
      { timeStamp: "08:25:16", "192.168.1.1": "3", "192.168.1.2": "5" },
      { timeStamp: "08:25:17", "192.168.1.1": "4", "192.168.1.2": "6" },
      { timeStamp: "08:25:18", "192.168.1.1": "7", "192.168.1.2": "7" },
      { timeStamp: "08:25:19", "192.168.1.1": "8", "192.168.1.2": "5" },
      { timeStamp: "08:25:20", "192.168.1.1": "5", "192.168.1.2": "6" },
      { timeStamp: "08:25:21", "192.168.1.1": "5", "192.168.1.2": 0 },
      { timeStamp: "08:25:22", "192.168.1.1": "6", "192.168.1.2": 0 },
    ],
    Signal: [
      { timeStamp: "08:25:15", "192.168.1.1": "4", "192.168.1.2": "6" },
      { timeStamp: "08:25:16", "192.168.1.1": "7", "192.168.1.2": "7" },
      { timeStamp: "08:25:17", "192.168.1.1": "8", "192.168.1.2": "5" },
      { timeStamp: "08:25:18", "192.168.1.1": "5", "192.168.1.2": "6" },
      { timeStamp: "08:25:19", "192.168.1.1": "5", "192.168.1.2": "7" },
      { timeStamp: "08:25:20", "192.168.1.1": "6", "192.168.1.2": "5" },
      { timeStamp: "08:25:21", "192.168.1.1": "6", "192.168.1.2": 0 },
      { timeStamp: "08:25:22", "192.168.1.1": "3", "192.168.1.2": 0 },
    ],
    Noise: [
      { timeStamp: "08:25:15", "192.168.1.1": "8", "192.168.1.2": "7" },
      { timeStamp: "08:25:16", "192.168.1.1": "5", "192.168.1.2": "5" },
      { timeStamp: "08:25:17", "192.168.1.1": "5", "192.168.1.2": "6" },
      { timeStamp: "08:25:18", "192.168.1.1": "6", "192.168.1.2": "7" },
      { timeStamp: "08:25:19", "192.168.1.1": "6", "192.168.1.2": "5" },
      { timeStamp: "08:25:20", "192.168.1.1": "3", "192.168.1.2": "6" },
      { timeStamp: "08:25:21", "192.168.1.1": "4", "192.168.1.2": 0 },
      { timeStamp: "08:25:22", "192.168.1.1": "7", "192.168.1.2": 0 },
    ],
    BitRate: [
      { timeStamp: "08:25:15", "192.168.1.1": "5", "192.168.1.2": "5" },
      { timeStamp: "08:25:16", "192.168.1.1": "6", "192.168.1.2": "6" },
      { timeStamp: "08:25:17", "192.168.1.1": "6", "192.168.1.2": "7" },
      { timeStamp: "08:25:18", "192.168.1.1": "3", "192.168.1.2": "5" },
      { timeStamp: "08:25:19", "192.168.1.1": "4", "192.168.1.2": "6" },
      { timeStamp: "08:25:20", "192.168.1.1": "7", "192.168.1.2": "7" },
      { timeStamp: "08:25:21", "192.168.1.1": "8", "192.168.1.2": 0 },
      { timeStamp: "08:25:22", "192.168.1.1": "5", "192.168.1.2": 0 },
    ],
  };

  const handleDownload = () => {
    const json = JSON.stringify(simulation_data);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (reportIsClicked) {
      setName(loadGraphDetailData.title);
      setState(loadGraphDetailData.state);
      setStateMessage(loadGraphDetailData.state_message);
      setCreatedTime(loadGraphDetailData.created_at);
      setStateMessage(loadGraphDetailData.state_message);
    }
  }, [reportIsClicked]);

  useEffect(() => {
    if (autoScroll) {
      const handleShown = () => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop =
            messagesEndRef.current.scrollHeight;
        }
      };

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
                <div
                  ref={messagesEndRef}
                  style={{
                    overflowY: "scroll",
                    width: "45em",
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
                <div style={{ margin: "1em", marginBottom: "0.5em" }}>
                  <div class="dropdown">
                    <button
                      class="btn btn-dark dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span style={{ fontWeight: "bold" }}>select nodes</span>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <li>
                          <div style={{ display: "flex" }}>
                            <input></input>
                            <span class="dropdown-item-text">
                              Dropdown item text
                            </span>
                          </div>
                        </li>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          Another action
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          Something else here
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* <div>
                    <button
                      type="button"
                      class="btn btn-dark"
                      style={{
                        width: "9em",
                        height: "2.25em",
                        fontWeight: "bold",
                        marginLeft: "1em",
                      }}
                      onClick={() => {
                        handleDownload();
                      }}
                    >
                      export as JSON
                    </button>
                  </div> */}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "2em",
                    marginBottom: "1em",
                  }}
                >
                  Tx-Power
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "2em",
                    marginBottom: "1em",
                  }}
                >
                  Signal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewGraphPopUp;
