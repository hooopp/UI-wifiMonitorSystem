import React from "react";
import styles from "./Detail.module.css";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import SelectScenarioType from "./element/SelectScenarioType";

function Detail({
  ssid,
  setSsid,
  password,
  setPassword,
  scenarioName,
  setScenarioName,
  setScenarioDesc,
  scenarioDesc,
  selectedOption,
  setSelectedOption,
  borderColor1,
  borderColor2,
  setBorderColor1,
  setBorderColor2,
  isEdit,
  setIsEdit,
  patchScenario,
  refetchLoadScenarioDetail,
  selectedWifiType,
  setSelectedWifiType,
}) {

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
              <label htmlFor="scenarioName" className="form-label">
                Scenario Name
              </label>
              <input
                id="scenarioName"
                className="form-control"
                disabled={!isEdit}
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
            </div>
            <div className="mb-3" style={{ marginTop: "0.5em" }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                style={{ resize: "none", height: "15em" }}
                disabled={!isEdit}
                value={scenarioDesc}
                onChange={(e) => setScenarioDesc(e.target.value)}
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
                selectedWifiType,
                setSelectedWifiType,
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
                <span
                  onClick={() => { (ssid === "" || password === "") && selectedOption === "onAddScenario2" ? alert("Please fill in the SSID and Password") :
                    patchScenario.mutate(
                      {
                        scenario_name: scenarioName,
                        scenario_desc: scenarioDesc,
                        is_using_target_ap:
                          selectedOption === "onAddScenario1" ? false : true,
                        target_ap_ssid: ssid,
                        target_ap_password: password,
                        target_ap_radio: selectedWifiType === "2.4GHz_onAddScenario" ? "2.4G" : "5G",
                      },
                      {
                        onSuccess: () => {
                          
                          window.location.reload();
                        },
                      }
                    );
                  }}
                >
                  Confirm
                </span>
              </button>
              <button
                className="button-68"
                role="button"
                onClick={() => {setIsEdit(false);refetchLoadScenarioDetail();}}
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
