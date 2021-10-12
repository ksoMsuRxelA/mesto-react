import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick}) => {
  const currentUser =  useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );

  const isLiked = card.likes.some((like) => {
    return like._id === currentUser._id;
  });
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active ' : ''}`
  );

  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div className="element">
      <img src={card.link} alt="some" className="element__image" onClick={handleClick} />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-counter">{card.likes.length}</div>
      <button type="button" aria-label="Кнопка Нравится" className={cardLikeButtonClassName}></button>
      <button type="button" aria-label="Кнопка удаления карточки" className={cardDeleteButtonClassName}></button>
    </div>
  );
}

export default Card;

//задать CSS селекторы element__delete-button_visible и element__delete-button_hidden