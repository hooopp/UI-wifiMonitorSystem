import React from "react";

function NodePreview({ name, ip, simulationDetail, ssid, nodeMode }) {
  const nodeModeFunction = () => {
    if (nodeMode === "client") {
      if (simulationDetail.simulation_type === "deterministic") {
        return <div>
          <div>
            <span>Simulation Type : </span>
            <span style={{marginLeft:"7.2em"}}>Deterministic</span>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Average Interval Time : </div>
            <div style={{position:"absolute",marginLeft:"15.2em"}}>{simulationDetail.average_interval_time.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>msec</div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Average Packet Size : </div>
            <div style={{position:"absolute",marginLeft:"15.2em"}}>{simulationDetail.average_packet_size.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>MB</div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Time Out : </div>
            <div style={{position:"absolute",marginLeft:"15.2em"}}>{simulationDetail.timeout.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>sec</div>
          </div>
        </div>;
      } else if (simulationDetail.simulation_type === "web_application") {
        return <div>
          <div>
            <span>Simulation Type : </span>
            <span style={{ paddingLeft: "7.1em" }}>Web</span>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Average Interval Time : </div>
            <div style={{position:"absolute", marginLeft:"15em"}}>{simulationDetail.average_interval_time.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>msec</div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Average Packet Size : </div>
            <div style={{position:"absolute", marginLeft:"15em"}}>{simulationDetail.average_packet_size.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>msec</div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Average New Packet Size : </div>
            <div style={{position:"absolute", marginLeft:"15em"}}>{simulationDetail.average_new_page_packet_size.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>MB</div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Probablilty of Load New Page : </div>
            <div style={{position:"absolute", marginLeft:"15em"}}>{simulationDetail.probability_of_load_new_page.toLocaleString()}</div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Time Out : </div>
            <div style={{position:"absolute", marginLeft:"15em"}}>{simulationDetail.timeout.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>sec</div>
          </div>
        </div>;
      } else {
        return <div>
          <div>
            <span>Simulation Type : </span>
            <span style={{ paddingLeft: "7.1em" }}>File</span>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Average Packet Size : </div>
            <div style={{position:"absolute", marginLeft:"15em"}}>{simulationDetail.average_packet_size.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>MB</div>
          </div>
          <div style={{display:"flex"}}>
            <div style={{marginLeft:"0em"}}>Time Out : </div>
            <div style={{position:"absolute", marginLeft:"15em"}}>{simulationDetail.timeout.toLocaleString()}</div>
            <div style={{position:"absolute", marginLeft:"25em"}}>sec</div>
          </div>
        </div>;
      }
    }
  };
  return (
    <div>
      <div>
        Node Name : <span style={{ marginLeft: "9.1em" }}>{name}</span>
      </div>
      <div>
        IP address: <span style={{ marginLeft: "9.7em" }}>{ip}</span>
      </div>
      <div>
        SSID : <span style={{ marginLeft: "12.1em" }}>{ssid}</span>
      </div>
      <div>
        Mode :{" "}
        <span style={{ paddingLeft: "11.8em" }}>
          {nodeMode === "client" ? "Client" : "AP"}
        </span>
      </div>
      {nodeModeFunction()}
    </div>
  );
}

export default NodePreview;
