import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHeart, faL } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import react from "react";



export default function Main(data) {
  // console.log(data);
  const photographer = data.photographer;
  // console.log(photographer)
  const medias = data.medias;
  // console.log(medias);

  // total likes
  let nbTotalLikes = 0
  medias.forEach((element) => {
    nbTotalLikes += element.likes
  })
  // console.log(nbTotalLikes)


  // [media, setMedia] :  le tableau retourné par la fonction useState() contient la valeur de l'état (state) et la fonction permettant de l'éditer.
  // media : la valeur de l'état que l'on va pouvoir utiliser partout dans le composant
  // setMedia : la fonction qui va permettre de mettre à jour l'état (setMedia(Nouvelle valeur))
  // initilaState (medias) : la valeur initial de l'état des médias. Si aucune valeur n'est fournie, l'état est initialisé à null.
  const [media, setMedia] = React.useState(medias)
  const handleLikes = (id) => {
    // console.log(id)

    // spead operator (permet de créer une copie du tableau des médias)
    const mediasCopy = [...medias]
    // On filtre les medias en fonction de l'id du media et l'id du media sur lequel on a cliqué
    mediasCopy.filter((media) => {
      // Si l'id du media est égal à l'id du media sur lequel on a cliqué, on incrémente le likes
      if (media.id == id) media.likes++
    })
    // On mets à jour l'état des medias (+likes) via la fonction setMedia
    setMedia(mediasCopy)
  }



  // Open dropdown filter
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    // console.log("jai cliqué");
    // !false -->true
    // !true -->false

    setOpen(!open);
  };

  // State LightBox
  const [openLightBox, setOpenLightBox] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  // console.log(index)

  // console.log(openLightBox)

  // console.log(open);


  // console.log(slides);

  const [category, setCategory] = React.useState("Popularité")
  const [mediasSearch, setMediasSearch] = React.useState(medias);
  const handleSearch = (search) => {
    // console.log(search)
    const mediasCopy = [...medias];
    // console.log(mediasCopy)


    switch (search) {
      case 'Titre':
        mediasCopy.sort((a, b) => a.title.localeCompare(b.title))
        break;
      case "Popularité":
        mediasCopy.sort((a, b) => b.likes - a.likes)
        break;
      case 'Date':
        mediasCopy.sort((a, b) => new Date(b.date) - new Date(a.date))
        break;
    }

    setMediasSearch(mediasCopy)
    setCategory(search)
    setOpen(false)

  }
  // console.log(mediasSearch)
  // console.log(category)



  const currentPath = `/assets/images/photographers/samplePhotos-Medium/${photographer.name}/`
  // console.log(currentPath)
  const slides = mediasSearch.map(({ image, video, title }) => ({
    // console.log(image);
    // console.log(video);
    // console.log(title);
    ...(image ? { src: currentPath + image, description: title } : { type: "video", description: title, controls: false, width: 1280, height: 720, loop: true, muted: true, autoPlay: true, sources: [{ src: currentPath + video, type: "video/mp4" }] })
  }));






  return (

    <>

      <Lightbox
        index={index}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        captions={{ descriptionTextAlign: "center" }}
        open={openLightBox}
        plugins={[Video, Thumbnails, Captions, Counter, Download, Fullscreen, Slideshow]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        close={() => setOpenLightBox(false)}
        slides={slides}
      />


      <main className="main__photographer">
        <div className="medias__sort">
          <p className="text__sort">Trier par</p>
          <div className="dropdown">
            <button
              className={
                open ? "button__dropdown active__radius" : "button__dropdown"
              }
              onClick={handleOpen}
            >
              <p className="button__dropdown__text">
                {category}
              </p>

              <FontAwesomeIcon
                icon={faChevronDown}
                className={open ? "fa-rotate-180" : ""}
              />
            </button>
            {open ? (
              <div className="dropdown__content">
                <div className="dropdown__item">
                  <span onClick={() => handleSearch(category == "Date" ? "Popularité" : "Date")} className="dropdown__link">
                    <hr className="separator" />
                    <span className="link__text">{category == "Date" ? "Popularité" : "Date"}</span>
                  </span>
                </div>
                <div className="dropdown__item">
                  <span onClick={() => handleSearch(category == "Titre" ? "Popularité" : "Titre")} className="dropdown__link">
                    <hr className="separator" />
                    <span className="link__text">{category == "Titre" ? "Popularité" : "Titre"}</span>
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <section className="galery">
          {mediasSearch.map((media, index) => (
            <figure className="card" key={media.id}>
              {media.image ? (
                <img
                  src={
                    "/assets/images/photographers/samplePhotos-Medium/" +
                    photographer.name +
                    "/" +
                    media.image
                  }
                  alt=""
                  className="galery__card__picture"
                  onClick={() => { setOpenLightBox(true); setIndex(index); }}

                />
              ) : (
                <video
                  className="card__video"
                  autoPlay
                  loop
                  muted
                  controls
                  src={
                    "/assets/images/photographers/samplePhotos-Medium/" +
                    photographer.name +
                    "/" +
                    media.video
                  }
                  onClick={() => setOpenLightBox(true)}
                ></video>
              )}

              <figcaption className="card__legend">
                <p className="picture__title">{media.title}</p>
                <div className="cards__likes">
                  <span className="nbLikes">{media.likes}</span>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icone__heart"
                    onClick={() => handleLikes(media.id)} />
                </div>
              </figcaption>
            </figure>
          ))}
        </section>

        <div className="block__likes">
          <p>
            <span className="nb__total__likes">{nbTotalLikes}</span>
            <FontAwesomeIcon
              icon={faHeart}
              className="icone__heart__likes" />
          </p>
          <p className="likes__price">{photographer.price}€ /jour</p>
        </div>
      </main>
    </>
  );
}
