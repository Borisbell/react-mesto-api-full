import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props){
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.data.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );    

  const isLiked = props.data.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-btn ${isLiked ? 'card__like-btn_state_active' : ''}`
    );

  function handleClick() {
    props.onCardClick(props.data);
  }  
  
  function handleLikeClick(){
    props.onCardLike(props.data);
  }

  function handleCardDelete(){
    props.onDeleteClick(props.data._id);
  }

  return(
    <article className="card">
      <button aria-label="Удалить" type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}>
      </button>
      <img src={props.data.link} alt={props.data.name} className="card__img" onClick={handleClick}/>
      <div className="card__content">
        <h2 className="name name_place_card">{props.data.name}</h2>
        <div className="card__likes-wrapper">
        <button aria-label="Нравится" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <span className="card__like-count">{props.data.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;