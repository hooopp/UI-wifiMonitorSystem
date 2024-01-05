import React from "react";
import Node from "./Node";
import styles from "./Nodes.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import NodePopUp from "./element/NodePopUp";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

function Nodes({ selectedScenario }) {
  const [popUpMode, setPopUpMode] = useState("add");
  const loadNode = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/node?page_size=10&page=1`
    );
    return data;
  };

  const {
    data: loadNodeData,
    status: loadNodeStatus,
    refetch: refetchLoadNode,
  } = useQuery("node", loadNode);

  return (
    <div>
      {/* searchbar */}
      <form>
        <div className="input-group" style={{ paddingTop: "0.5em" }}>
          <input type="text" className="form-control" placeholder="Search" />
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
      {/* addNode */}
      <div
        className="list-group"
        style={{ paddingBottom: "0em", paddingTop: "1em" }}
      >
        <button
          type="button"
          className="list-group-item list-group-item-action"
          style={{
            borderRadius: "10px",
            textAlign: "center",
            color: "grey",
            backgroundColor: "",
          }}
          onClick={() => {setPopUpMode("add")}}
          data-bs-toggle="modal"
          data-bs-target="#NodePopUp"
        >
          <IoMdAdd />
          <span style={{ fontSize: "1em" }}>Add Node</span>
        </button>
      </div>
      <NodePopUp popUpMode={popUpMode} selectedScenario={selectedScenario} refetchLoadNode={refetchLoadNode} />
      {/* headerNode */}
      <div
        className={styles.Nodes}
        style={{
          marginTop: "1em",
          marginBottom: "0.5em",
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          padding: "0.5em 0em 0.5em 0em",
        }}
      >
        <span style={{ textAlign: "left", width: "200px", marginLeft: "1em" }}>
          name
        </span>
        <span>ip</span>
        <span>type</span>
        <span>ssid</span>
        <div></div>
      </div>
      {/* Node */}

      <div className="listNode">
        {loadNodeData &&
          loadNodeData.map((data, i) => (
            <Node
              key={i}
              name={data.alias_name}
              ip={data.control_ip_addr}
              mode={data.network_mode}
              ssid={data.network_ssid}
              id={data.id}
              selectedScenario={selectedScenario}
              refetchLoadNode={refetchLoadNode}
              popUpMode={popUpMode}
              setPopUpMode={setPopUpMode}
            />
          ))}
      </div>
    </div>
  );
}

export default Nodes;
