import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Photographer from "./pages/Photographer";
import "./css/style.css";
import reportWebVitals from "./reportWebVitals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/photographer/:id/:search?" element={<Photographer />} />
      </Routes>
    </BrowserRouter>
  );

  // React routeur dom est un package permettant de définir les URL/routes de nos différentes pages/composant qui sont injecté dans le navigateur
  // :id : paramètre de recherche permettant de réceptionner un id d'un photographe (?id=82 ==> /82)
  // :search? : paramètre de recherche permettant de filtrer les médias photographes, le ? permet de spécifier que ce paramètre est facultatif
  // /photographer/82/date
}

const root = ReactDOM.createRoot(document.querySelector(".container"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
