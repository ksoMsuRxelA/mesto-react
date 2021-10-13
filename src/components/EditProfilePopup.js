import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
  const [name, setName] = useState(""); 
  const [description, setDescription] = useState(""); 

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name, 
      about: description,
    });
    onClose();
  }

  return (
    <PopupWithForm 
      onClose={onClose} 
      isOpen={isOpen} 
      name="edit" 
      title="Редактировать профиль" 
      ariaLabel="Редактировать профиль" 
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input id="name-input" type="text" value={name} onChange={handleNameChange} placeholder="Ваше имя" className="popup__input popup__input-name" name="name" required minLength="2" maxLength="40" />
      <span className="popup__error-element name-input-error"></span>
      <input id="role-input" type="text" value={description} onChange={handleDescriptionChange} placeholder="Род вашей деятельности" className="popup__input popup__input-role" name="about" required minLength="2" maxLength="200" />
      <span className="popup__error-element role-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;