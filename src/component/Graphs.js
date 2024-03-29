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
  const [ssidMonitor, setSsidMonitor] = React.useState([]);
  const [selectedMetric, setSelectedMetric] = React.useState([
    ["TxPower", true],
    ["Signal", true],
    ["Noise", true],
    ["BitRate", true],
    ["RTT", true],
  ]);
  const [simulationDataApp, setSimulationDataApp] = React.useState(null);
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
  },{
    onError: (error) => {alert(error.response.data.detail);}
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
    // console.log(data);
    return data;
  };

  function isNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }

  const transformDataApp = (data) => {
    let simulationDataApp1 = {
      ssid: [],
      nodes: [],
      DataRateWeb: [],
      DataRateFile: [],
      Latency: [],
      PacketLoss: [],
    };
    let simulationDataApp2 = {
      ssid: [],
      nodes: [],
      DataRateWeb: [],
      DataRateFile: [],
      Latency: [],
      PacketLoss: [],
    };

    let data1 = data.udp_deterministic_server_data_monitored_from_client;
    let maxDataLength1 = 0;
    let startTime1 = Infinity;

    let data2 = data.udp_deterministic_client_data_monitored_from_server;
    let maxDataLength2 = 0;
    let startTime2 = Infinity;

    let ssidMonitor = [];

    var colorIndex = 0;

    Object.entries(data1).map(([key, value]) => {
      let nodes = [];
      Object.entries(value).map(([key2, value2]) => {
        simulationDataApp1.nodes.push(key2);
        simulationDataApp2.nodes.push(key2);
        nodes.push({ node: key2, color: colors[colorIndex], checked: true });
        colorIndex += 1;
      });
      ssidMonitor.push({ ssid: key, checked: true, nodes: nodes });
      simulationDataApp1.ssid.push(key);
      simulationDataApp2.ssid.push(key);
    });
    setSsidMonitor(ssidMonitor);

    let alertmsg = "";
    Object.entries(data1).map(([key, value]) => {
      Object.entries(value).map(([key2, value2]) => {
        Object.entries(value2).map(([key3, value3]) => {
          if (value3.length === 0) {
            alertmsg =
              alertmsg +
              "No data from " +
              key2 +
              " in " +
              key +
              "\n" +
              "Please try again later\n";
            return;
          }
          if (value3.length > maxDataLength1) {
            maxDataLength1 = value3.length;
          }
          if (value3[0][0] < startTime1) {
            startTime1 = value3[0][0];
          }
        });
      });
    });

    if (alertmsg !== "" && !hasShownAlert) {
      alert(alertmsg);
      setHasShownAlert(true);
    }

    Object.entries(data2).map(([key, value]) => {
      Object.entries(value).map(([key2, value2]) => {
        Object.entries(value2).map(([key3, value3]) => {
          if (value3.length > maxDataLength2) {
            maxDataLength2 = value3.length;
          }
          if (value3[0][0] < startTime2) {
            startTime2 = value3[0][0];
          }
        });
      });
    });

    if (startTime1 === Infinity) {
      startTime1 = startTime2;
    }
    if (startTime2 === Infinity) {
      startTime2 = startTime1;
    }

    // setTimeZone
    startTime1 = new Date(startTime1 * 1000).toISOString().slice(11, -5);
    startTime2 = new Date(startTime2 * 1000).toISOString().slice(11, -5);

    // startTime1 = new Date(startTime1 * 1000 + 25200*1000).toISOString().slice(11, -5);
    // startTime2 = new Date(startTime2 * 1000 + 25200*1000).toISOString().slice(11, -5);

    for (let i = 0; i < maxDataLength1; i++) {
      simulationDataApp1.DataRateWeb.push({ timeStamp: startTime1 });
      simulationDataApp1.DataRateFile.push({ timeStamp: startTime1 });
      simulationDataApp1.Latency.push({ timeStamp: startTime1 });
      simulationDataApp1.PacketLoss.push({ timeStamp: startTime1 });
      let parts = startTime1.split(":");
      let date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
      date.setSeconds(date.getSeconds() + 1);
      startTime1 = date.toTimeString().split(" ")[0];
    }
    for (let i = 0; i < maxDataLength2; i++) {
      simulationDataApp2.DataRateWeb.push({ timeStamp: startTime2 });
      simulationDataApp2.DataRateFile.push({ timeStamp: startTime2 });
      simulationDataApp2.Latency.push({ timeStamp: startTime2 });
      simulationDataApp2.PacketLoss.push({ timeStamp: startTime2 });
      let parts = startTime2.split(":");
      let date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
      date.setSeconds(date.getSeconds() + 1);
      startTime2 = date.toTimeString().split(" ")[0];
    }

    Object.entries(data1).map(([ssid, value]) => {
      Object.entries(value).map(([node, value2]) => {
        Object.entries(value2).map(([metric, value3]) => {
          if (metric === "lost_count") {
            for (let i = 0; i < maxDataLength1; i++) {
              if (i < value3.length) {
                if (isNumber(value3[i][1])) {
                  simulationDataApp1.PacketLoss[i][node] = Number(value3[i][1]);
                }else{
                  simulationDataApp1.PacketLoss[i][node] = undefined;
                }
              } else {
                simulationDataApp1.PacketLoss[i][node] = 0;
              }
            }
          }
          if (metric === "average_latency") {
            for (let i = 0; i < maxDataLength1; i++) {
              if (i < value3.length) {
                if (isNumber(value3[i][1])){
                  simulationDataApp1.Latency[i][node] = Number(value3[i][1]);
                }else{
                  simulationDataApp1.Latency[i][node] = undefined;
                }
              } else {
                simulationDataApp1.Latency[i][node] = 0;
              }
            }
          }
          if (metric === "file_average_data_rates") {
            for (let i = 0; i < maxDataLength1; i++) {
              if (i < value3.length) {
                if (isNumber(value3[i][1])){
                  simulationDataApp1.DataRateFile[i][node] = Number(value3[i][1]/1000);
                }else{
                  simulationDataApp1.DataRateFile[i][node] = undefined;
                }
              } else {
                simulationDataApp1.DataRateFile[i][node] = 0;
              }
            }
          }
          if (metric === "web_average_data_rates") {
            for (let i = 0; i < maxDataLength1; i++) {
              if (i < value3.length) {
                if(isNumber(value3[i][1])){
                  simulationDataApp1.DataRateWeb[i][node] = Number(value3[i][1]/1000);
                }else{
                  simulationDataApp1.DataRateWeb[i][node] = undefined;
                }
              } else {
                simulationDataApp1.DataRateWeb[i][node] = 0;
              }
            }
          }
        });
      });
    });
    Object.entries(data2).map(([ssid, value]) => {
      Object.entries(value).map(([node, value2]) => {
        Object.entries(value2).map(([metric, value3]) => {
          if (metric === "lost_count") {
            for (let i = 0; i < maxDataLength2; i++) {
              if (i < value3.length) {
                if(isNumber(value3[i][1])){
                  simulationDataApp2.PacketLoss[i][node] = Number(value3[i][1]);
                }else{
                  simulationDataApp2.PacketLoss[i][node] = undefined;
                }
              } else {
                simulationDataApp2.PacketLoss[i][node] = 0;
              }
            }
          }
          if (metric === "average_latency") {
            for (let i = 0; i < maxDataLength2; i++) {
              if (i < value3.length) {
                if(isNumber(value3[i][1])){
                  simulationDataApp2.Latency[i][node] = Number(value3[i][1]);
                }else{
                  simulationDataApp2.Latency[i][node] = undefined;
                }
              } else {
                simulationDataApp2.Latency[i][node] = 0;
              }
            }
          }
          if (metric === "file_average_data_rates") {
            for (let i = 0; i < maxDataLength2; i++) {
              if (i < value3.length) {
                if(isNumber(value3[i][1])){
                  simulationDataApp2.DataRateFile[i][node] = Number(value3[i][1]/1000);
                }else{
                  simulationDataApp2.DataRateFile[i][node] = undefined;
                }
              } else {
                simulationDataApp2.DataRateFile[i][node] = 0;
              }
            }
          }
          if (metric === "web_average_data_rates") {
            for (let i = 0; i < maxDataLength2; i++) {
              if (i < value3.length) {
                if(isNumber(value3[i][1])){
                  simulationDataApp2.DataRateWeb[i][node] = Number(value3[i][1]/1000);
                }else{
                  simulationDataApp2.DataRateWeb[i][node] = undefined;
                }
              } else {
                simulationDataApp2.DataRateWeb[i][node] = 0;
              }
            }
          }
        });
      });
    });
    // console.log({
    //   serverMonitoredByClient: simulationDataApp1,
    //   clientMonitoredByServer: simulationDataApp2,
    // });
    setSimulationDataApp({
      serverMonitoredByClient: simulationDataApp1,
      clientMonitoredByServer: simulationDataApp2,
    });
  };

  const transformData = (loadGraphDetailData) => {
    let simulationData = {
      nodes: [],
      TxPower: [],
      Signal: [],
      Noise: [],
      BitRate: [],
      RTT: [],
    };
    let maxDataLength = 0;
    let startTime = Infinity;
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

    // setTimeZone
    startTime = new Date(startTime * 1000).toISOString().slice(11, -5);
    // startTime = new Date(startTime * 1000 + 25200*1000).toISOString().slice(11, -5);
    
    for (let i = 0; i < maxDataLength; i++) {
      simulationData.TxPower.push({ timeStamp: startTime });
      simulationData.Signal.push({ timeStamp: startTime });
      simulationData.Noise.push({ timeStamp: startTime });
      simulationData.BitRate.push({ timeStamp: startTime });
      simulationData.RTT.push({ timeStamp: startTime });
      let parts = startTime.split(":");
      let date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
      date.setSeconds(date.getSeconds() + 1);
      startTime = date.toTimeString().split(" ")[0];
    }
    for (let ip in loadGraphDetailData.simulation_data) {
      var ipLength = loadGraphDetailData.simulation_data[ip]["Tx-Power"].length;
      for (let i = 0; i < maxDataLength; i++) {
        if (i < ipLength) {
          if (isNumber(loadGraphDetailData.simulation_data[ip]["Tx-Power"][i][1])){
            simulationData.TxPower[i][ip] =
            Number(loadGraphDetailData.simulation_data[ip]["Tx-Power"][i][1]);
          }else{
            simulationData.TxPower[i][ip] = undefined;
          }
          if (isNumber(loadGraphDetailData.simulation_data[ip]["Signal"][i][1])){
            simulationData.Signal[i][ip] =
            Number(loadGraphDetailData.simulation_data[ip]["Signal"][i][1]);
          }else{
            simulationData.Signal[i][ip] = undefined;
          }
          if (isNumber(loadGraphDetailData.simulation_data[ip]["Noise"][i][1])){
            simulationData.Noise[i][ip] =
            Number(loadGraphDetailData.simulation_data[ip]["Noise"][i][1]);
          }else{
            simulationData.Noise[i][ip] = undefined;
          }
          if (isNumber(loadGraphDetailData.simulation_data[ip]["BitRate"][i][1])){ 
            simulationData.BitRate[i][ip] =
            Number(loadGraphDetailData.simulation_data[ip]["BitRate"][i][1]);
          }else{
            simulationData.BitRate[i][ip] = undefined;
          }
          if (loadGraphDetailData.simulation_data[ip].hasOwnProperty('ping_RTT') && isNumber(loadGraphDetailData.simulation_data[ip]["ping_RTT"][i][1])){
            console.log(ip)
            simulationData.RTT[i][ip] =
            Number(loadGraphDetailData.simulation_data[ip]["ping_RTT"][i][1]);
          }else{
            console.log("+++"+ip)
            simulationData.RTT[i][ip] = undefined;
          }
        } else {
          simulationData.TxPower[i][ip] = undefined;
          simulationData.Signal[i][ip] = undefined;
          simulationData.Noise[i][ip] = undefined;
          simulationData.BitRate[i][ip] = undefined;
          simulationData.RTT[i][ip] = undefined;
        }
      }
    }
    console.log(simulationData)
    setSimulationData(simulationData);
  };

  const [hasShownAlert, setHasShownAlert] = React.useState(false);

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
        if (
          Object.keys(
            loadGraphDetailData.udp_deterministic_server_data_monitored_from_client
          ).length === 0
        ) {
          if (!hasShownAlert) {
            setHasShownAlert(true);
            alert("There is error occur in simulation, please try again later");
          }
          return;
        }
        transformData(loadGraphDetailData);
        transformDataApp(loadGraphDetailData);
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
              onClick={(e) => {
                loadGraphRefetch();
                e.preventDefault();
              }}
            >
              <IoSearch style={{ fontSize: "1.5em" }} />
            </button>
          </div>
          <button
            role="button"
            style={{ border: "none", background: "none", paddingLeft: "0.5em" }}
            onClick={(e) => {
              loadGraphRefetch();
              e.preventDefault();
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
        loadGraphDetailData={loadGraphDetailData}
        simulationDataApp={simulationDataApp}
        ssidMonitor={ssidMonitor}
        setSsidMonitor={setSsidMonitor}
        setHasShownAlert={setHasShownAlert}
        hasShownAlert={hasShownAlert}
      />
    </div>
  );
}

export default Graphs;
