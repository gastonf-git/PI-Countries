import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
//import style from './CreateActivity.module.css';
import "./Form.css"
import { getActivitiesFromAPI, postActivitiesFromAPI, getCountriesFromAPI } from '../../store/actions';



const CreateActivity = () => {
    const[errorsValue, setErrorsValue] = useState({})

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");
    const [season, setSeason] = useState("");
    const [countryID, setCountryID] = useState([])

    let {countries} = useSelector(state => state.countries);

    
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getCountriesFromAPI())
    }, [])
    
    
    const handleSubmit =  (e) => {
        e.preventDefault()

       setErrorsValue(validateValue({countryID, name, difficulty, duration, season}))

       const error = validateValue({countryID, name, difficulty, duration, season})
       
       if(Object.values(error).length === 0){
            dispatch(postActivitiesFromAPI({name, difficulty, duration, season, countryID}))
            alert("Activity created")
            document.formAct.reset();
            setCountryID([])
       }
    }
 
    const removeCountry = (e) =>{
        setCountryID(countryID.filter(c => c !== e.target.name)
        )
        console.log(countryID)
    }

    function repetidos(array){
        return new Set(array).size!==array.length
    }
 

    //--- VALIDACIÓN ----

    function validateValue({countryID, name, duration, difficulty, season}){
        let errors = {}
        if(!name){
            errors.name = "Name is required"
        }else if(!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(name)){
            errors.name = "Name is invalid"
        }
        if(!duration || duration === "Duration"){
            errors.duration = "Duration is required"
        }
        if(!difficulty || difficulty === "Difficulty"){
            errors.difficulty = "Difficulty is required"
        }
        if(!season || season === "Season"){
            errors.season = "Season is required"
        }
        if(!countryID[0]){
            errors.countryID = "Country is required"
        }
        if(repetidos(countryID)){
            errors.countryID = "You cannot enter duplicate countries"
        }
        return errors;
    }
    

    
    return(
        
    <div className="divContainer"> 
        <form className="container" name="formAct" onSubmit={e => handleSubmit(e)}>
        <h1 className="newActivity">Create a New Activity</h1>

        {/* INPUT NAME */}

        <input className="activityName" name="name"  autoComplete="off" placeholder="Activity name..." onChange={e=> setName(e.target.value)}/>
        <p className="danger">{errorsValue.name}</p>
            
            {/* DURATION  */}

        <div>
        <select className="select" name="duration"  onChange={ e => setDuration(e.target.value)}>
            <option hidden selected>Duration</option>
            <option>30 min</option>
            <option>1 Hr</option>
            <option>2 Hrs</option>
            <option>3 Hrs</option>
            <option>4 Hrs</option>
            <option>5 Hrs</option>
        </select>
        <p className="danger">{errorsValue.duration}</p>
        </div>

        {/* DIFFICULTY */}

        <div >
         <select className="dif-ses" name="difficulty" onChange={ e =>  setDifficulty(e.target.value)}>
            <option hidden selected>Difficulty</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
         </select>

         {/* SEASON */}

         <select className="dif-ses" name="season"  onChange={e => setSeason(e.target.value)}>
            <option hidden selected>Season</option>
            <option>Winter</option>
            <option>Spring</option>
            <option>Summer</option>
            <option>Autumn</option>
         </select>
        <div className="difficulty-season">
        <span className="danger">{errorsValue.difficulty}</span>  <span className="danger">{errorsValue.season}</span>
        </div>
        </div>

        {/* COUNTRIES */}


        <div>
            <select className="select"
            onChange={ (e) => { 
                e.preventDefault(e)
                setCountryID([...countryID, e.target.value])
                }}>
                    <option hidden>Countries</option>
                {
                    countries?.map(c =>{
                        return(
                        <option key={c.name} name={c.name} value={c.id} >{c.name}</option>
                        )
                    }
                    )
                }
            </select>
            <p className="danger">{errorsValue.countryID}</p>
        </div>
        <div>
        <button type="submit" className="createActivity">Create Activity</button>
        </div>
        </form>

        {/* COUNTRIES LIST */}

        <div className="countriesList">
            <ul>
            {
                countryID?.map((el) => {
            
                    let name = countries?.map((e) =>  e.id === el? e.name : null  )
                    return ( 
                        <div>
                    <span key={el.id} className="lista">{name}</span>
                    <button name={el}className="closeButton" onClick={(e) => { removeCountry(e) }}>❌</button>
                    </div>
                )
    
                })
            }
            </ul>
        </div>
    </div>


  
)
        }


export default CreateActivity