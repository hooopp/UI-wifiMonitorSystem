import React from "react";
import styles from "./Graph.module.css";

function Graph({ name }) {
  return (
    <div>
      <div className={styles.Graph} style={{ marginBottom: "0.5em", marginTop:"1em", display:"flex"}}>
        <span style={{ textAlign: "left", width: "200px", marginLeft: "1em" }}>
          {name}
        </span>
        <div className="btn-group">
          <button
            className="button-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              paddingTop: "0.4em",
              paddingBottom: "0.4em",
              marginTop: "0.25em",
              marginBottom: "0.25em",
              marginLeft: "48em",

            }}
          >
            <span style={{ fontSize: "1.5em" }}>&#x22EE;</span>
          </button>
          <ul className="dropdown-menu"></ul>
        </div>
      </div>
    </div>
  );
}

export default Graph;
