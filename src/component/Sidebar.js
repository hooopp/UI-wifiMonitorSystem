import React from "react";
import logo from "../img/logo.svg";
import Scenario from "./Scenario";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import SelectScenarioType from "./element/SelectScenarioType";

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState("onDetail1");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  return (
    <div className={styles.sidebar}>
      {/* logo */}
      <div className="logo-container" style={{ marginBottom: "-220px" }}>
        <svg viewBox="0 60 300 300">
          <image href={logo} width="300" height="300" />
        </svg>
      </div>
      {/* searchbar */}
      <form style={{ padding: "0 1em 0em 1em" }}>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search" />
          <div className="input-group-btn">
            <button
              className="button-2"
              type="submit"
              style={{
                padding: "0.6em",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                border: "1px solid #dee2e6",
              }}
            >
              <IoSearch style={{ fontSize: "1.5em" }} />
            </button>
          </div>
        </div>
        <div
          style={{
            padding: "0.5em",
            borderBottom: "2px solid #ccc",
            borderRadius: "2px",
          }}
        ></div>
      </form>
      {/* listScenario */}
      <div className="list-group" style={{ padding: "1em 1em 1em 1em" }}>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ borderRadius: "50px", textAlign: "center", color: "grey" }}
        >
          <IoMdAdd />
          <span style={{ fontSize: "1em" }}>Add Scenario</span>
        </button>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ marginLeft: "0em", marginRight: "0em" }}
              >
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Scenario
                </h1>
              </div>
              <div
                className="modal-body"
                style={{ marginLeft: "0em", marginRight: "0em" }}
              >
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Scenario Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Scenario Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    placeholder="Description"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
                <SelectScenarioType data={{name:"onDetail",selectedOption,setSelectedOption,borderColor1,setBorderColor1,borderColor2,setBorderColor2}}/>
                
              </div>
              <div
                className="modal-footer"
                style={{
                  marginLeft: "0em",
                  marginRight: "0em",
                  textAlign: "center",
                }}
              >
                <button type="button" className="btn btn-primary">
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <Scenario data={{ name: "Scenario1" }} />
      </div>

      {/* pagination */}
    </div>
  );
};

export default Sidebar;
