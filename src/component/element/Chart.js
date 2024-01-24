import React from "react";
import styles from "./Chart.module.css";
import { TbFileExport } from "react-icons/tb";
import RechartGraph from "./RechartGraph";

function Chart({downloadData, simulationData, listNode, setListNode}) {
  return (
    <div>
      <div style={{ margin: "1em", marginBottom: "0.5em" }}>
        <div className="dropdown">
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
      <div
        style={{
          fontWeight: "bold",
          marginLeft: "2em",
          marginBottom: "1em",
        }}
      >
        Tx Power
      </div>
      <RechartGraph data={simulationData["TxPower"]} listNode={listNode} />
      <div
        style={{
          fontWeight: "bold",
          marginLeft: "2em",
          marginBottom: "1em",
        }}
      >
        Signal
      </div>
      <RechartGraph data={simulationData["Signal"]} listNode={listNode} />
      <div
        style={{
          fontWeight: "bold",
          marginLeft: "2em",
          marginBottom: "1em",
        }}
      >
        Noise
      </div>
      <RechartGraph data={simulationData["Noise"]} listNode={listNode} />
      <div
        style={{
          fontWeight: "bold",
          marginLeft: "2em",
          marginBottom: "1em",
        }}
      >
        Bit Rate
      </div>
      <RechartGraph data={simulationData["BitRate"]} listNode={listNode} />
    </div>
  );
}

export default Chart;
