import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from './CountryDetail.module.css'
import imageWorldMap from "../../assets/images/worldmap.png";


const CountryDetail = () => {
  let [ country, setCountryDetail] = useState({});
  const [activities, setActivities] = useState([])
  let { id } = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:3001/countries/${id}`).then((response) => {
      let { data } = response;

      setCountryDetail(data);
      setActivities(data.Activities)

    });

  }, [])

  console.log(activities)
  return (
    <div className={style.containerCountryDetail}>
      <img
        src={imageWorldMap}
        alt="Imagen del mapa del mundo"
        className={style.imageBackgroundWorld}
      />
      <div className={style.containerInfoCountry}>
        <div>
          <img src={country.image} alt={`Imagen de ${country.name}`} className={style.imageFlag} />
        </div>
        <div className={style.containerText}>
          <h2><span className={style.nameCountry}>Name:</span> {country.name}</h2>
          <h4><span className={style.infoTextCountry}>Country code (CCA3):</span> {country.id}</h4>
          <h4><span className={style.infoTextCountry}>Continent:</span> {country.continent}</h4>
          <h4><span className={style.infoTextCountry}>Subregion:</span> {country.subregion}</h4>
          <h4><span className={style.infoTextCountry}>Population:</span> {country.population} habitants.</h4>
          <h4><span className={style.infoTextCountry}>Area:</span> {country.area} km2</h4>
        </div>
      </div>
      { activities.length > 0 &&
      (
        <div className={style.containerActivities}>
            <h2 className={style.textActivity}>Activities: </h2>
            <div className={style.containerAllActivity}>
              {
                activities.map((activity) => {
                  return (
                    <div key={activity.id} className={style.cardActivity}>
                      <h3>{activity.name}</h3>
                      <div className={style.cardInfoActivity}>
                        <h4><span className={style.infoTextActivity}>Difficulty: </span> Level {activity.difficulty}</h4>
                        <h4><span className={style.infoTextActivity}>Duration: </span>{activity.duration}</h4>
                        <h4><span className={style.infoTextActivity}>Season: </span>{activity.season}</h4>
                      </div>
                    </div>
                  )
                })
              }
            </div>
        </div> 
      )
      }
    </div>
  )
}

export default CountryDetail