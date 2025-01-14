import data from "../data/photographers.json";

export const getPhotographers = () => {
  // console.log(data);
  return data.photographers;
};

export const getPhotographerById = (id) => {
  // id : réceptionne l'id transmit dans l'URL
  // console.log(id);
  id = parseInt(id);
  const photographers = getPhotographers();
  const data = photographers.filter((photograph) => photograph.id === id);
  // console.log(data);
  return data[0];
};

// créer une fonction permettant de créer tout les médias du photographe en fonction de l'id transmit dans l'URL

export const getMediaPhotographerByID = (id, search) => {
  // console.log(id);
  id = parseInt(id);

  const medias = data.media;
  // console.log(medias);
  const datas = medias.filter((media) => media.photographerId === id);
  // console.log(datas);
  // console.log(search)

  if (search) {
    switch (search) {
      case 'Titre':
        datas.sort((a, b) => a.title.localeCompare(b.title))
        break;
      case "Popularité":
        datas.sort((a, b) => b.likes - a.likes)
        break;
      case 'Date':
        datas.sort((a, b) => new Date(b.date) - new Date(a.date))
        break;
    }
  }

  // console.log(datas)

  return datas;
};
