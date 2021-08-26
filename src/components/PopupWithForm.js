export const PopupWithForm = (props) => {
  const className = `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;

  const handleClick = () => {
    props.onClose(props);
  }

  return (
    <section className={className}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <form className={`popup__edit-form popup__edit-form_type_${props.name}`} name={props.name} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          <fieldset className="popup__info">
            {props.children}
            <button type="sumbit" aria-label={props.ariaLabel} className={`popup__save-button ${props.name === 'delete' ? 'popup__save-button_type_delete' : ''}`}>{props.buttonTitle}</button>
          </fieldset>
        </form>
        <button type="button" aria-label="Закрыть всплывающее окно" className="popup__close-button" onClick={handleClick} />
      </div>
    </section>
  );
}