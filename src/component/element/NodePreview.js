import React from 'react'

function NodePreview({name, ip, simulationDetail, ssid}) {
  return (
    <div>
      <div>Node Name : <span style={{paddingLeft:"1.3em"}}>{name}</span></div>
      <div>IP address: <span style={{paddingLeft:"2em"}}>{ip}</span></div>
      <div>SSID : <span style={{paddingLeft:"4.4em"}}>{ssid}</span></div>
    </div>
  )
}

export default NodePreview