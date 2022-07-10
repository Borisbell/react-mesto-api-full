import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props){

  function handleSubmit(e){
    e.preventDefault();
    props.onDeleteConfirm();
  }

  return(
    <PopupWithForm type="delete-confirm" 
                   name="avatar-edit-confirm" 
                   title="Вы уверены?"
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit} 
                   loading={props.loading}
                   buttonText='Да'>
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;