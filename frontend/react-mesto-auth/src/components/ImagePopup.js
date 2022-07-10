import React from 'react';

function ImagePopup({card, onClose}){
  return(
    // <div className={`popup popup_type_img-zoom ${card ? 'popup_opened' : ''}`}>
    <div className="popup popup_type_img-zoom popup_opened">
      <div className="popup__container">
        <button aria-label="Закрыть" type="button" className="popup__close-btn" onClick={onClose}>
        </button>
        <img src={card.link} alt={card.name} className="popup__zoom-img"/>
        <p className="popup__description">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;