import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import style from './CreateActivity.module.css';
import { useHistory } from 'react-router-dom';
import { getActivitiesFromAPI, postActivitiesFromAPI, getCountriesFromAPI } from '../../store/actions';

const CreateActivity = () => {

  const dispatch = useDispatch()
  let { activities } = useSelector((state) => state.activities)
  const history = useHistory()
  let {countries} = useSelector(state => state.countries);
  const [ newActivity, setNewActivity] = useState({ 
    difficulty: 5,
  countryID: []});
  const [countriesName, setCountriesName] = useState([])


  useEffect(()=>{
    dispatch(getCountriesFromAPI());

  }, [activities])

  let regExpSoloLettersAndNumbers = /[^a-zA-Z0-9\s]/g;
  let regExpSoloLetters = /[^a-zA-Z\s]/g;

  function onRangeChange(e){ 
    e.preventDefault();
    setNewActivity({
      ...newActivity,
      difficulty: parseInt(e.target.value)
    })
  }

  let idCountries =  []

  function onChangeInputValue(e) {
    e.preventDefault()

    if(e.target.name === "countryID") {
      idCountries.push(e.target.value)
      setNewActivity({
        ...newActivity,
        countryID: [...newActivity.countryID, e.target.value]
      })
      console.log(e.target)
    } else {
      setNewActivity({
        ...newActivity,
        [e.target.name]: e.target.value,
      })
    }


  }

  function onSubmitNewActivity(e) {
    e.preventDefault();
    setNewActivity({
      ...newActivity,
      name: newActivity.name.trim(),
      duration: newActivity.duration.trim()
    })

    let messageGral = newActivity.name.length > 3 && newActivity.name.length > 3 ? "Perfecto" : "Pocos caracteres";
    let messageName = !regExpSoloLetters.test(newActivity.name) ? "Perfecto" : "Ingresar solo letras";
    let messageDuration = !regExpSoloLettersAndNumbers.test(newActivity.duration) ? "Perfecto" : "Ingresar solo letras y numeros";



    if(messageGral === 'Perfecto'){
      if(messageName === 'Perfecto' && messageDuration === 'Perfecto') {
        if(newActivity.countryID.length > 0 && newActivity.season){
          return dispatch(postActivitiesFromAPI(newActivity)), alert("Se creo las actividades en los paises")
        } else {
          return alert("No seleccionaste paises o una temporada")
        }

      } else {
        return alert(`Input name: ${messageName}. Input duration: ${messageDuration}`)
      }
    } else {
      return alert(messageGral);
    }
  }
  
  return (
    <div className={style.containerCreateActivity}>
      <form className={style.containerForm} onSubmit={onSubmitNewActivity}>
        <div>
          <label>Name:</label>
          <input type="text" placeholder='name' name='name' className={style.formValueInput} onChange={onChangeInputValue} />
        </div>
        <div>
          <label>Difficulty:</label>
          <span className={style.containerRange}>
            <input type="range" min="1" max="5" placeholder='difficulty' name='difficulty' className={style.formValueInput} onChange={onRangeChange} />
            <span>
              {newActivity.difficulty}
            </span>
          </span>
        </div>
        <div>
          <label>Duration:</label>
          <input type="text" placeholder='duration' name='duration' className={style.formValueInput} onChange={onChangeInputValue} />
        </div>
        <div>
          <label>Season:</label>
          <select name='season' className={style.formValueInput} onChange={onChangeInputValue}>
            <option>Season</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Spring">Spring</option>
            <option value="Autumn">Autumn</option>
          </select>
        </div>
        <div>
          <label>Countries:</label>
          <select name="countryID" className={style.formValueInput} onChange={onChangeInputValue}>
            {
              countries.map((country, index) => {
                return (
                  <option key={index} value={country.id}>{country.name}</option>
                )
              })
            }
          </select>
        </div>
        <input type="submit" value="CREATE ACTIVITY" className={style.buttonCreateActivity}/>
      </form>
      { newActivity.countryID.length > 0 &&
      <div className={style.containerCantCountries}>
        <ul>
        {
          (
            newActivity.countryID.map((countries, index) => {
              return (
                <li key={index}>{countries}</li>
              )
            })
          )

          }
        </ul>
        </div>
}
    </div>
  )
}

export default CreateActivity