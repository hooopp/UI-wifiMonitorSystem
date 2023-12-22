import React from 'react';
import logo from '../img/logo.svg';
import Scenario from './Scenario';
import styles from './Sidebar.module.css';
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {/* logo */}
      <div className="logo-container" style={{marginBottom:"-220px"}}>
        <svg viewBox="0 60 300 300">
          <image href={logo} width="300" height="300" />
        </svg>
      </div>
      {/* searchbar */}
      <form style={{padding:"0 1em 0em 1em"}}>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search"/>
          <div class="input-group-btn">
            <button class="button-2" type="submit" style={{ padding: "0.6em", borderTopLeftRadius: "0", borderBottomLeftRadius: "0", border: "1px solid #dee2e6" }}>
              <IoSearch style={{fontSize:"1.5em"}}/>
            </button>
          </div>
        </div>
        <div style={{padding:"0.5em", borderBottom: "2px solid #ccc", borderRadius: "2px"}}></div>
      </form>
      {/* listScenario */}
      <div className="list-group" style={{padding:"1em 1em 1em 1em"}}>
        <button type="button" className="list-group-item list-group-item-action" style={{borderRadius: "50px", textAlign: "center", color:"grey"}}>
            <IoMdAdd />
            <span style={{ fontSize: "1em"}}>Add Scenario</span>
        </button>
        <Scenario data={{name:"Scenario1"}}/>
      </div>
      
      {/* pagination */}

    </div>
  );
}

export default Sidebar;