import React, { useState } from "react";
import './ProduccTabs.style'
const Tabs = (props) => {
    const [pointer, setPointer] = useState({
       isActive: props.isActive,
    });
  let tabContent=props.children
   let tabs= props.tabs
   const handleClick = e =>{
       setPointer({isActive: e.target.name})
   }
   return(
       <React.Fragment>
       <div className="Navbar">
           {tabs.map((tab,index) => {
               return (
                   <div key={index} className="Toggler-Wraper" style={{background: tab == pointer.isActive ? "var(--secondary-base-color)" : "white"}}>
                       <a name={tab} onClick={(e) => handleClick(e)}>{tab}</a>
                       </div>)
           })}
       </div>
       {tabContent.filter(tab => tab.props.tabName==pointer.isActive)}
       </React.Fragment>
   )
};
export default Tabs;
