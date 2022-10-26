import { combineReducers } from "redux"
import loading from "./loading";
import countries from "./countries";
import activities from "./activities";

const reducer = combineReducers({ countries, loading, activities });

export default reducer;