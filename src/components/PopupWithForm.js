const PopupWithForm = ({name, isOpen, title, children, ariaLabel, buttonTitle, onClose}) => {
  const className = `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <section className={className}>
      <div className={`popup__container popup__container_type_${name}`}>
        <form className={`popup__edit-form popup__edit-form_type_${name}`} name={name} noValidate>
          <h2 className="popup__title">{title}</h2>
          <fieldset className="popup__info">
            {children}
            <button type="sumbit" aria-label={ariaLabel} className={`popup__save-button ${name === 'delete' ? 'popup__save-button_type_delete' : ''}`}>{buttonTitle}</button>
          </fieldset>
        </form>
        <button type="button" aria-label="Закрыть всплывающее окно" className="popup__close-button" onClick={onClose} />
      </div>
    </section>
  );
}

export default PopupWithForm;