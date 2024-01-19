import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import styles from "./Graphs.module.css";
import Graph from "./Graph";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { BiCommentDetail } from "react-icons/bi";
import ViewGraphPopUp from "./element/ViewGraphPopUp";

function Graphs({ selectedScenario }) {
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedGraph, setSelectedGraph] = React.useState("");
  const [reportIsClicked, setReportIsClicked] = React.useState(false);

  const loadGraph = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/simulation?page_size=9&page=${page}${
        searchValue && `&search=${searchValue}`
      } `
    );
    if (data.length === 0) {
      setPage(page - 1);
    }
    return data;
  };

  const {
    data: loadGraphData,
    status: loadGraphStatus,
    refetch: loadGraphRefetch,
  } = useQuery("Graph", loadGraph);

  const loadGraphDetail = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/simulation/${selectedGraph}`
    );
    return data;
  };

  const {
    data: loadGraphDetailData,
    status: loadGraphDetailStatus,
    refetch: loadGraphDetailRefetch,
  } = useQuery("GraphDetail", loadGraphDetail, {enabled: false});

  useEffect(() => {
    loadGraphRefetch();
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
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
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
              onClick={() => {
                loadGraphRefetch();
              }}
            >
              <IoSearch style={{ fontSize: "1.5em" }} />
            </button>
          </div>
          <button
            role="button"
            style={{ border: "none", background: "none", paddingLeft: "0.5em" }}
            onClick={() => {
              loadGraphRefetch();
            }}
          >
            <IoMdRefresh style={{ fontSize: "1.5em" }} />
            refresh
          </button>
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
      {loadGraphData &&
        loadGraphData.map((graph) => (
          <Graph
            key={graph.id}
            name={graph.title}
            createdTime={graph.created_at}
            status={graph.state}
            id={graph.id}
            selectedScenario={selectedScenario}
            loadGraphRefetch={loadGraphRefetch}
            loadGraphData={loadGraphData}
            page={page}
            setPage={setPage}
            setSelectedGraph={setSelectedGraph}
            loadGraphDetailRefetch={loadGraphDetailRefetch}
            setReportIsClicked={setReportIsClicked}
            reportIsClicked={reportIsClicked}
          />
        ))}
      {/* pagination */}
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          position: "absolute",
          left: "20em",
          top: "41em",
        }}
        disabled={page === 1 ? true : false}
        onClick={() => setPage(page - 1)}
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
        onClick={() => setPage(page + 1)}
      >
        <span style={{ fontWeight: "bold" }}>Next </span>
        <FaArrowAltCircleRight style={{ fontSize: "2rem" }} />
      </button>
      {/* viewGraphPopUp */}
      <ViewGraphPopUp reportIsClicked={reportIsClicked} loadGraphDetailData={loadGraphDetailData} loadGraphRefetch={loadGraphRefetch}/>
    </div>
  );
}

export default Graphs;
