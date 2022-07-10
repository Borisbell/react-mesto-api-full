import React from "react";
import editButton from '../images/profile/edit-btn-icon.svg';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({cards, onCardLike, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main>
        <section className="profile">
          <div className="profile__content">
            <div className="profile__avatar-container">
              <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
            <div onClick={onEditAvatar} className="profile__avatar-overlay">
              <img src={editButton} alt="Редактировать" className="profile__avatar-edit"/>
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__info-main">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <button onClick={onEditProfile} aria-label="Редактироавние профиля" type="button" className="profile__info-edit">
              </button>
            </div>
            <p className="paragraph">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} aria-label="Добавить" type="button" className="profile__add-btn">
        </button>
      </section>
      <section className="elements">
          {cards.map((card) => (
              <Card data={card}
                    onCardClick={onCardClick} 
                    onCardLike={onCardLike}
                    onDeleteClick={onDeleteClick}
                    key={card._id}/>
          ))}
      </section>
      </main>
  );
}
    
export default Main;