import React from "react";
import styles from "./Node.module.css";
import preview from "../img/preview.svg";
import edit from "../img/edit.svg";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import NodePopUpEdit from "./element/NodePopUpEdit";
import { useState } from "react";

function Node({
  name,
  ip,
  mode,
  ssid,
  id,
  selectedScenario,
  refetchLoadNode,
  setEditNodeId,
  refetchLoadNodeDetail,
  editButonClicked,
  setEditButtonClicked
}) {
  const deleteNode = useMutation(
    () => {
      return axios.delete(
        `http://localhost:8000/scenario/${selectedScenario}/node/${id}`
      );
    },
    {
      onSuccess: () => {
        refetchLoadNode();
      },
    }
  );

  return (
    <div>
      <div className={styles.Node} style={{ marginBottom: "0.5em" }}>
        <span style={{ textAlign: "left", width: "200px", marginLeft: "1em" }}>
          {name}
        </span>
        <span>{ip}</span>
        <span>{mode}</span>
        <span>{ssid}</span>
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
              marginLeft: "8em",
            }}
            onClick={() => {
              setEditNodeId(id);
            }}
          >
            <span style={{ fontSize: "1.5em" }}>&#x22EE;</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                <div>
                  <svg
                    style={{ width: "20", height: "20", marginRight: "0.5em" }}
                  >
                    <image href={preview} width="20" height="20" />
                  </svg>
                  Preview
                </div>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  refetchLoadNodeDetail().then(() => {setEditButtonClicked(!editButonClicked)});
                }}
                data-bs-toggle="modal"
                data-bs-target="#NodePopUpEdit"
              >
                <div>
                  <svg
                    style={{ width: "20", height: "20", marginRight: "0.5em" }}
                  >
                    <image href={edit} width="20" height="20" />
                  </svg>
                  edit
                </div>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ color: "#c30022" }}
                onClick={() => {
                  deleteNode.mutate();
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
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Node;
