import { GET_ACTIVITIES_API } from "../actions/actionTypes";

const initialState = {
    activities: []
}

export default function activities(state = initialState, {type, payload}){
    switch (type) {
        case GET_ACTIVITIES_API:
            return {
                ...state,
                activities: payload,
            }
        default:
            return state;
    }
}