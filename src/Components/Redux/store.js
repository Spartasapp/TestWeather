import {createStore,applyMiddleware,combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import weatherReducer from './weatherReducer'

const reducer = combineReducers({
    weatherPage: weatherReducer
})

const store = createStore(reducer,applyMiddleware(thunkMiddleware));
export default store;