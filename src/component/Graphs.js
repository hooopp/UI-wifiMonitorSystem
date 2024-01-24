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
import GNF from "../img/GNF.svg";
import { set } from "date-fns";

function Graphs({ selectedScenario }) {
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedGraph, setSelectedGraph] = React.useState("");
  const [reportIsClicked, setReportIsClicked] = React.useState(false);
  const [intervalRefetch, setIntervalRefetch] = React.useState(false);
  const [simulationData, setSimulationData] = React.useState(null);
  const [listNode, setListNode] = React.useState([]);
  const [selectedMetric, setSelectedMetric] = React.useState([
    ["TxPower", true],
    ["Signal", true],
    ["Noise", true],
    ["BitRate", true],
  ]);
  const colors = [
    "#fd7f6f",
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7",
  ];

  const cancelSimulation = useMutation(() => {
    return axios.post(
      `http://127.0.0.1:8000/scenario/${selectedScenario}/simulation/${selectedGraph}/cancel`
    );
  });

  const loadGraph = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/scenario/${selectedScenario}/simulation?page_size=9&page=${page}${
        searchValue && `&search=${searchValue}`
      } `
    );
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

  const transformData = (loadGraphDetailData) => {
    let simulationData = {
      nodes: [],
      TxPower: [],
      Signal: [],
      Noise: [],
      BitRate: [],
    };
    let maxDataLength = 0;
    let startTime = Infinity;
    console.log(loadGraphDetailData);
    let listNode = [];
    let index = 0;
    for (let ip in loadGraphDetailData.simulation_data) {
      simulationData.nodes.push(ip);
      if (
        loadGraphDetailData.simulation_data[ip]["Tx-Power"].length >
        maxDataLength
      ) {
        maxDataLength =
          loadGraphDetailData.simulation_data[ip]["Tx-Power"].length;
      }
      if (
        loadGraphDetailData.simulation_data[ip]["Tx-Power"][0][0] < startTime
      ) {
        startTime = loadGraphDetailData.simulation_data[ip]["Tx-Power"][0][0];
      }
      listNode.push({ node: ip, color: colors[index], checked: true });
      index += 1;
    }
    setListNode(listNode);
    startTime = new Date(startTime * 1000).toISOString().slice(11, -5);
    for (let i = 0; i < maxDataLength; i++) {
      simulationData.TxPower.push({ timeStamp: startTime });
      simulationData.Signal.push({ timeStamp: startTime });
      simulationData.Noise.push({ timeStamp: startTime });
      simulationData.BitRate.push({ timeStamp: startTime });
      let parts = startTime.split(":");
      let date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
      date.setSeconds(date.getSeconds() + 1);
      startTime = date.toTimeString().split(" ")[0];
    }
    for (let ip in loadGraphDetailData.simulation_data) {
      var ipLength = loadGraphDetailData.simulation_data[ip]["Tx-Power"].length;
      for (let i = 0; i < maxDataLength; i++) {
        if (i < ipLength) {
          simulationData.TxPower[i][ip] =
            loadGraphDetailData.simulation_data[ip]["Tx-Power"][i][1];
          simulationData.Signal[i][ip] =
            loadGraphDetailData.simulation_data[ip]["Signal"][i][1];
          simulationData.Noise[i][ip] =
            loadGraphDetailData.simulation_data[ip]["Noise"][i][1];
          simulationData.BitRate[i][ip] =
            loadGraphDetailData.simulation_data[ip]["BitRate"][i][1];
        } else {
          simulationData.TxPower[i][ip] = 0;
          simulationData.Signal[i][ip] = 0;
          simulationData.Noise[i][ip] = 0;
          simulationData.BitRate[i][ip] = 0;
        }
      }
    }
    console.log(simulationData);
    setSimulationData(simulationData);
  };

  const unreal = {
    id: 13,
    state: "finished",
    simulation_data: {
      "192.168.1.1": {
        "Tx-Power": [
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
        ],
        Signal: [
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
        ],
        Noise: [
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
        ],
        BitRate: [
          [1704356722.8393524, "5"],
          [1704356724.1088338, "6"],
          [1704356715.2266462, "6"],
          [1704356716.4962032, "3"],
          [1704356717.7641122, "4"],
          [1704356719.033403, "7"],
          [1704356720.3017914, "8"],
          [1704356721.5713918, "5"],
        ],
      },
      "192.168.1.2": {
        "Tx-Power": [
          [1704356715.2233462, "7"],
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
          [1704356721.575918, "6"],
        ],
        Signal: [
          [1704356721.575918, "6"],
          [1704356715.2233462, "7"],
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
        ],
        Noise: [
          [1704356715.2233462, "7"],
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
          [1704356721.575918, "6"],
        ],
        BitRate: [
          [1704356716.4952032, "5"],
          [1704356717.7841122, "6"],
          [1704356719.033403, "7"],
          [1704356720.3012914, "5"],
          [1704356721.575918, "6"],
          [1704356715.2233462, "7"],
        ],
      },
    },
    scenario_id: 2,
    scenario_snapshot: {
      "GalaxyNote10+25bc": {
        is_target_ap: true,
        aps: {},
        clients: {
          "192.168.1.1": {
            simulation_type: "deterministic",
            timeout: 300,
            average_interval_time: 10,
            average_packet_size: 128,
            alias_name: "w9",
          },
        },
      },
    },
    title: "test13",
    state_message:
      "192.168.1.1 : {'message': 'wifi is connected'}\nthis_device: connected to GalaxyNote10+25bc with ip_address 192.168.86.50\n192.168.1.1 : {'message': 'simulation task has been scheduled'}\nw9 deterministic_client 1704356715.2606883: hello change from term to INT\nthis_device deterministic_server 1704356715.0653534: hello change from term to INT\r\nthis_device deterministic_server 1704356715.0663533: server start at 0.0.0.0:8888\r\n[Errno 110] Connect call failed ('192.168.86.50', 8888)\nw9 deterministic_client 1704356847.4718745: \n\nexited\n\n\nthis_device deterministic_server 1704357020.093951: Closing server socket.\r\nthis_device deterministic_server 1704357020.094738: Cancel all pending tasks(handle_client tasks) for exit.\r\nWait for all tasks to terminate: [<coroutine object IocpProactor.accept.<locals>.accept_coro at 0x000002395AB7CF20>]\r\nthis_device deterministic_server 1704357020.0957787: All coroutines completed. Exiting.\r\nthis_device deterministic_server 1704357020.0977912: \r\n\r\nexited\r\n\r\n\r\n",
    created_at: "2024-01-04T15:25:05.881919",
  };

  const {
    data: loadGraphDetailData,
    status: loadGraphDetailStatus,
    refetch: loadGraphDetailRefetch,
  } = useQuery("GraphDetail", loadGraphDetail, {
    enabled: intervalRefetch,
    refetchInterval: intervalRefetch ? 1000 : false,
    onSuccess: () => {
      if (
        loadGraphDetailData &&
        loadGraphDetailData.state === "finished" &&
        loadGraphDetailData.id === selectedGraph
      ) {
        setIntervalRefetch(false);
        transformData(loadGraphDetailData);
      }
    },
  });

  useEffect(() => {
    loadGraphRefetch().then(({ data: loadGraphData }) => {
      if (loadGraphData.length === 0 && page > 1) {
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
      {loadGraphData && loadGraphData.length !== 0 ? (
        loadGraphData.map((graph, index) => (
          <Graph
            key={index}
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
            cancelSimulation={cancelSimulation}
            setIntervalRefetch={setIntervalRefetch}
          />
        ))
      ) : (
        <div
          className="logo-container"
          style={{ marginLeft: "15em", marginTop: "4em" }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500">
            <image href={GNF} x="0" y="0" width="100%" height="100%" />
          </svg>
        </div>
      )}
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
      <ViewGraphPopUp
        reportIsClicked={reportIsClicked}
        real={simulationData}
        loadGraphRefetch={loadGraphRefetch}
        setIntervalRefetch={setIntervalRefetch}
        simulationData={simulationData}
        setSimulationData={setSimulationData}
        listNode={listNode}
        setListNode={setListNode}
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
      />
    </div>
  );
}

export default Graphs;
