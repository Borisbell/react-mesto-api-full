import React, {useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import AddPlacePopup from "./AddPlacePopup";
import Spinner from "./Spinner";
import {api} from "../utils/Api";
import ava from '../images/profile/ava.jpg';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function MyProfile(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); 
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null); 
  const [currentUser, setCurrentUser] = React.useState({name:'Жак', about:'Исследователь',avatar:ava,});
  const [deltedCardId, setDeltedCardId] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataReady, SetDataReady] = React.useState(false)

  useEffect(() => {
    SetDataReady(false)
  }, [])

  useEffect(() => {
    api.getProfile()
      .then((userInfo) => {
        setCurrentUser(userInfo);
        SetDataReady(true)
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
    },[])

  useEffect(() => {
    api.getInitialCards()
      .then((cardsInfo) => {
        setCards(cardsInfo);
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
    },[])  

  const handleLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    });
  } 
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleConfirmDeleteClick = (id) => {
    setDeltedCardId(id)
    setIsConfirmDeletePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard({ 
      name: card.name, 
      link: card.link, 
    });
  }

  const handleClosePopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null)
  }

  const handleUpdateUser = (name, about) => {
    setIsLoading(true)
    api.editProfile(name, about)
      .then(res => {
        setCurrentUser(res);
      })
      .then(() => {
        handleClosePopup();
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleCardDelete = () => {
    setIsLoading(true)
    api.deleteCard(deltedCardId)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== deltedCardId));
    })
    .then(() => {
      handleClosePopup();
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    })
    .finally(() => {
      setIsLoading(false);
    });
  }  

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true)
    api.updateAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
      })
      .then(() => {
        handleClosePopup();
      })
      .catch(err => {
        console.log('Ошибка: ', err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleAddPlaceSubmit = (name, link) => {
    setIsLoading(true)
    api.addCard(name, link)
    .then(newCard => {
      setCards([newCard, ...cards]);
    })
    .then(() => {
      handleClosePopup();
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header loggedIn={props.loggedIn} userData={props.userData} navText='Выйти' navLink='signin' signOut={props.signOut}/>
          {dataReady ? <Main onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                cards={cards} 
                onCardLike={handleLike}
                onDeleteClick={handleConfirmDeleteClick} 
                /> : <Spinner/>}
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={handleClosePopup} 
                          onUpdateUser={handleUpdateUser}  
                          loading={isLoading}
                          />
        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} 
                            onClose={handleClosePopup}
                            onDeleteConfirm={handleCardDelete}
                            loading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                         onClose={handleClosePopup}
                         onUpdateAvatar={handleUpdateAvatar}
                         loading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} 
                       onClose={handleClosePopup} 
                       onAddPlaceSubmit={handleAddPlaceSubmit} 
                       loading={isLoading} />
        {selectedCard && <ImagePopup card={selectedCard} onClose={handleClosePopup}/>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default MyProfile;
