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

  const simulation_data = {
    ssid1: {
      "192.168.0.1": {
        TxPower: [
          { timeStamp: "2022-06-01T15:00:01.323", value: 3 },
          { timeStamp: "2022-06-01T15:00:02.323", value: 6 },
          { timeStamp: "2022-06-01T15:00:03.323", value: 4 },
          { timeStamp: "2022-06-01T15:00:04.323", value: 5 },
          { timeStamp: "2022-06-01T15:00:05.323", value: 2 },
        ],
        Signal: [
          { timeStamp: "2022-06-01T15:00:01.323", value: 18 },
          { timeStamp: "2022-06-01T15:00:02.323", value: 17 },
          { timeStamp: "2022-06-01T15:00:03.323", value: 15 },
          { timeStamp: "2022-06-01T15:00:04.323", value: 14 },
          { timeStamp: "2022-06-01T15:00:05.323", value: 17 },
        ],
        Noise: [],
        Bitrate: [],
      },
      "192.168.0.2": {
        TxPower: [],
        Signal: [],
        Noise: [],
        Bitrate: [],
      },
    },
    ssid2: {
      "172.0.0.1": {
        TxPower: [
          { timeStamp: "2022-06-01T15:00:01.443", value: 3 },
          { timeStamp: "2022-06-01T15:00:02.443", value: 6 },
          { timeStamp: "2022-06-01T15:00:03.443", value: 4 },
          { timeStamp: "2022-06-01T15:00:04.443", value: 5 },
          { timeStamp: "2022-06-01T15:00:05.443", value: 2 },
        ],
        Signal: [
          { timeStamp: "2022-06-01T15:00:01.443", value: 18 },
          { timeStamp: "2022-06-01T15:00:02.443", value: 17 },
          { timeStamp: "2022-06-01T15:00:03.443", value: 15 },
          { timeStamp: "2022-06-01T15:00:04.443", value: 14 },
          { timeStamp: "2022-06-01T15:00:05.443", value: 17 },
        ],
        Noise: [],
        Bitrate: [],
      },
      "172.0.0.2": {
        TxPower: [],
        Signal: [],
        Noise: [],
        Bitrate: [],
      },
    },
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
                <div style={{ display: "flex" }}>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "15em", margin: "1em" }}
                  >
                    {simulation_data &&
                      Object.entries(simulation_data).map(
                        ([key, value], index) => <option>{key}</option>
                      )}
                  </select>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style={{ width: "15em", margin: "1em" }}
                  >
                    {simulation_data &&
                      Object.entries(simulation_data).map(
                        ([key, value], index) =>
                          key === "ssid2"
                            ? Object.entries(value).map(
                                ([key2, value2], index) => (
                                  <option>{key2}</option>
                                )
                              )
                            : ""
                      )}
                  </select>
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
                {simulation_data && (
                  <RechartGraph
                    data={simulation_data.ssid1["192.168.0.1"].TxPower}
                  />
                )}
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "2em",
                    marginBottom: "1em",
                  }}
                >
                  Signal
                </div>
                {simulation_data && (
                  <RechartGraph
                    data={simulation_data.ssid1["192.168.0.1"].Signal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewGraphPopUp;
