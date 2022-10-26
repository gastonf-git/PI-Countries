import { SET_LOADING } from "../actions/actionTypes";

const initialState = {
    loading: false
}

export default function loading(state=initialState, {type, payload}) {
  switch (type) {
    case SET_LOADING:
      return {...state, loading: payload}
    default:
      return state;
  }
}