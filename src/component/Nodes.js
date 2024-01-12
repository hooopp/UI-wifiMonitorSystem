import React, { useEffect } from "react";
import Node from "./Node";
import styles from "./Nodes.module.css";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import NodePopUp from "./element/NodePopUp";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import NodePopUpEdit from "./element/NodePopUpEdit";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import NodePreview from "./element/NodePreview";

function Nodes({ selectedScenario }) {
  const [editNodeId, setEditNodeId] = useState();
  const [editButonClicked, setEditButtonClicked] = useState(false);
  const [searchVariable, setSearchVariable] = useState("");
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);

  const loadNodeDetail = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/node/${editNodeId}`
    );
    return data;
  };

  const {
    data: loadNodeDetailData,
    status: loadNodeDetailStatus,
    refetch: refetchLoadNodeDetail,
  } = useQuery("nodeDetail", loadNodeDetail, {
    enabled: false,
  });

  const loadNode = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/node?page_size=8&page=${page}${
        searchVariable ? `&search=${searchVariable}` : ""
      }`
    );
    return data;
  };

  const {
    data: loadNodeData,
    status: loadNodeStatus,
    refetch: refetchLoadNode,
  } = useQuery("node", loadNode);

  useEffect(() => {
    refetchLoadNode().then(({ data: loadScenarioData }) => {
      if (loadScenarioData.length === 0 && page > 1) {
        setPage(page - 1);
      }
    });
  }, [page]);

  return (
    <div style={{ position: "relative" }}>
      {/* searchbar */}
      <form>
        <div className="input-group" style={{ paddingTop: "0.5em" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={(e) => setSearchVariable(e.target.value)}
          />
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
              onClick={(e) => {
                e.preventDefault();
                refetchLoadNode();
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
          data-bs-toggle="modal"
          data-bs-target="#NodePopUp"
        >
          <IoMdAdd />
          <span style={{ fontSize: "1em" }}>Add Node</span>
        </button>
      </div>
      <NodePopUp
        selectedScenario={selectedScenario}
        refetchLoadNode={refetchLoadNode}
      />
      <NodePopUpEdit
        id={editNodeId}
        selectedScenario={selectedScenario}
        refetchLoadNode={refetchLoadNode}
        loadNodeDetailData={loadNodeDetailData}
        loadNodeDetailStatus={loadNodeDetailStatus}
        editButonClicked={editButonClicked}
      />
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
              setEditNodeId={setEditNodeId}
              refetchLoadNodeDetail={refetchLoadNodeDetail}
              editButonClicked={editButonClicked}
              setEditButtonClicked={setEditButtonClicked}
              page={page}
              setPage={setPage}
              loadNodeData={loadNodeData}
            />
          ))}
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            position: "absolute",
            left: "20em",
            top: "41em",
          }}
          disabled={page === 1 ? true : false}
          onClick={() => {
            setPage(page - 1);
          }}
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
            left: "35em",
            top: "41em",
          }}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <span style={{ fontWeight: "bold" }}>Next </span>
          <FaArrowAltCircleRight style={{ fontSize: "2rem" }} />
        </button>
      </div>
      <div
        className="modal fade"
        id="NodePreview"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Preview Node
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <NodePreview
                name={loadNodeDetailData ? loadNodeDetailData.alias_name : ""}
                ip={
                  loadNodeDetailData ? loadNodeDetailData.control_ip_addr : ""
                }
                simulationDetail={
                  loadNodeDetailData ? loadNodeDetailData.simulation_detail : ""
                }
                ssid={loadNodeDetailData ? loadNodeDetailData.network_ssid : ""}
                nodeMode={
                  loadNodeDetailData ? loadNodeDetailData.network_mode : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nodes;
