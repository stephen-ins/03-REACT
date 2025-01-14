import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function Header(photograph) {
  // console.log(photograph);
  const data = photograph.data;
  // console.log(data);

  // Faite en sorte d'ouvrir / fermer la modale à l'aide du hook useState(). Les classes CSS sont openModal / closeModal.
  const [handleModal, setHandleModal] = React.useState("modal");
  const openModal = () => {
    // console.log("Ouverture de la modale");
    setHandleModal("modal openModal");

  };

  const closeModal = () => {
    // console.log("Fermeture de la modale");
    setHandleModal("modal closeModal");
  }

  return (
    <>
      <div className={handleModal} >
        <div className="header__modal">
          <div className="header__title">

            <p>Contactez-moi</p>
            <p>Mimi Keel</p>
          </div>

          <FontAwesomeIcon
            icon={faXmark}
            className="icone__close__modal"
            onClick={() => closeModal()}
          />

        </div>
        <div className="modal__form">
          <form action="" method="post" className="form__contact">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="input__text"
            />
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="input__text"
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="input__text"
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="6"
              className="input__textarea"
            ></textarea>

            <button className="submit">Envoyer</button>
          </form>
        </div>
      </div>
      <header className="header__photographer">
        <a href="/" className="link__logo">
          <img
            src="/assets/images/logo.webp"
            alt="logo"
            className="header__logo"
          />
        </a>
        <section className="header__presentation">
          <div className="header__presentation__content">
            <h1 className="photographer__name">{data.name}</h1>
            <p className="phtographer__location">
              {data.country}, {data.city}
            </p>
            <p className="phtographer__tagline">{data.tagline}</p>
          </div>
          <div className="contact__block">
            <button className="photographer__contact" onClick={openModal}>Contactez-moi</button>
          </div>
          <div className="picture__block">
            <img
              src={"/assets/images/photographers/thumbnails/" + data.portrait}
              alt=""
              className="photographer__thumbnail"
            />
          </div>
        </section>
      </header>
    </>
  )

}
