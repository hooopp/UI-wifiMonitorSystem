import React from "react";
import styles from "./Detail.module.css";
import { useState } from "react";
import SelectScenarioType from "./element/SelectScenarioType";

function Detail() {
  const [selectedOption, setSelectedOption] = useState("onAddScenario1");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [isEdit, setIsEdit] = useState(false);
  const [ssid, setSsid] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div className={styles.Detail}>
      <div>
        <div className={styles.inside}>
          <div
            className="left"
            style={{
              marginLeft: "0.5em",
              marginTop: "0em",
              paddingRight: "2em",
              borderRight: "2px solid white",
              borderRadius: "2px",
            }}
          >
            <div>
              <label htmlFor="email" className="form-label">
                Scenario Name
              </label>
              <input type="email" id ="email" className="form-control" disabled={!isEdit} />
            </div>
            <div className="mb-3" style={{ marginTop: "0.5em" }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                style={{ resize: "none", height: "15em" }}
                disabled={!isEdit}
              ></textarea>
            </div>
            <div style={{ paddingLeft: "29em" }}></div>
          </div>
          <div
            className="right"
            style={{ marginLeft: "2em", marginTop: "0em" }}
          >
            <SelectScenarioType
              data={{
                name: "onAddScenario",
                isEdit,
                selectedOption,
                setSelectedOption,
                borderColor1,
                setBorderColor1,
                borderColor2,
                setBorderColor2,
                ssid,
                setSsid,
                password,
                setPassword,
              }}
            />
          </div>
        </div>
        <div
          style={{ textAlign: "right", marginTop: "1em", marginRight: "1em" }}
        >
          {isEdit ? (
            <>
              <button
                className="button-68"
                role="button"
                style={{ marginRight: "1em" }}
              >
                <span>Confirm</span>
              </button>
              <button
                className="button-68"
                role="button"
                onClick={() => setIsEdit(false)}
              >
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              className="button-68"
              role="button"
              onClick={() => setIsEdit(true)}
            >
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
