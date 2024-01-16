import React, { useEffect } from "react";
import styles from "./SelectScenarioType.module.css";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function SelectScenarioType(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRadioChange = (event) => {
    props.data.setSelectedOption(event.target.id);
    if (event.target.id === props.data.name + "1") {
      props.data.setBorderColor1("#333");
      props.data.setBorderColor2("#dee2e6");
      props.data.setSsid("");
      props.data.setPassword("");
      props.data.setSelectedWifiType("2.4GHz_"+props.data.name);
    } else {
      props.data.setBorderColor1("#dee2e6");
      props.data.setBorderColor2("#333");
    }
  };
  const handleWifiTypeChange = (event) => {
    props.data.setSelectedWifiType(event.target.id);
  }

  return (
    <div className={styles.selectScenarioType}>
      <div style={{ marginBottom: "0.5em" }}>Select Scenario Type</div>
      <div
        className="form-check"
        style={{
          borderRadius: "5px",
          border: `3px solid ${
            props.data.isEdit ? props.data.borderColor1 : "#dee2e6"
          }`,
          padding: "1em 14em 1em 2em",
          marginBottom: "0.5em",
        }}
      >
        <input
          className="form-check-input"
          type="radio"
          name={props.data.name}
          id={props.data.name + "1"}
          checked={props.data.selectedOption === props.data.name + "1"}
          onChange={handleRadioChange}
          disabled={!props.data.isEdit}
        />
        <label className="form-check-label" htmlFor={props.data.name + "1"}>
          Server on access point
        </label>
      </div>
      <div
        className={`form-check ${styles.customFormCheck}`}
        style={{
          borderRadius: "5px",
          border: `3px solid ${
            props.data.isEdit ? props.data.borderColor2 : "#dee2e6"
          }`,
          padding: "1em 1em 1em 2em",
        }}
      >
        <input
          className="form-check-input"
          type="radio"
          name={props.data.name}
          id={props.data.name + "2"}
          checked={props.data.selectedOption === props.data.name + "2"}
          onChange={handleRadioChange}
          disabled={!props.data.isEdit}
        />
        <label className="form-check-label" htmlFor={props.data.name + "2"}>
          Server on host
        </label>
        <div>
          <div className="mb-3" style={{ marginTop: "1em" }}>
            <label className="form-label" style={{color:`${props.data.isEdit === false ? "#cccccc" : "#333"}`}}>SSID</label>
            <input
              className="form-control"
              disabled={
                props.data.selectedOption === props.data.name + "1" ||
                !props.data.isEdit
              }
              value={props.data.ssid}
              onChange={(e) => props.data.setSsid(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ marginTop: "1em" }}>
            <label className="form-label" style={{color:`${props.data.isEdit === false ? "#cccccc" : "#333"}`}}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                disabled={
                  props.data.selectedOption === props.data.name + "1" ||
                  !props.data.isEdit
                }
                value={props.data.password}
                onChange={(e) => props.data.setPassword(e.target.value)}
              />
              {props.data.selectedOption === props.data.name + "2" ? (
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye size={25} />
                  ) : (
                    <FaEyeSlash size={25} />
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div style={{marginBottom:"0.5em" ,color:`${props.data.isEdit === false ? "#cccccc" : "#333"}`}}>Wi-Fi Frequency</div>
        <div style={{display:"flex"}}>
          <div
            className="form-check"
            style={{ marginLeft: "0em" }}
          >
            <input
              className="form-check-input"
              type="radio"
              checked={props.data.selectedWifiType === "2.4GHz_"+props.data.name && props.data.selectedOption !== props.data.name + "1"}
              id = {"2.4GHz_"+props.data.name}
              disabled={!props.data.isEdit || props.data.selectedOption === props.data.name + "1"}
              onChange={handleWifiTypeChange}
              style={props.data.selectedOption === props.data.name + "1" ? {backgroundColor:"#e9ecef",borderColor:"#e9ecef"} : {}}
            />
            <label className="form-check-label">
              2.4 GHz
            </label>
          </div>
          <div
            className="form-check"
            style={{marginLeft:"-12em"}}
          >
            <input
              className="form-check-input"
              type="radio"
              checked={props.data.selectedWifiType === "5GHz_"+props.data.name}
              id={"5GHz_"+props.data.name}
              disabled={!props.data.isEdit || props.data.selectedOption === props.data.name + "1"}
              onChange={handleWifiTypeChange}
              style={props.data.selectedOption === props.data.name + "1" ? {backgroundColor:"#e9ecef",borderColor:"#e9ecef"} : {}}
            />
            <label className="form-check-label">
              5GHz
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectScenarioType;
