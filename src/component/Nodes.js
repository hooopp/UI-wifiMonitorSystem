import React from "react";
import Node from "./Node";
import styles from "./Nodes.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

function Nodes() {
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
        >
          <IoMdAdd />
          <span style={{ fontSize: "1em" }}>Add Node</span>
        </button>
      </div>
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
        <Node
          data={{
            name: "node1",
            ip: "192.168.0.1",
            mode: "AP",
            ssid: "hoop'wifi",
          }}
        />
        <Node
          data={{
            name: "node2",
            ip: "192.168.0.2",
            mode: "Client",
            ssid: "hoop'wifi",
          }}
        />
        <Node
          data={{
            name: "node3",
            ip: "192.168.0.3",
            mode: "Client",
            ssid: "hoop'wifi",
          }}
        />
      </div>
    </div>
  );
}

export default Nodes;
