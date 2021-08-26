import {useEffect, useState} from 'react';
import {api} from '../utils/Api';
import Card from './Card';

const Main = (props) => {
  let [userName, setUserName] = useState('');
  let [userDescription, setUserDescription] = useState('');
  let [userAvatar, setUserAvatar] = useState('');
  let [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((resUserInfo) => {
        setUserName(resUserInfo.name);
        setUserDescription(resUserInfo.about);
        setUserAvatar(resUserInfo.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка при первичном получении данных пользователя: ${err}`);
      });
    
    api.getInitialCards()
      .then((resInitialCards) => {
        setCards(resInitialCards);
      })
      .catch((err) => {
        console.log(`Ошибка при первичном получении карточек: ${err}`);
      });
  }, []); //like componentDidMount - empty array

  return (
    <main className="content page__content">

      <section className="profile content__profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{backgroundImage: `url(${userAvatar})`}}></div>
        <div className="profile__layout"> 
          <div className="profile__info">
            <h1 className="profile__full-name">{userName}</h1>
            <p className="profile__role">{userDescription}</p>
          </div>
          <button type="button" aria-label="Редактировать профиль" className="profile__edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button type="button" aria-label="Добавить карточку" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements content__elements">      
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={props.handleCardClick} />
        )})}
      </section>
    </main>
  );
}

export default Main;