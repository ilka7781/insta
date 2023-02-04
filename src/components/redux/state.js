import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer} from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    allState: reducer
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));