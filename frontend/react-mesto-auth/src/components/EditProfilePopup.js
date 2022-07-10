import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props){
  const [name, setName] = React.useState('');
  const [about, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(
      name, about
    );
  }

  return(
    <PopupWithForm type="bio" 
                   name="profile-edit" 
                   title="Редактировать профиль" 
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
                   loading={props.loading}
                   buttonText='Сохранить'>
      <input id="firstname" 
             type="text" 
             name="firstname" 
             value={name}
             onChange={handleNameChange}
             className="popup__input popup__input_content_user-name" 
             placeholder="Введите имя" 
             required minLength="2" 
             maxLength="40"/>
      <span id="error-firstname" className="error-message error-message_visible"></span>
      <input id="job" 
             type="text" 
             name="job" 
             value={about}
             onChange={handleDescriptionChange}
             className="popup__input popup__input_content_job" 
             placeholder="Введите профессию" 
             required minLength="2" 
             maxLength="200"/>
      <span id="error-job" className="error-message error-message_visible"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;