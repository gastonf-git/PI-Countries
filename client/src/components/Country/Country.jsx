import React from "react";
import style from "./Country.module.css";
import { Link } from "react-router-dom";

const Country = ({ cca3, name, image, continent }) => {
  return (
    <div key={cca3} className={style.cardCountry}>
      <div className={style.containerImage}>
        <img src={image} alt={`Bandera de ${name}`} />
      </div>
      <div className={style.containerInfoCountry}>
        <div className={style.containerNameCountry}>
          <h4>{name}</h4>
        </div>
        <p className={style.continentName}>
          Continent: <span>{continent}</span>
        </p>
        <Link to={`/countries/countrydetail/${cca3}`} className={style.buttonLink}>Ver más</Link>
      </div>
    </div>
  );
};

export default Country;
