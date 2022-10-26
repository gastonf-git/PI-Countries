import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesFromAPI } from "../../store/actions";
import CountriesMap from "../../components/CountriesMap/CountriesMap";
import styles from "./Countrys.module.css";
import imageWorldMap from "../../assets/images/worldmap.png";
import world from "../../assets/images/world.png";
import Pagination from "../../components/Pagination/Pagination";




const Countrys = () => {

  let { paginationCountries } = useSelector((state) => state.countries)
  let {loading} = useSelector((state) => state.loading)
 
  let dispatch = useDispatch();
  let [pag, setPages] = useState(null); 


  useEffect(() => {
    dispatch(getCountriesFromAPI());
    setPages(0)
  }, []);

  function onChangePagination(e) {
    setPages(parseInt(e.target.value));
  }

  function onResetPagination(num){
    setPages(num)
  }

  return (
    <>
      <img
        src={imageWorldMap}
        alt="Imagen del mapa del mundo"
        className={styles.imageBackgroundWorld}
      />
        {loading
        ? (
          <div className={styles.containerLoading}>
            <h2>Loading ...</h2>
            <img src={world} alt="Imagen tipo dibujo del mundo" className={styles.loadingWorld} />
          </div>
        ) : (
          <section className={styles.containerCountries}>
            <Pagination countries={paginationCountries} onChangePagination={onChangePagination} numPag={pag}/>
            <CountriesMap countries={paginationCountries} onResetPagination={onResetPagination} numPag={pag}/>
            <Pagination countries={paginationCountries} onChangePagination={onChangePagination} numPag={pag}/>
          </section>
        )
        }


    </>
  );
};

export default Countrys;
