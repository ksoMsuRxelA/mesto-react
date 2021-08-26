const ImagePopup = (props) => {
  const className = `popup popup_type_image ${Object.keys(props.card).length !== 0 ? 'popup_opened' : ''}`;
  return (
    <section className={className}>
      <figure className="popup__image-container">
        <img src={props.card.link} alt="some" className="popup__image" />
        <figcaption className="popup__image-caption">{props.card.name}</figcaption>
        <button type="button" aria-label="Закрыть всплывающее окно" className="popup__close-button" onClick={props.onClose}></button>
      </figure>
    </section>
  );
}

export default ImagePopup;