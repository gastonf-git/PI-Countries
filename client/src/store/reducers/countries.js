import { ASCENDANT, A_Z } from "../../constants/sort";
import { GET_COUNTRIES_API, GET_COUNTRIES_SEARCH, SORT_COUNTRIES_POPULATION, SORT_COUNTRIES_ALPHABET, FILTER_COUNTRIES_CONTINENT, FILTER_COUNTRIES_ACTIVITIES, SORT_COUNTRIES_AREA } from "../actions/actionTypes";
import reOrderArrayPagination from "../../helpers/functions/reOrderArrayPagination";

const initialState = {
    countries: [],
    filteredCountries: [],
    paginationCountries: [],
}

export default function countries(state = initialState, {type, payload}){
    switch (type) {
        case GET_COUNTRIES_API:
            return {
                ...state,
                countries: payload,
                filteredCountries: payload,
                paginationCountries: reOrderArrayPagination(payload)
            }
        case GET_COUNTRIES_SEARCH:
            return {
                ...state,
                filteredCountries: payload,
                paginationCountries: reOrderArrayPagination(payload)
            }
        case SORT_COUNTRIES_POPULATION:
            let orderedPopulation = [...state.countries]

            orderedPopulation = orderedPopulation.sort((a, b) => {
                if(a.population < b.population) {
                    return payload === ASCENDANT ? -1 : 1;
                }
                if(a.population > b.population) {
                    return payload === ASCENDANT ? 1 : -1;
                }
                return 0;
            })

            return {
                ...state,
                filteredCountries: orderedPopulation,
                paginationCountries: reOrderArrayPagination(orderedPopulation)
            }
        case SORT_COUNTRIES_ALPHABET:
            let orderedAlphabet = [...state.countries]

            orderedAlphabet = orderedAlphabet.sort((a, b) => {
                if(a.name < b.name) {
                    return payload === A_Z ? -1 : 1;
                }
                if(a.name > b.name) {
                    return payload === A_Z ? 1 : -1;
                }
                return 0;
            })

            return {
                ...state,
                filteredCountries: orderedAlphabet,
                paginationCountries: reOrderArrayPagination(orderedAlphabet)
            }
        case FILTER_COUNTRIES_CONTINENT:
            let filteredContinent = [];
            state.countries.map((country) => {
                if(country.continent === payload) {
                    return filteredContinent.push(country)
                }
            })
            return {
                ...state,
                filteredCountries: filteredContinent,
                paginationCountries: reOrderArrayPagination(filteredContinent)
            }
        case FILTER_COUNTRIES_ACTIVITIES:
            let filteredActivities = [];
            state.countries.map((country) => {
                country.Activities.map((acitvity) => {
                    if(acitvity.name === payload) {
                        return filteredActivities.push(country);
                    }
                })
            })
            return {
                ...state,
                filteredCountries: filteredActivities,
                paginationCountries: reOrderArrayPagination(filteredActivities)
            }
        case SORT_COUNTRIES_AREA:
            let ordenedArea = [...state.countries]

            ordenedArea = ordenedArea.sort((a, b) => {
                if(a.area < b.area) {
                    return 1;
                }
                if(a.area > b.area) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                filteredCountries: ordenedArea,
                paginationCountries: reOrderArrayPagination(ordenedArea)
            }
        default:
            return state;
    }
}