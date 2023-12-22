import React from "react";
import styles from "./Detail.module.css";
import { useState } from 'react';

function Detail() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [borderColor1, setBorderColor1] = useState("#dee2e6");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
    if (event.target.id === "1") {
      setBorderColor1("#333");
      setBorderColor2("#dee2e6");
    } else {
      setBorderColor1("#dee2e6");
      setBorderColor2("#333");
    }
  };

  return (
    <div className={styles.Detail}>
      <div>
        <div className={styles.inside}>
          <div
            className="left"
            style={{ marginLeft: "0.5em", marginTop: "0em", paddingRight: "2em" , borderRight: "2px solid #ccc", borderRadius: "2px"}}
          >
            <div>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Scenario Name
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                disabled
              />
            </div>
            <div className="mb-3" style={{ marginTop: "0.5em" }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                style={{ resize: "none" , height:"15em"}}
              ></textarea>
            </div>
            <div style={{ paddingLeft: "25em" }}>
              <button className="button-68" role="button">
                <span>Edit</span>
              </button>
            </div>
          </div>
          <div
            className="right"
            style={{ marginLeft: "2em", marginTop: "0em" }}
          >
            <div style={{marginBottom:"0.5em"}}>Select Scenario Type</div>
            <div className="form-check" style={{ borderRadius: "5px", border: `3px solid ${borderColor1}`, padding:"1em 14em 1em 2em", marginBottom:"0.5em"}}>
              <input
                className="form-check-input"
                type="radio"
                name="ScenaioType"
                id="1"
                checked={selectedOption === "1"}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Server on access point
              </label>
            </div>
            <div className={`form-check ${styles.customFormCheck}`} style={{ borderRadius: "5px", border: `3px solid ${borderColor2}`, padding:"1em 1em 1em 2em"}}>
              <input
                className="form-check-input"
                type="radio"
                name="ScenaioType"
                id="2"
                checked={selectedOption === "2"}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Server on host
              </label>
              <div>
                <div className="mb-3" style={{ marginTop: "1em" }}>
                  <label className="form-label">SSID :</label>
                  <input
                    className="form-control"
                    id="email"
                    disabled={selectedOption === "1"}
                    value={selectedOption === "1" ? "" : undefined}
                  />
                </div>
                <div className="mb-3" style={{ marginTop: "1em" }}>
                  <label className="form-label">Password :</label>
                  <input
                    className="form-control"
                    id="password"
                    type="password" // Add type="password" to hide the text
                    disabled={selectedOption === "1"}
                    value={selectedOption === "1" ? "" : undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
