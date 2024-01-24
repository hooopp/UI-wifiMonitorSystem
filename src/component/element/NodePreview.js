import React from "react";

function NodePreview({ name, ip, simulationDetail, ssid, nodeMode }) {
  const ClientType = () => {
    if (simulationDetail.simulation_type === "deterministic") {
      return (
        <>
          <tr>
            <td>simulation type</td>
            <td>Deterministic</td>
          </tr>
          <tr>
            <td>average interval time</td>
            <td>{simulationDetail.average_interval_time.toLocaleString()} msec</td>
          </tr>
          <tr>
            <td>average packet size</td>
            <td>{simulationDetail.average_packet_size.toLocaleString()} MB</td>
          </tr>
          <tr>
            <td>time out</td>
            <td>{simulationDetail.timeout.toLocaleString()} msec</td>
          </tr>
        </>
      );
    } else if (simulationDetail.simulation_type === "web_application") {
      return (
        <>
          <tr>
            <td>simulation type</td>
            <td>Web</td>
          </tr>
          <tr>
            <td>average interval time</td>
            <td>{simulationDetail.average_interval_time.toLocaleString()} msec</td>
          </tr>
          <tr>
            <td>average packet size</td>
            <td>{simulationDetail.average_packet_size.toLocaleString()} MB</td>
          </tr>
          <tr>
            <td>average new packet size</td>
            <td>{simulationDetail.average_new_page_packet_size.toLocaleString()} MB</td>
          </tr>
          <tr>
            <td>propability of load new page</td>
            <td>{simulationDetail.probability_of_load_new_page.toLocaleString()}</td>
          </tr>
          <tr>
            <td>time out</td>
            <td>{simulationDetail.timeout.toLocaleString()} msec</td>
          </tr>
        </>
      )
    } else {
      return (
        <>
          <tr>
            <td>simulation type</td>
            <td>File</td>
          </tr>
          <tr>
            <td>average packet size</td>
            <td>{simulationDetail.average_packet_size.toLocaleString()} MB</td>
          </tr>
          <tr>
            <td>time out</td>
            <td>{simulationDetail.timeout.toLocaleString()} msec</td>
          </tr>
        </>
      )
    }
  };

  return (
    <div style={{
      borderRadius: "10px",
      padding: "10px",
      border: "1px solid #dee2e6",
    }}>
      <table className="table">
        <tbody>
          <tr>
            <td>node name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>ip</td>
            <td>{ip}</td>
          </tr>
          <tr>
            <td>ssid</td>
            <td>{ssid}</td>
          </tr>
          <tr>
            <td>mode</td>
            <td>{nodeMode === "client" ? "Client" : "AP"}</td>
          </tr>
          {nodeMode === "client" ? ClientType() : ""}
        </tbody>
      </table>
    </div>
  );
}

export default NodePreview;
