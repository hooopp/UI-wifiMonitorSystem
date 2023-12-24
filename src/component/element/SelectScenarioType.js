import React from "react";
import styles from "./SelectScenarioType.module.css";

function selectScenarioType(props) {
  const handleRadioChange = (event) => {
    props.data.setSelectedOption(event.target.id);
    if (event.target.id === props.data.name+"1") {
      props.data.setBorderColor1("#333");
      props.data.setBorderColor2("#dee2e6");
    } else {
      props.data.setBorderColor1("#dee2e6");
      props.data.setBorderColor2("#333");
    }
  };

  return (
    <div className={styles.selectScenarioType}>
      <div style={{ marginBottom: "0.5em" }}>Select Scenario Type</div>
      <div
        className="form-check"
        style={{
          borderRadius: "5px",
          border: `3px solid ${props.data.borderColor1}`,
          padding: "1em 14em 1em 2em",
          marginBottom: "0.5em",
        }}
      >
        <input
          className="form-check-input"
          type="radio"
          name={props.data.name}
          id={props.data.name+"1"}
          checked={props.data.selectedOption === (props.data.name+"1")}
          onChange={handleRadioChange}
          disabled = {!props.data.isEdit}
        />
        <label className="form-check-label" htmlFor={props.data.name+"1"}>
          Server on access point
        </label>
      </div>
      <div
        className={`form-check ${styles.customFormCheck}`}
        style={{
          borderRadius: "5px",
          border: `3px solid ${props.data.borderColor2}`,
          padding: "1em 1em 1em 2em",
        }}
      >
        <input
          className="form-check-input"
          type="radio"
          name={props.data.name}
          id={props.data.name+"2"}
          checked={props.data.selectedOption === props.data.name+"2"}
          onChange={handleRadioChange}
          disabled = {!props.data.isEdit}
        />
        <label className="form-check-label" htmlFor={props.data.name+"2"}>
          Server on host
        </label>
        <div>
          <div className="mb-3" style={{ marginTop: "1em" }}>
            <label className="form-label">SSID :</label>
            <input
              className="form-control"
              disabled={props.data.selectedOption === props.data.name+"1"}
              value={props.data.selectedOption === props.data.name+"1" ? "" : ""}
            />
          </div>
          <div className="mb-3" style={{ marginTop: "1em" }}>
            <label className="form-label">Password :</label>
            <input
              className="form-control"
              type="password" // Add type="password" to hide the text
              disabled={props.data.selectedOption === props.data.name+"1"}
              value={props.data.selectedOption === props.data.name+"1" ? "" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default selectScenarioType;
