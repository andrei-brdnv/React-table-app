import { createStore, combineReducers } from "redux";
import dataReducer from "../reducers/dataReducer";

/*const reducer = combineReducers({
    data: dataReducer
})*/

export const store = createStore(dataReducer)