import React from "react";
import spinner from '../images/spinner.gif';

function Spinner(props){
  return(
    <div className="spinner__wrapper">
      <img src={spinner} alt="индикатор загрузки" className="spinner"/>
    </div>
  )
}

export default Spinner;