import React from "react";
import styles from "./NodePopUp.module.css";
import { useState } from "react";

function NodePopUp({ popUpMode }) {
  const [clientType, setClientType] = useState("Deterministic");
  const [nodeMode, setNodeMode] = useState("AP");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [borderColor3, setBorderColor3] = useState("#dee2e6");

  const handleRadioChange = (event) => {
    setClientType(event.target.value);
    if (event.target.value === "Deterministic") {
      setBorderColor1("#333");
      setBorderColor2("#dee2e6");
      setBorderColor3("#dee2e6");
    } else if (event.target.value === "Web") {
      setBorderColor1("#dee2e6");
      setBorderColor2("#333");
      setBorderColor3("#dee2e6");
    } else {
      setBorderColor1("#dee2e6");
      setBorderColor2("#dee2e6");
      setBorderColor3("#333");
    }
  };
  return (
    <div>
      <div
        class="modal fade"
        id="NodePopUp"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <h1
                class="modal-title fs-5"
                id="staticBackdropLabel"
                style={{ marginLeft: "0em", marginRight: "0em" }}
              >
                {popUpMode === "add" ? "Add Node" : "Edit Node"}
              </h1>
            </div>
            <div
              class="modal-body"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <div>
                <div class="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    Node Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Node Name"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    IP Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="IP Address"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    SSID
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="SSID"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleFormControlInput1"
                    class="form-label"
                    style={{ marginLeft: "0em", marginRight: "0em" }}
                  >
                    Mode
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={nodeMode}
                    onChange={(event) => setNodeMode(event.target.value)}
                  >
                    <option selected={nodeMode === "AP"} value="AP">
                      AP
                    </option>
                    <option selected={nodeMode === "Client"} value="Client">
                      Client
                    </option>
                  </select>
                </div>
              </div>
              {nodeMode === "Client" ? (
                <div className={styles.selectClientType}>
                  <div style={{ marginBottom: "0.5em" }}>
                    Select Scenario Type
                  </div>
                  <div
                    class="form-check"
                    style={{
                      borderRadius: "5px",
                      border: `3px solid ${borderColor1}`,
                      padding: "1em 1em 1em 2em",
                      marginBottom: "0.5em",
                    }}
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="Deterministic"
                      checked={clientType === "Deterministic"}
                      onClick={handleRadioChange}
                    />
                    <label class="form-check-label" for="exampleRadios1">
                      Deterministic
                    </label>
                    <div>
                      <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">Average Interval Time</label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "Deterministic"}
                        />
                      </div>
                      <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">Average Packet Size</label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "Deterministic"}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-check"
                    style={{
                      borderRadius: "5px",
                      border: `3px solid ${borderColor2}`,
                      padding: "1em 1em 1em 2em",
                      marginBottom: "0.5em",
                    }}
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      value="Web"
                      checked={clientType === "Web"}
                      onClick={handleRadioChange}
                    />
                    <label class="form-check-label" for="exampleRadios2">
                      Web
                    </label>
                    <div>
                      <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">Average Interval Time</label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "Web"}
                        />
                      </div>
                      <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">Average Packet Size</label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "Web"}
                        />
                      </div>
                      <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">Average New Page Packet Size</label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "Web"}
                        />
                      </div>
                      <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">Probability of Load New Page</label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "Web"}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-check"
                    style={{
                      borderRadius: "5px",
                      border: `3px solid ${borderColor3}`,
                      padding: "1em 1em 1em 2em",
                    }}
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios3"
                      value="File"
                      checked={clientType === "File"}
                      onClick={handleRadioChange}
                    />
                    <label class="form-check-label" for="exampleRadios2">
                      File
                    </label>
                    <div className="mb-3" style={{ marginTop: "1em" }}>
                        <label className="form-label">Average Packet Size</label>
                        <input
                          type="number"
                          className="form-control"
                          disabled={clientType !== "File"}
                        />
                      </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div
              class="modal-footer"
              style={{ marginLeft: "0em", marginRight: "0em" }}
            >
              <button type="button" class="btn btn-primary">
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodePopUp;
