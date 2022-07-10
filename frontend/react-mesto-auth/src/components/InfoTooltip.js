import React from "react";
import successImage from '../images/infoToolTip/success.svg';
import errorImage from '../images/infoToolTip/error.svg';

function InfoTooltip(props){
  return(
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_form popup__container_type_tooltip">
        <button aria-label="Закрыть" 
                type="button" 
                className="popup__close-btn" 
                onClick={props.onClose}>
        </button>
        <img src={props.success ? successImage : errorImage} alt="Иконка" className="tooltip__image"/>
        <h2 className="name name_place_tooltip">{ 
          props.success ? 
            props.successMessage
            : props.message!=='' ?
            `${props.message.replace(/['"]+/g, '')}, попробуйте ещё раз.`
            : 'Что-то пошло не так! Попробуйте ещё раз.'
            }
        </h2>
      </div>
    </div>
  )
}

export default InfoTooltip;