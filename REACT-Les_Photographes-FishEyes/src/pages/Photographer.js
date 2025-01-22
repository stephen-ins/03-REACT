import Header from "../components/HeaderPhotographer";
import { useParams } from "react-router-dom";
import { getPhotographerById, getMediaPhotographerByID } from "../utils/api";
import Main from "../components/MainPhotographer";

const Photographer = () => {
  // useParams() est un composant de react router permettant de récupérer les paramètres de recherches dans l'URL
  // id renvoi l'id du photographe transmit dans l'URL
  const { id } = useParams();
  const dataPhotograph = getPhotographerById(id);
  // console.log(dataPhotograph);
  const dataMediasPhotograph = getMediaPhotographerByID(id);
  return (
    <>
      <Header data={dataPhotograph} />;
      <Main photographer={dataPhotograph} medias={dataMediasPhotograph} />
    </>
  );
};

export default Photographer;



