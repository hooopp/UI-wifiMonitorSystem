import React from "react";
import { TbFileExport } from "react-icons/tb";
import styles from "./Chart.module.css";
import { set } from "date-fns";
import RechartGraphApp from "./RechartGraphApp";

function ChartApp({
  monitorSide,
  setMonitorSide,
  downloadData,
  simulationDataApp,
  ssidMonitor,
  setSsidMonitor
}) {
  const [selectedMetric, setSelectedMetric] = React.useState([
    ["Latency", true],
    ["Packet Loss", true],
    ["Data Rate Web", true],
    ["Data Rate File", true],
  ]);

  return (
    <div style={{ margin: "1em", marginBottom: "0.5em", marginTop: "0em" }}>
      <div className="mb-3">
        <select
          className="form-select"
          aria-label="Default select example"
          value={monitorSide}
          style={{ width: "20em", marginLeft: "1em", marginTop: "1em" }}
          onChange={(e) => {
            setMonitorSide(e.target.value);
          }}
        >
          <option value="serverMonitoredByClient">
            server monitored by client
          </option>
          <option value="clientMonitoredByServer">
            client monitored by server
          </option>
        </select>
      </div>
      <div style={{ display: "flex" }}>
        <div className="dropdown" style={{ margin: "0em 1em" }}>
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontWeight: "bold" }}
          >
            select metrics
          </button>
          <ul className="dropdown-menu" style={{ width: "11em" }}>
            <li style={{ display: "flex" }}>
              <div
                className={styles.autoScroll}
                style={{ marginLeft: "0.5em" }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  aria-label=""
                  style={{
                    position: "relative",
                    left: "0.3em",
                  }}
                  checked={selectedMetric[0][1]}
                  onChange={(e) => {
                    selectedMetric[0][1] = !selectedMetric[0][1];
                    setSelectedMetric([...selectedMetric]);
                  }}
                />
              </div>
              <div style={{ marginLeft: "0em", textAlign: "left" }}>
                <span className="dropdown-item-text" style={{ width: "10em" }}>
                  Latency
                </span>
              </div>
            </li>
            <li style={{ display: "flex" }}>
              <div
                className={styles.autoScroll}
                style={{ marginLeft: "0.5em" }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  aria-label=""
                  style={{
                    position: "relative",
                    left: "0.3em",
                  }}
                  checked={selectedMetric[1][1]}
                  onChange={(e) => {
                    selectedMetric[1][1] = !selectedMetric[1][1];
                    setSelectedMetric([...selectedMetric]);
                  }}
                />
              </div>
              <div style={{ marginLeft: "0em", textAlign: "left" }}>
                <span className="dropdown-item-text" style={{ width: "10em" }}>
                  Packet Loss
                </span>
              </div>
            </li>
            {monitorSide === "serverMonitoredByClient" ? (
              <li style={{ display: "flex" }}>
                <div
                  className={styles.autoScroll}
                  style={{ marginLeft: "0.5em" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    aria-label=""
                    style={{
                      position: "relative",
                      left: "0.3em",
                    }}
                    checked={selectedMetric[2][1]}
                    onChange={(e) => {
                      selectedMetric[2][1] = !selectedMetric[2][1];
                      setSelectedMetric([...selectedMetric]);
                    }}
                  />
                </div>
                <div style={{ marginLeft: "0em", textAlign: "left" }}>
                  <span
                    className="dropdown-item-text"
                    style={{ width: "10em" }}
                  >
                    Data Rate (Web)
                  </span>
                </div>
              </li>
            ) : (
              ""
            )}
            {monitorSide === "serverMonitoredByClient" ? (
              <li style={{ display: "flex" }}>
                <div
                  className={styles.autoScroll}
                  style={{ marginLeft: "0.5em" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    aria-label=""
                    style={{
                      position: "relative",
                      left: "0.3em",
                    }}
                    checked={selectedMetric[3][1]}
                    onChange={(e) => {
                      selectedMetric[3][1] = !selectedMetric[3][1];
                      setSelectedMetric([...selectedMetric]);
                    }}
                  />
                </div>
                <div style={{ marginLeft: "0em", textAlign: "left" }}>
                  <span
                    className="dropdown-item-text"
                    style={{ width: "10em" }}
                  >
                    Data Rate (File)
                  </span>
                </div>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="dropdown" style={{ margin: "0em 1em" }}>
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontWeight: "bold", marginLeft: "-1.5em" }}
          >
            select ssid
          </button>
          <ul className="dropdown-menu" style={{ width: "15em" }}>
            {ssidMonitor.map((ssid, index) => {
              return (
                <li key={index}>
                  <div style={{ display: "flex" }}>
                    <div className={styles.autoScroll}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={ssid + index}
                        value=""
                        aria-label=""
                        style={{
                          position: "relative",
                          left: "-0.25em",
                        }}
                        checked={ssid.checked}
                        onChange={(e) => {
                          setSsidMonitor(
                            ssidMonitor.map((item, i) => {
                              if (i === index) {
                                if (ssid.checked == true) {
                                  item.nodes.map((node, index) => {
                                    node.checked = false;
                                  });
                                } else {
                                  item.nodes.map((node, index) => {
                                    node.checked = true;
                                  });
                                }
                                return { ...item, checked: !item.checked };
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
                          left: "-1.5em",
                        }}
                      >
                        {ssid.ssid &&
                          (ssid.ssid.length > 15
                            ? `${ssid.ssid.substring(0, 25)}...`
                            : ssid.ssid)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="dropdown"
          style={{ margin: "0em 1em", marginLeft: "-0.5em" }}
        >
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontWeight: "bold" }}
          >
            select nodes
          </button>
          <ul className="dropdown-menu" style={{ width: "18em" }}>
            {ssidMonitor.map((ssid, ssidIndex) => {
              if (ssid.checked == true) {
                return ssid.nodes.map((node, nodeIndex) => {
                  return (
                    <li key={nodeIndex}>
                      <div style={{ display: "flex" }}>
                        <div className={styles.autoScroll}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={node + nodeIndex}
                            value=""
                            aria-label=""
                            style={{
                              position: "relative",
                              left: "0.5em",
                            }}
                            checked={node.checked}
                            onChange={(e) => {
                              setSsidMonitor(
                                ssidMonitor.map((item, i) => {
                                  if (item.ssid == ssid.ssid) {
                                    return {
                                      ...item,
                                      nodes:
                                        item.nodes && item.nodes.length > 0
                                          ? item.nodes.map((item2, i2) => {
                                              if (item2.node == node.node) {
                                                return {
                                                  ...item2,
                                                  checked: !item2.checked,
                                                };
                                              } else {
                                                return item2;
                                              }
                                            })
                                          : [],
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
                              left: "0.7em",
                            }}
                          >
                            {node.node}
                          </span>
                        </div>
                        <div className="mb3">
                          <input
                            className="form-control"
                            style={{
                              width: "6em",
                              position: "relative",
                              left: "-1em",
                              margin: "0.25em 0em",
                              color: node.color,
                            }}
                            value={node.color}
                            onChange={(e) => {
                              setSsidMonitor(
                                ssidMonitor.map((item, i) => {
                                  if (item.ssid == ssid.ssid) {
                                    return {
                                      ...item,
                                      nodes:
                                        item.nodes && item.nodes.length > 0
                                          ? item.nodes.map((item2, i2) => {
                                              if (item2.node == node.node) {
                                                return {
                                                  ...item2,
                                                  color: e.target.value,
                                                };
                                              } else {
                                                return item2;
                                              }
                                            })
                                          : [],
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
                });
              }
            })}
          </ul>
        </div>
        <div style={{ margin: "0em 1em" }}>
          <button
            className="btn btn-dark"
            style={{ fontWeight: "bold", marginLeft: "-1.5em" }}
            onClick={() => {
              downloadData(simulationDataApp);
            }}
          >
            <TbFileExport style={{ fontSize: "1.25em" }} />
            <span style={{ marginLeft: "0.25em" }}>export</span>
          </button>
        </div>
      </div>
      {selectedMetric[0][1] && (
        <div>
          <div
            style={{
              fontWeight: "bold",
              marginLeft: "1em",
              marginBottom: "1em",
              marginTop: "0.5em",
            }}
          >
            Latency
          </div>
          <RechartGraphApp
            ssidMonitor={ssidMonitor}
            simulationDataApp={
              monitorSide === "serverMonitoredByClient"
                ? simulationDataApp.serverMonitoredByClient["Latency"]
                : simulationDataApp.clientMonitoredByServer["Latency"]
            }
          />
        </div>
      )}
      {selectedMetric[1][1] && (
        <div>
          <div
            style={{
              fontWeight: "bold",
              marginLeft: "1em",
              marginBottom: "1em",
              marginTop: "0.5em",
            }}
          >
            Packet Loss
          </div>
          <RechartGraphApp
            ssidMonitor={ssidMonitor}
            simulationDataApp={
              monitorSide === "serverMonitoredByClient"
                ? simulationDataApp.serverMonitoredByClient["PacketLoss"]
                : simulationDataApp.clientMonitoredByServer["PacketLoss"]
            }
          />
        </div>
      )}
      {monitorSide === "serverMonitoredByClient" && selectedMetric[2][1] && (
        <div>
          <div
            style={{
              fontWeight: "bold",
              marginLeft: "1em",
              marginBottom: "1em",
              marginTop: "0.5em",
            }}
          >
            Data Rate (Web)
          </div>
          <RechartGraphApp
            ssidMonitor={ssidMonitor}
            simulationDataApp={
              monitorSide === "serverMonitoredByClient"
                ? simulationDataApp.serverMonitoredByClient["DataRateWeb"]
                : simulationDataApp.clientMonitoredByServer["DataRateWeb"]
            }
          />
        </div>
      )}
      {monitorSide === "serverMonitoredByClient" && selectedMetric[3][1] && (
        <div>
          <div
            style={{
              fontWeight: "bold",
              marginLeft: "1em",
              marginBottom: "1em",
              marginTop: "0.5em",
            }}
          >
            Data Rate (File)
          </div>
          <RechartGraphApp
            ssidMonitor={ssidMonitor}
            simulationDataApp={
              monitorSide === "serverMonitoredByClient"
                ? simulationDataApp.serverMonitoredByClient["DataRateFile"]
                : simulationDataApp.clientMonitoredByServer["DataRateFile"]
            }
          />
        </div>
      )}
    </div>
  );
}

export default ChartApp;
