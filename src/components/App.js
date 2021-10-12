import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo()
      .then((resCurrentUser) => {
        setCurrentUser({
          userName: resCurrentUser.name,
          userDescription: resCurrentUser.about,
          userAvatar: resCurrentUser.avatar,
          userId: resCurrentUser._id,
        });

      })
      .catch((err) => {
        console.log(`Ошибка при первичном получении данных пользователя: ${err}`);
      });
  }, []);

  // console.log(currentUser);



  const closeAllPopups = (props) => {
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

          <PopupWithForm 
            onClose={closeAllPopups} 
            isOpen={isEditProfilePopupOpen} 
            name="edit" 
            title="Редактировать профиль" 
            ariaLabel="Редактировать профиль" 
            buttonTitle="Сохранить"
          >
              <input id="name-input" type="text" placeholder="Ваше имя" className="popup__input popup__input-name" name="name" required minLength="2" maxLength="40" />
              <span className="popup__error-element name-input-error"></span>
              <input id="role-input" type="text" placeholder="Род вашей деятельности" className="popup__input popup__input-role" name="about" required minLength="2" maxLength="200" />
              <span className="popup__error-element role-input-error"></span>
          </PopupWithForm>

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

          <PopupWithForm
            onClose={closeAllPopups} 
            isOpen={isEditAvatarPopupOpen} 
            name="avatar" 
            title="Обновить аватар" 
            ariaLabel="Изменить аватар" 
            buttonTitle="Сохранить"
          >
              <input id="url-input-avatar" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_avatar popup__input-link" name="avatar" required />
              <span className="popup__error-element url-input-avatar-error"></span>
          </PopupWithForm>

          <ImagePopup 
            onClose={closeAllPopups}
            card={selectedCard}
          />

          {/* <section className="popup popup_type_delete">
            <div className="popup__container popup__container_type_delete">
              <form className="popup__edit-form popup__edit-form_type_delete" name="delete" noValidate>
                <h2 className="popup__title">Вы уверены?</h2>
                <fieldset className="popup__info">
                  <button type="sumbit" aria-label="Удалить карточку с фотографией" className="popup__save-button popup__save-button_type_delete">Да</button>
                </fieldset>
              </form>
              <button type="button" aria-label="Закрыть всплывающее окно" className="popup__close-button"></button>
            </div>
          </section> */}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
