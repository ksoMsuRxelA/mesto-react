import { useEffect, useState, useContext } from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({onEditAvatar, onEditProfile, onAddPlace, handleCardClick, cards, onCardLike, onCardDelete}) => {
  const user = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar" onClick={onEditAvatar} style={{backgroundImage: `url(${user.avatar})`}}></div>
        <div className="profile__layout"> 
          <div className="profile__info">
            <h1 className="profile__full-name">{user.name}</h1>
            <p className="profile__role">{user.about}</p>
          </div>
          <button type="button" aria-label="Редактировать профиль" className="profile__edit-button" onClick={onEditProfile}></button>
        </div>
        <button type="button" aria-label="Добавить карточку" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements content__elements">      
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={handleCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        )})}
      </section>
    </main>
  );
}

export default Main;