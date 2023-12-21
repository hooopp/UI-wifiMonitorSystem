import React from 'react'
import styles from './Detail.module.css'

function Detail() {
  return (
    <div className={styles.Detail}>
        <div>
          <label forhtml="exampleFormControlInput1" className="form-label">Scenario Name</label>
          <input type="email" className="form-control" id="exampleFormControlInput1"/>
        </div>
        <div className="mb-3" style={{marginTop:"0.5em"}}>
          <label className="form-label">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" style={{resize: "none"}}></textarea>
        </div>
        <div style={{paddingLeft:"56.7em"}}>
            <button className="button-68" role="button"><span>Edit</span></button>
        </div>
    </div>
  )
}

export default Detail