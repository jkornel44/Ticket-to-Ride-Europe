import { applyMiddleware, combineReducers, createStore } from 'redux';
import {  composeWithDevTools } from 'redux-devtools-extension';
import { gameDataReducer} from '../reducers/gameDataReducer';
import { playersReducer} from '../reducers/playersReducer';
import { mapDataReducer} from '../reducers/mapDataReducer';
import { messageReducer} from '../reducers/messageReducer';
import thunk from 'redux-thunk';

export const getRootReducer = state => state;

const rootReducer = combineReducers({
    gameData: gameDataReducer,
    mapData : mapDataReducer,
    players : playersReducer,
    message : messageReducer
});

export const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default rootReducer;