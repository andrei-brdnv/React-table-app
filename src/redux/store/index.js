import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import dataReducer from "../reducers/dataReducer";
import generateId from "../middleware/generate-id";
import logger from "../middleware/logger";
import filtersReducer from "../reducers/filtersReducer";

const reducer = combineReducers({
    data: dataReducer,
    filters: filtersReducer
})

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(generateId, logger),
    // other store enhancers if any
);

export const store = createStore(reducer, enhancer)