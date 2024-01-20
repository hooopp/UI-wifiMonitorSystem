import React, { useEffect } from "react";
import styles from "./ViewGraphPopUp.module.css";
import RechartGraph from "./RechartGraph";
import { set } from "date-fns";

function ViewGraphPopUp({ reportIsClicked, loadGraphRefetch }) {
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
  const [listNode, setListNode] = React.useState([
    { node: "192.168.1.1", color: "#8884d8", checked: true },
    { node: "192.168.1.2", color: "#82ca9d", checked: true },
  ]);

  const loadGraphDetailData = {
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
    scenario_id: 2,
    scenario_snapshot: {
      "GalaxyNote10+25bc": {
        is_target_ap: true,
        aps: {},
        clients: {
          "192.168.1.1": {
            simulation_type: "deterministic",
            timeout: 300,
            average_interval_time: 10,
            average_packet_size: 128,
            alias_name: "w9",
          },
        },
      },
    },
    title: "test13",
    state_message:
      "192.168.1.1 : {'message': 'wifi is connected'}\nthis_device: connected to GalaxyNote10+25bc with ip_address 192.168.86.50\n192.168.1.1 : {'message': 'simulation task has been scheduled'}\nw9 deterministic_client 1704356715.2606883: hello change from term to INT\nthis_device deterministic_server 1704356715.0653534: hello change from term to INT\r\nthis_device deterministic_server 1704356715.0663533: server start at 0.0.0.0:8888\r\n[Errno 110] Connect call failed ('192.168.86.50', 8888)\nw9 deterministic_client 1704356847.4718745: \n\nexited\n\n\nthis_device deterministic_server 1704357020.093951: Closing server socket.\r\nthis_device deterministic_server 1704357020.094738: Cancel all pending tasks(handle_client tasks) for exit.\r\nWait for all tasks to terminate: [<coroutine object IocpProactor.accept.<locals>.accept_coro at 0x000002395AB7CF20>]\r\nthis_device deterministic_server 1704357020.0957787: All coroutines completed. Exiting.\r\nthis_device deterministic_server 1704357020.0977912: \r\n\r\nexited\r\n\r\n\r\n",
    created_at: "2024-01-04T15:25:05.881919",
  };

  const simulationData = {
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

  function getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }

  function downloadData(data) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
                      className="btn btn-dark dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{marginLeft:"1em"}}
                    >
                      <span style={{ fontWeight: "bold" }}>select nodes</span>
                    </button>
                    <button className="btn btn-dark" style={{fontWeight:"bold", marginLeft:"0.5em"}} onClick={()=>{downloadData(simulationData)}}>export JSON</button>
                    <ul class="dropdown-menu" style={{ width: "18em" }}>
                      {simulationData.nodes.map((node, index) => {
                        return (
                          <li>
                            <div style={{ display: "flex" }}>
                              <div className={styles.autoScroll}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={index}
                                  value=""
                                  aria-label=""
                                  style={{
                                    position: "relative",
                                    left: "0.3em",
                                  }}
                                  checked={listNode[index].checked}
                                  onChange={(e) => {
                                    setListNode(
                                      listNode.map((item, i) => {
                                        if (i === index) {
                                          return {
                                            ...item,
                                            checked: !item.checked,
                                          };
                                        } else {
                                          return item;
                                        }
                                      })
                                    );
                                  }}
                                />
                              </div>
                              <div>
                                <span
                                  className="dropdown-item-text"
                                  style={{
                                    width: "10em",
                                    paddingLeft: "0em",
                                    position: "relative",
                                    left: "0.5em",
                                  }}
                                >
                                  {node}
                                </span>
                              </div>
                              <div className="mb3">
                                <input
                                  className="form-control"
                                  id="ee"
                                  style={{
                                    width: "6em",
                                    position: "relative",
                                    left: "-1em",
                                    margin: "0.25em 0em",
                                    color: "black",
                                  }}
                                  value={listNode[index].color}
                                  onChange={(e) => {
                                    setListNode(
                                      listNode.map((item, i) => {
                                        if (i === index) {
                                          return {
                                            ...item,
                                            color: e.target.value,
                                          };
                                        } else {
                                          return item;
                                        }
                                      })
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "2em",
                    marginBottom: "1em",
                  }}
                >
                  Tx Power
                </div>
                <RechartGraph
                  data={simulationData["TxPower"]}
                  listNode={listNode}
                />
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "2em",
                    marginBottom: "1em",
                  }}
                >
                  Signal
                </div>
                <RechartGraph
                  data={simulationData["Signal"]}
                  listNode={listNode}
                />
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "2em",
                    marginBottom: "1em",
                  }}
                >
                  Noise
                </div>
                <RechartGraph
                  data={simulationData["Noise"]}
                  listNode={listNode}
                />
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "2em",
                    marginBottom: "1em",
                  }}
                >
                  Bit Rate
                </div>
                <RechartGraph
                  data={simulationData["BitRate"]}
                  listNode={listNode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewGraphPopUp;
