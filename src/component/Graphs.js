import React from "react";
import { IoSearch } from "react-icons/io5";
import styles from "./Graphs.module.css";
import Graph from "./Graph";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

function Graphs() {
  return (
    <div style={{position:"relative"}}>
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
      {/* graph */}
      <Graph name={"test"}/>
      {/* pagination */}
      <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              position: "absolute",
              left:"20em",
              top:"41em",
            }}
            disabled
          >
            <FaArrowAltCircleLeft style={{ fontSize: "2rem" }} />
            <span style={{ fontWeight: "bold" }}> Previous</span>
          </button>
          <button
            style={{
              color: "#333",
              backgroundColor: "transparent",
              border: "none",
              width: "5em",
              position: "absolute",
              left:"35em",
              top:"41em"
            }}
          >
            <span style={{ fontWeight: "bold" }}>Next </span>
            <FaArrowAltCircleRight style={{ fontSize: "2rem" }} />
          </button>
    </div>
  );
}

export default Graphs;
