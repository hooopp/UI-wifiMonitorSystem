import React from 'react'
import styles from './Node.module.css'
import preview from '../img/preview.svg'
import edit from '../img/edit.svg'
import bin from '../img/bin.svg';

function Node(props) {
  return (
    <div>
        <div className={styles.Node} style={{marginBottom:"0.5em"}}>
            <span style={{textAlign: "left",width:"200px"}}>{props.data.name}</span>
            <span>{props.data.ip}</span>
            <span>{props.data.mode}</span>
            <div className="btn-group" style={{marginLeft:"11em"}}>
                <button className="button-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{paddingTop:"0.4em", paddingBottom:"0.4em", marginTop:"0.25em", marginBottom:"0.25em"}}>
                    <span style={{fontSize:"1.5em"}}>&#x22EE;</span>
                </button>
                <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">
                  <div>
                    <svg style={{width:"20",height:"20",marginRight:"0.5em"}}>
                      <image href={preview} width="20" height="20" />
                    </svg>
                    Preview
                  </div>
                </a></li>
                <li><a className="dropdown-item" href="#">
                  <div>
                    <svg style={{width:"20",height:"20",marginRight:"0.5em"}}>
                      <image href={edit} width="20" height="20" />
                    </svg>
                    Preview
                  </div>
                </a></li>
                <li><a className="dropdown-item" href="#" style={{color:"red"}}>
                  <div>
                    <svg style={{width:"20",height:"20",marginRight:"0.5em"}}>
                      <image href={bin} width="20" height="20" />
                    </svg>
                    Delete
                  </div>
                </a></li>
                </ul>
            </div>  
        </div>
    </div>
  )
}

export default Node