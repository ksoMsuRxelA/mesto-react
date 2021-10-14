import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: ''});

  useEffect(() => {
    api.getUserInfo()
      .then((resCurrentUser) => {
        setCurrentUser({
          name: resCurrentUser.name,
          about: resCurrentUser.about,
          avatar: resCurrentUser.avatar,
          _id: resCurrentUser._id,
        });

      })
      .catch((err) => {
        console.log(`Ошибка при первичном получении данных пользователя: ${err}`);
      });
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

   const openEditAvatarPopup = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const openEditProfilePopup = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const openAddPlacePopup = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleUpdateUser = (newUserInfo) => {
    api.patchUserInfo(newUserInfo)
      .then((resUserInfo) => {
        setCurrentUser(resUserInfo);
      })
      .catch((err) => {
        console.log(`Ошибка при попытке изменить данные пользователя: ${err}.`);
      });
  }

  const handleUpdateAvatar = (newAvatarUrl) => {
    api.patchAvatar(newAvatarUrl)
      .then((resAvatarUrl) => {
        setCurrentUser(resAvatarUrl);
      })
      .catch((err) => {
        console.log(`Ошибка при попытке изменить аватар пользователя: ${err}.`);
      });
  }

  //here starts cards adding code...
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then((resInitialCards) => {
        setCards(resInitialCards);
      })
      .catch((err) => {
        console.log(`Ошибка при первичном получении карточек: ${err}`);
      });
  }, []); //like componentDidMount - empty array


  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => {
      return like._id === currentUser._id;
    });

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => {
          return cards.map((tmpCard) => {
            return tmpCard._id === card._id ? newCard : tmpCard;
          });
        });
      })
      .catch((err) => {
        console.log(`Ошибка при попытке удалении/установки лайка: ${err}.`);
      })
  }

  function handleCardDelete(card) {
    api.deleteOwnerCard(card._id);
    setCards(cards.filter((tmpCard) => {
      return tmpCard._id !== card._id; 
    }));
  }

  const handleAddCard = (newCard) => {
    api.postNewCard(newCard)
      .then((resNewCard) => {
        setCards([resNewCard, ...cards]);
      })
      .catch((err) => {
        console.log(`Ошибка при попытке добавить новую карточку в начало списка: ${err}.`);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <div className="page">
          <Header />
          <Main 
            onEditAvatar={openEditAvatarPopup} 
            onEditProfile={openEditProfilePopup}
            onAddPlace={openAddPlacePopup}
            handleCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer filler="&copy; 2021 Mesto Russia" />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
          {/* <PopupWithForm 
            onClose={closeAllPopups} 
            isOpen={isAddPlacePopupOpen} 
            name="new-card" 
            title="Новое место" 
            ariaLabel="Добавить новую карточку" 
            buttonTitle="Сохранить"
          >
              <input id="place-input" type="text" placeholder="Название" className="popup__input  popup__input-name" name="name" required minLength="2" maxLength="30" />
              <span className="popup__error-element place-input-error"></span>
              <input id="url-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input-link" name="link" required />
              <span className="popup__error-element url-input-error"></span>
          </PopupWithForm> */}

          <PopupWithForm 
            onClose={closeAllPopups}
            isOpen={false} 
            name="delete" 
            title="Вы уверены?" 
            ariaLabel="Удалить карточку с фотографией" 
            buttonTitle="Да" 
          />

          <ImagePopup 
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
