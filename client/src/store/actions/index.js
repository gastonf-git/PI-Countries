import axios from "axios";
import {
  GET_COUNTRIES_API,
  GET_COUNTRIES_SEARCH,
  SET_LOADING,
  SORT_COUNTRIES_POPULATION,
  SORT_COUNTRIES_ALPHABET,
  FILTER_COUNTRIES_CONTINENT,
  FILTER_COUNTRIES_ACTIVITIES,
  GET_ACTIVITIES_API,
  SORT_COUNTRIES_AREA,
} from "./actionTypes";

export function getCountriesFromAPI() {
  return function (dispatch) {
    dispatch(setLoading(true));
    axios
      .get("http://localhost:3001/countries")
      .then((countries) => {
        dispatch(setCountries(countries.data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchCountries(search) {
  return function (dispatch) {
    dispatch(setLoading(true));
    axios
      .get("http://localhost:3001/countries?name=" + search)
      .then((countries) => {
        dispatch({
          type: GET_COUNTRIES_SEARCH,
          payload: countries.data,
        });
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function setCountries(payload) {
  return {
    type: GET_COUNTRIES_API,
    payload,
  };
}

function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload: payload,
  };
}

export function sortPopulation(typeOrder) {
  return {
    type: SORT_COUNTRIES_POPULATION,
    payload: typeOrder,
  };
}

export function sortAlphabet(typeOrder) {
  return {
    type: SORT_COUNTRIES_ALPHABET,
    payload: typeOrder,
  };
}

export function filterContinent(typeFilter) {
  return {
    type: FILTER_COUNTRIES_CONTINENT,
    payload: typeFilter,
  };
}

export function filterActivities(typeFilter) {
  return {
    type: FILTER_COUNTRIES_ACTIVITIES,
    payload: typeFilter,
  };
}

export function getActivitiesFromAPI() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/activities")
      .then((activities) => {
        dispatch(setActivities(activities.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function setActivities(payload) {
  return {
    type: GET_ACTIVITIES_API,
    payload,
  };
}

export function postActivitiesFromAPI(activity) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/activities", activity)
      .then(() => {
        dispatch(getActivitiesFromAPI());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sortArea() {
  return {
    type: SORT_COUNTRIES_AREA,
  };
}
