import React from 'react';
function PopupWithForm({type, name, title, isOpen, onClose, onSubmit, loading, buttonText, children}){

  return(
    <div className={`popup popup_type_${type} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_form">
        <button aria-label="Закрыть" 
                type="button" 
                className="popup__close-btn" 
                onClick={onClose}>
        </button>
        <h2 className="name name_place_popup">{title}</h2>
        <form name={name} 
              id={`form-${name}`} 
              className="popup__form" 
              onSubmit={onSubmit}
              noValidate>
          <fieldset className="popup__fieldset">
            {children}
          </fieldset>   
          <button aria-label="Отправить" 
                  type="submit" 
                  className="popup__submit">{loading ? 'Сохранение...' : buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;