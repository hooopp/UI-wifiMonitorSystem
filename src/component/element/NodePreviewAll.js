import React from "react";

function NodePreviewAll({ name, ip, simulationDetail, nodeMode }) {
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
            <td>
              {simulationDetail.average_interval_time.toLocaleString()} msec
            </td>
          </tr>
          <tr>
            <td>average packet size</td>
            <td>{simulationDetail.average_packet_size.toLocaleString()} Byte</td>
          </tr>
          <tr>
            <td>time out</td>
            <td>{simulationDetail.timeout.toLocaleString()} sec</td>
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
            <td>
              {simulationDetail.average_interval_time.toLocaleString()} msec
            </td>
          </tr>
          <tr>
            <td>average packet size</td>
            <td>{simulationDetail.average_packet_size.toLocaleString()} Byte</td>
          </tr>
          {/* <tr>
            <td>average new packet size</td>
            <td>
              {simulationDetail.average_new_page_packet_size.toLocaleString()}{" "}
              Byte
            </td>
          </tr>
          <tr>
            <td>propability of load new page</td>
            <td>
              {simulationDetail.probability_of_load_new_page.toLocaleString()}
            </td>
          </tr> */}
          <tr>
            <td>time out</td>
            <td>{simulationDetail.timeout.toLocaleString()} sec</td>
          </tr>
        </>
      );
    } else {
      return (
        <>
          <tr>
            <td>simulation type</td>
            <td>File</td>
          </tr>
          <tr>
            <td>average packet size</td>
            <td>{simulationDetail.average_packet_size.toLocaleString()} Byte</td>
          </tr>
          <tr>
            <td>time out</td>
            <td>{simulationDetail.timeout.toLocaleString()} sec</td>
          </tr>
        </>
      );
    }
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "10px",
        border: "1px solid #dee2e6",
        marginBottom: "0.5em",
      }}
    >
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
          {nodeMode === "client" ? (
            ClientType()
          ) : (
            <>
              <tr>
                <td>wi-fi frequency</td>
                <td>{simulationDetail.radio === "5G" ? "5GHz" : "2.4GHz"}</td>
              </tr>
              <tr>
                <td>simulation types</td>
                <td>
                  {simulationDetail.sever_types.map(type => {
                    if (type === "deterministic") {
                      return <div>- Deterministic</div>;
                    }else if (type === "web_application") {
                      return <div>- Web</div>;
                    }else {
                      return <div>- File</div>;
                    }
                  })}
                </td>
              </tr>
              <tr>
                <td>time out</td>
                <td>{simulationDetail.timeout} sec</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NodePreviewAll;
