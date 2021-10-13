import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
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
          />
          <Footer filler="&copy; 2021 Mesto Russia" />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm 
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
          </PopupWithForm>

          <PopupWithForm 
            onClose={closeAllPopups}
            isOpen={false} 
            name="delete" 
            title="Вы уверены?" 
            ariaLabel="Удалить карточку с фотографией" 
            buttonTitle="Да" 
          />

          {/* <PopupWithForm
            onClose={closeAllPopups} 
            isOpen={isEditAvatarPopupOpen} 
            name="avatar" 
            title="Обновить аватар" 
            ariaLabel="Изменить аватар" 
            buttonTitle="Сохранить"
          >
              <input id="url-input-avatar" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_avatar popup__input-link" name="avatar" required />
              <span className="popup__error-element url-input-avatar-error"></span>
          </PopupWithForm> */}

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
