const Card = ({card, onCardClick}) => {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div className="element">
      <img src={card.link} alt="some" className="element__image" onClick={handleClick} />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-counter">{card.likes.length}</div>
      <button type="button" aria-label="Кнопка Нравится" className="element__like-button"></button>
      <button type="button" aria-label="Кнопка удаления карточки" className="element__delete-button"></button>
    </div>
  );
}

export default Card;