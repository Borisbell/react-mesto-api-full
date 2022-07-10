import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props){
  const inputEl = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar(
      inputEl.current.value,
    );
  }

  React.useEffect(() => {
    inputEl.current.value = '';
  }, [props.isOpen]);

  return(
    <PopupWithForm type="avatar-confirm" 
                   name="delete-confirm" 
                   title="Обновить аватар" 
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
                   loading={props.loading}
                   buttonText='Сохранить'>
        <input id="avatar" 
               type="url" 
               ref={inputEl}
               name="image" 
               className="popup__input popup__input_content_img" 
               placeholder="Ссылка на картинку" 
               required/>
        <span id="error-avatar" className="error-message error-message_visible"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;