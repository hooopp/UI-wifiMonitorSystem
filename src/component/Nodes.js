import React from 'react';
import Node from './Node'

function Nodes() {
  return (
    <div>
      <div className='listNode'>
        <div className="list-group" style={{paddingBottom:"0.5em", paddingTop:"1em"}}>
          <button type="button" className="list-group-item list-group-item-action" style={{borderRadius: "10px", textAlign: "center", color:"grey", backgroundColor:""}}>
              <span style={{ fontWeight: "bold" }}>+ </span>
              <span style={{ fontSize: "1em"}}>Add Node</span>
          </button>
        </div>
        <Node data={{name:"node1",ip:"192.168.0.1",mode:"Server"}}/>
        <Node data={{name:"node2",ip:"192.168.0.2",mode:"Client"}}/>
        <Node data={{name:"node3",ip:"192.168.0.3",mode:"Client"}}/>
      </div>
    </div>
  )
}

export default Nodes