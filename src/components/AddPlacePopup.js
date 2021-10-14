import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddCard}) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name,
      link,
    });
    onClose();
    handleInputsReset();
  }

  function handleInputsReset() {
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm 
      onClose={onClose} 
      isOpen={isOpen} 
      name="new-card" 
      title="Новое место" 
      ariaLabel="Добавить новую карточку" 
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input id="place-input" value={name} onChange={handleNameChange} type="text" placeholder="Название" className="popup__input  popup__input-name" name="name" required minLength="2" maxLength="30" />
      <span className="popup__error-element place-input-error"></span>
      <input id="url-input" value={link} onChange={handleLinkChange} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input-link" name="link" required />
      <span className="popup__error-element url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;