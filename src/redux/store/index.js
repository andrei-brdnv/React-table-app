import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import dataReducer from "../reducers/dataReducer";
import generateId from "../middleware/generate-id";
import logger from "../middleware/logger";
import filtersReducer from "../reducers/filtersReducer";
import hexToRgb from "../middleware/hexToRgb";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
    data: dataReducer,
    filters: filtersReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['data', 'filters']
}

const rootReducer = persistReducer(persistConfig, reducer)

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(generateId, logger, hexToRgb)
    // other store enhancers if any
);

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)