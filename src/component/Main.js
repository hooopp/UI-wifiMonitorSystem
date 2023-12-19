import React from 'react'
import { useState } from 'react';
import '../bootstrap/js/bootstrap.js';
import '../bootstrap/css/bootstrap.min.css';
import styles from './Main.module.css'
import Detail from './Detail'
import Nodes from './Nodes'
import Graph from './Graph'

function Main() {
  const [mode, setMode] = useState(0);
  return (
    <div className={styles.Main} >
        <div className={styles.Nav} style={{backgroundColor:"white"}}>
            {/* header */}
            <div className= {styles.Header}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold'}}>BanA</span>
                <div>
                    <button className="button-30" role="button"><span>Preview All</span></button>
                    <button className="button-30" role="button" style={{marginLeft:"1em"}}><span>Run</span></button>
                </div>
            </div>
            {/* navbar */}
            <ul className="nav nav-underline" >
                <li className="nav-item">
                    <a className={`nav-link ${mode === 0 ? 'active' : ''}`} href="#" style={{color:"black"}} onClick={()=>{setMode(0)}}>Detail</a>
                </li>
                <li className="nav-item" >
                    <a className={`nav-link ${mode === 1 ? 'active' : ''}`} href="#" style={{color:"black"}} onClick={()=>{setMode(1)}}>Nodes</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${mode === 2 ? 'active' : ''}`} href="#" style={{color:"black"}} onClick={()=>{setMode(2)}}>Graph</a>
                </li>
            </ul>
        </div>
        <div className={styles.Body} style={{backgroundColor:"white"}}>
            {mode===0 && <Detail />}
            {mode===1 && <Nodes />}
            {mode===2 && <Graph />}
        </div>
    </div>
  )
}

export default Main