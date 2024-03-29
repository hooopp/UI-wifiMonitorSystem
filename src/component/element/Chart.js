import React from "react";
import styles from "./Chart.module.css";
import { TbFileExport } from "react-icons/tb";
import RechartGraph from "./RechartGraph";
import { useState, useEffect } from "react";

function Chart({
  downloadData,
  simulationData,
  listNode,
  setListNode,
  selectedMetric,
  setSelectedMetric,
}) {
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <div style={{ margin: "1em", marginBottom: "0.5em" }}>
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
            <ul className="dropdown-menu" style={{ width: "10em" }}>
              {selectedMetric.map((metric, index) => {
                return (
                  <li key={index} style={{ display: "flex" }}>
                    <div
                      className={styles.autoScroll}
                      style={{ marginLeft: "0.5em" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        aria-label=""
                        checked={metric[1]}
                        style={{
                          position: "relative",
                          left: "0.3em",
                        }}
                        onChange={(e) => {
                          setSelectedMetric(
                            selectedMetric.map((item, i) => {
                              if (i === index) {
                                return [item[0], !item[1]];
                              } else {
                                return item;
                              }
                            })
                          );
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "0em", textAlign: "left" }}>
                      <span
                        className="dropdown-item-text"
                        style={{ width: "10em" }}
                      >
                        {metric[0]}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dropdown" style={{ margin: "0em -1.5em" }}>
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ marginLeft: "1em" }}
            >
              <span style={{ fontWeight: "bold" }}>select nodes</span>
            </button>
            <button
              className="btn btn-dark"
              style={{ fontWeight: "bold", marginLeft: "0.5em" }}
              onClick={() => {
                downloadData(simulationData);
              }}
            >
              <TbFileExport style={{ fontSize: "1.25em" }} />
              <span style={{ marginLeft: "0.25em" }}>export</span>
            </button>

            <ul className="dropdown-menu" style={{ width: "18em" }}>
              {simulationData.nodes.map((node, index) => {
                return (
                  <li key={index}>
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
                            left: "0.5em",
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
                            left: "0.7em",
                          }}
                        >
                          {node}
                        </span>
                      </div>
                      <div className="mb3">
                        <input
                          className="form-control"
                          id={`inputColor${index}`}
                          style={{
                            width: "6em",
                            position: "relative",
                            left: "-1em",
                            margin: "0.25em 0em",
                            color: `${listNode[index].color}`,
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
      </div>
      {selectedMetric.map((metric, index) => {
        return metric[1] ? (
          <div key={index}>
            <div
              style={{
                fontWeight: "bold",
                marginLeft: "2em",
                marginBottom: "1em",
              }}
            >
              {metric[0]==="TxPower" ? "Tx Power (dBm)" : metric[0]==="Signal" ? "Signal (dBm)": metric[0]==="Noise" ? "Noise (dBm)" : metric[0] === "BitRate" ? "BitRate (MBit/s)" : metric[0]==="RTT" ? "RTT (ms)" : ""}
            </div>
            <RechartGraph
              data={simulationData[metric[0]]}
              listNode={listNode}
            />
          </div>
        ) : null;
      })}
    </div>
  );
}

export default Chart;
