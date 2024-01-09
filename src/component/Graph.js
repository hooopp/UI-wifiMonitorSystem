import React from "react";
import { IoSearch } from "react-icons/io5";
import styles from "./Graph.module.css";

function Graph() {
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
          
    </div>
  );
}

export default Graph;
