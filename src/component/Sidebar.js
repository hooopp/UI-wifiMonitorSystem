import React from 'react';
import logo from '../img/logo.svg';
import Scenario from './Scenario';
import styles from './Sidebar.module.css';

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
      {/* listScenario */}
      <div className="list-group" style={{padding:"1em 1em 1em 1em"}}>
        <button type="button" className="list-group-item list-group-item-action" style={{borderRadius: "50px", textAlign: "center", color:"grey", backgroundColor:""}}>
            <span style={{ fontWeight: "bold" }}>+ </span>
            <span style={{ fontSize: "1em"}}>Add Scenario</span>
        </button>
        <Scenario data={{name:"Scenario1"}}/>
      </div>
      
      {/* pagination */}
      <div className="text-center" style={{marginLeft:"1em"}}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#" style={{color:"black"}}>Previous</a></li>
            <li className="page-item"><a className="page-link" href="#" style={{color:"black"}}>1</a></li>
            <li className="page-item"><a className="page-link" href="#" style={{color:"black"}}>2</a></li>
            <li className="page-item"><a className="page-link" href="#" style={{color:"black"}}>Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;