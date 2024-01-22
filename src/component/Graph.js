import React from "react";
import styles from "./Graph.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "axios";
import { TbReportSearch } from "react-icons/tb";
import { TiCancel } from "react-icons/ti";

function Graph({
  name,
  createdTime,
  status,
  id,
  selectedScenario,
  loadGraphRefetch,
  loadGraphData,
  page,
  setPage,
  setSelectedGraph,
  loadGraphDetailRefetch,
  setReportIsClicked,
  reportIsClicked,
  cancelSimulation,
}) {
  const deleteGraph = useMutation(
    () => {
      return axios.delete(
        `http://localhost:8000/scenario/${selectedScenario}/simulation/${id}`
      );
    },
    {
      onSuccess: () => {
        loadGraphRefetch().then(() => {
          if (loadGraphData.length === 1) {
            setPage(page - 1);
          }
        });
      },
    }
  );
  return (
    <div>
      <div
        className={styles.Graph}
        style={{ marginBottom: "0.5em", marginTop: "1em" }}
      >
        <div style={{ textAlign: "left", width: "200px", marginLeft: "1em" }}>
          {name}
        </div>
        <div style={{ width: "250px" }}>{createdTime}</div>
        <div style={{ width: "250px" }}>{status}</div>
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
              marginLeft: "6.5em",
            }}
            onClick={() => {
              setSelectedGraph(id);
            }}
          >
            <span style={{ fontSize: "1.5em" }}>&#x22EE;</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className={`${styles.dropdownButton} dropdown-item`}
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#ViewGraphPopUp"
                onClick={() => {
                  loadGraphDetailRefetch().then(() => {
                    setReportIsClicked(!reportIsClicked);
                  });
                }}
              >
                <div>
                  <TbReportSearch
                    style={{
                      marginRight: "0.3em",
                      marginLeft: "0.1em",
                      marginBottom: "0.2em",
                      fontSize: "1.25em",
                    }}
                  />
                  <span>Report</span>
                </div>
              </button>
              <button
                className={`${styles.dropdownButton} dropdown-item`}
                href="#"
                onClick={() => {cancelSimulation.mutate()}}
              >
                <div>
                  <TiCancel 
                    style={{
                      marginRight: "0.3em",
                      marginLeft: "0.1em",
                      marginBottom: "0.2em",
                      fontSize: "1.25em",
                      color: "orange"
                    }}
                  />
                  <span style={{color:"orange"}}>Stop simulation</span>
                </div>
              </button>
              <button
                className={`${styles.dropdownButton} dropdown-item`}
                href="#"
                style={{ color: "#c30022" }}
                onClick={() => {
                  deleteGraph.mutate();
                }}
              >
                <div>
                  <FaTrashAlt
                    style={{
                      marginRight: "0.5em",
                      marginLeft: "0.2em",
                      marginBottom: "0.2em",
                    }}
                  />
                  <span>Delete</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Graph;
