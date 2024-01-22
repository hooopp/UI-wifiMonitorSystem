import React from "react";
import styles from "./Scenario.module.css";
import dup from "../img/dup.svg";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from "react-query";

function Scenario({
  data,
  refetchLoadScenario,
  setSelectedScenario,
  loadScenarioData,
  page,
  setPage,
  selectedScenario,
}) {
  const deleteScenario = useMutation(
    () => {
      return axios.delete(`http://127.0.0.1:8000/scenario/${data.id}`);
    },
    {
      onSuccess: () => {
        refetchLoadScenario().then(() => {
          if (loadScenarioData.length === 1) {
            setPage(page - 1);
          }
        });
      },
    }
  );

  const deleteFuction = () => {
    if (selectedScenario == data.id) {
      console.log("delete");
      setSelectedScenario("");
    }
    return deleteScenario.mutate();
  };

  return (
    <div>
      <li
        className="list-group-item"
        style={{
          width: "23em",
          borderRadius: "50px",
          margin: "0.5em 0em 0em 0em ",
          padding: "0em 1em",
        }}
      >
        <div className={styles.inside}>
          <div
            className="scenarioName"
            style={{ margin: "auto", marginLeft: "0em" }}
          >
            <a
              href="#"
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => {
                setSelectedScenario(data.id);
              }}
            >
              {data.name.length > 25 ? `${data.name.substring(0, 25)}...` : data.name}
            </a>
          </div>
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
              }}
            >
              <span style={{ fontSize: "1.5em" }}>&#x22EE;</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className={`${styles.dropdownButton} dropdown-item`}
                  href="#"
                  style={{ color: "#333" }}
                >
                  <div>
                    <svg
                      style={{
                        width: "20",
                        height: "20",
                        marginRight: "0.5em",
                      }}
                    >
                      <image href={dup} width="20" height="20" />
                    </svg>
                    Duplicate
                  </div>
                </button>
              </li>
              <li>
                <button
                  className={`${styles.dropdownButton} dropdown-item`}
                  href="#"
                  style={{ color: "#c30022" }}
                  onClick={() => {
                    deleteFuction();
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
      </li>
    </div>
  );
}

export default Scenario;
