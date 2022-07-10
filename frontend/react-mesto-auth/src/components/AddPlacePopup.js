import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit(
      name, link
    );
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);
  
  return(
    <PopupWithForm type="place" 
                   name="place-add" 
                   title="Новое место" 
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
                   loading={props.loading}
                   buttonText='Сохранить'>
      <input id="place-name" 
             type="text" 
             name="place-name" 
             value={name}
             onChange={handleName}
             className="popup__input popup__input_content_place-name" 
             placeholder="Название" 
             required minLength="2" maxLength="30"/>
      <span id="error-place-name" 
            className="error-message error-message_visible"></span>
      <input id="image" 
             type="url" 
             name="image" 
             value={link}
             onChange={handleLink}
             className="popup__input popup__input_content_img" 
             placeholder="Ссылка на картинку" 
             required/>
      <span id="error-image" className="error-message error-message_visible"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;