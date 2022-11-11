import React, { useEffect, useState, useRef } from "react";
import style from "./Filters.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { searchCountries, sortPopulation, sortAlphabet, filterContinent, filterActivities, getActivitiesFromAPI, setCountriesPagination, sortArea } from "../../store/actions";
import { ASCENDANT, DESCENDANT, A_Z, Z_A } from "../../constants/sort";


const Filters = () => {

  let { activities } = useSelector((state) => state.activities)
  let [ inputSearch, setInputSearch] = useState('');
  const dispatch = useDispatch();
  const inputSearchRef = useRef()

  useEffect(() => {
    dispatch(getActivitiesFromAPI())
  }, [])

  useEffect(() => {
    if(activities.length > 0) {
      console.log("tengo activities")
    }
  }, [activities])



  let filter = activities.map((activity) => {
    return activity.name
  })

  let arrayActivitiesNameFiltered = filter.filter((name,index)=>{
    return filter.indexOf(name) === index;
  })



  function onChangeInputSearch(e) {
    e.preventDefault();
    setInputSearch(e.target.value);
  }

  // console.log(inputSearch.length)

  function onSearchSubmit(e) {
    e.preventDefault();
    const regExpSoloLetters = /[^a-zA-Z\s]/g;
    setInputSearch(inputSearch.trim())
    if(inputSearch.length >= 3) {
      if(!regExpSoloLetters.test(inputSearch)) {
        return dispatch(searchCountries(inputSearch));
      } else {
        return alert("Ingrese solo letras");
      }
    } else {
      return alert("Ingrese 3 o mas letras");
    }

  }

  function onSelectSortChange(e) {
    e.preventDefault();
    if (e.target.name === 'population' && e.target.value !== 'Population') {
      dispatch(sortPopulation(e.target.value))
    }
    if (e.target.name === 'alphabet' && e.target.value !== 'Alphebet') {
      dispatch(sortAlphabet(e.target.value))
    }

  }

  function onSelectFilterChange(e) {
    e.preventDefault();
    if(e.target.name === 'continent' && e.target.value !== 'Continents') {
      dispatch(filterContinent(e.target.value));
    }
    if(e.target.name === 'activities' && e.target.value !== 'Activities') {
      dispatch(filterActivities(e.target.value));
    }
  }

  function onChangeArea(){
    dispatch(sortArea())
  }

  let newbutton = <button onClick={onChangeArea}>Sort Area</button>;

  return (
    <div className={style.filterContainer}>
      <div className={style.containerForms}>
        <form className={style.formSearch} onSubmit={onSearchSubmit}>
          <input type="text" name="search" ref={inputSearchRef} placeholder="Search here..." className={style.inputSearch} onChange={onChangeInputSearch} />
          <input type="submit" value="SEARCH" className={style.buttonSearch}/>
        </form>
        <div className={style.containerOrderSelect}>
          <label>Sort</label>
          <select name="alphabet" onChange={onSelectSortChange}>
            <option>Alphabet</option>
            <option value={A_Z}>A-Z</option>
            <option value={Z_A}>Z-A</option>
          </select>
          <select name="population" onChange={onSelectSortChange}>
            <option>Population</option>
            <option value={ASCENDANT}>Ascendant</option>
            <option value={DESCENDANT}>Descendant</option>
          </select>
        </div>

        <div className={style.containerFilterSelect}>
          <label>Filter</label>
          <select name="continent" onChange={onSelectFilterChange}>
            <option >Continents</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select name="activities" onChange={onSelectFilterChange}>
            { arrayActivitiesNameFiltered.length > 0 ? (<option>Activities</option>) : (<option>No activities</option>)}
            { arrayActivitiesNameFiltered.length > 0 &&
              arrayActivitiesNameFiltered.map((nameActivity, index) => {
                return (
                  <option key={index} value={nameActivity}>{nameActivity}</option>
                )
              })
            }
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
