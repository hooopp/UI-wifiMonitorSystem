import React, { useEffect } from "react";
import logo from "../img/logo.svg";
import Scenario from "./Scenario";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import SelectScenarioType from "./element/SelectScenarioType";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Sidebar = ({setSelectedScenario, selectedScenario}) => {
  const [selectedOption, setSelectedOption] = useState("onDetail1");
  const [borderColor1, setBorderColor1] = useState("#333");
  const [borderColor2, setBorderColor2] = useState("#dee2e6");
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioDesc, setScenarioDesc] = useState("");
  const [ssid, setSsid] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [password, setPassword] = React.useState("");
  const [selectedWifiType, setSelectedWifiType] = React.useState("2.4GHz_onDetail");
  const [searchVariable, setSearchVariable] = React.useState("");

  const mutation = useMutation((data) => {
    return axios.post("http://127.0.0.1:8000/scenario", data);
  });

  const loadScenario = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/scenario?page_size=9&page=${page}${searchVariable ? `&search=${searchVariable}` : ""}`
    );
    return data;
  };

  const {
    data: loadScenarioData,
    status: loadScenarioStatus,
    refetch: refetchLoadScenario,
  } = useQuery("scenario", loadScenario);

  useEffect(() => {
    refetchLoadScenario().then(({ data: loadScenarioData }) => {
      if (loadScenarioData.length === 0 && page > 1) {
        setPage(page - 1);
      }
    });
  }, [page]);

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
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={(e) => setSearchVariable(e.target.value)}
          />
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
              onClick={(e) => {
                e.preventDefault();
                refetchLoadScenario();
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
          onClick={() => {setScenarioName("");setScenarioDesc("");setSsid("");setPassword("");setSelectedOption("onDetail1");setBorderColor1("#333");setBorderColor2("#dee2e6");}}
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
                  <span style={{fontWeight:"bold"}}>Add Scenario</span>
                </h1>
              </div>
              <div
                className="modal-body"
                style={{ marginLeft: "0em", marginRight: "0em" }}
              >
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Scenario Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Scenario Name"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    placeholder="Description"
                    value={scenarioDesc}
                    onChange={(e) => setScenarioDesc(e.target.value)}
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
                <SelectScenarioType
                  data={{
                    name: "onDetail",
                    isEdit: true,
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
                    setSelectedWifiType
                  }}
                />
              </div>
              <div
                className="modal-footer"
                style={{
                  marginLeft: "0em",
                  marginRight: "0em",
                  textAlign: "center",
                }}
              >
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    mutation.mutate(
                      {
                        scenario_name: scenarioName,
                        scenario_desc: scenarioDesc,
                        is_using_target_ap:
                          selectedOption === "onDetail1" ? false : true,
                        target_ap_ssid: ssid,
                        target_ap_password: password,
                        target_ap_radio: selectedWifiType === "2.4GHz_onDetail" ? "2.4G" : "5G",
                      },
                      {
                        onSuccess: (data) => {
                          setSelectedScenario(data.data.scenario_id);
                          refetchLoadScenario();
                        },
                      }
                    );
                  }}
                  data-bs-dismiss="modal"
                  style={{fontWeight:"bold"}}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  style={{fontWeight:"bold"}}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {loadScenarioData &&
            loadScenarioData.map((scenario, i) => (
              <Scenario
                key={i}
                refetchLoadScenario={refetchLoadScenario}
                setSelectedScenario={setSelectedScenario}
                loadScenarioData={loadScenarioData}
                selectedScenario={selectedScenario}
                setPage={setPage}
                page={page}
                data={{
                  name: scenario.scenario_name,
                  id: scenario.scenario_id,
                }}
              />
            ))}
        </div>
      </div>

      {/* pagination */}
      <button
        style={{
          position: "absolute",
          bottom: "1em",
          left: "1em",
          color: `${page === 1 ? "grey" : "#333"}`,
          backgroundColor: "transparent",
          border: "none",
        }}
        disabled={page === 1 ? true : false}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        <FaArrowAltCircleLeft style={{ fontSize: "2rem" }} />
        <span style={{ fontWeight: "bold" }}> Previous</span>
      </button>
      <button
        style={{
          position: "absolute",
          bottom: "1em",
          left: "19.3em",
          color: "#333",
          backgroundColor: "transparent",
          border: "none",
          width: "5em",
        }}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        <span style={{ fontWeight: "bold" }}>Next </span>
        <FaArrowAltCircleRight style={{ fontSize: "2rem" }} />
      </button>
    </div>
  );
};

export default Sidebar;
