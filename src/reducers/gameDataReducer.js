import { REMOVE_CARD_FROM_WAGONS, FILL_WAGON_CARDS, SET_EMPTY_WAGON_CARDS, THROW_CARDS, CHANGE_STATE, CHANGE_ACTUAL_PLAYER, FILL_WAGON_DECK, INIT_GAME_DATA, REMOVE_CARD_FROM_DECK, REMOVE_DESTINATION_FROM_DECK } from '../actions/gameDataActions';
import { initGameData } from '../selectors/gameDataSelectors';

const initialState = initGameData();

export const gameDataReducer = (state = initialState, action) => {
    const { type, payload } = action;

    if (type === REMOVE_CARD_FROM_WAGONS) {
        return { 
            ...state,
            wagons: arrayRemove(payload['cards'], payload['id']) 
        };
    }

    if (type === FILL_WAGON_CARDS) {
        return { 
            ...state,
            wagons: [...state.wagons, payload.splice(0,1)].flat()
        };
    }

    if (type === SET_EMPTY_WAGON_CARDS) {
        return { 
            ...state,
            wagons: payload
        };
    }

    if (type === THROW_CARDS) {
        return {
            ...state, 
            usedCards: [...state.usedCards, payload]
        };
    }

    if (type === CHANGE_STATE) {
        return { 
            ...state,
            gameState: payload
        };
    }

    if (type === CHANGE_ACTUAL_PLAYER) {
        return { 
            ...state,
            actualPlayer: payload
        };
    }

    if (type === FILL_WAGON_DECK) {
        return ({ 
            ...state,
            wagonDeck : [...state.wagonDeck, ...payload],
            usedCards: []
        });
    }

    if (type === REMOVE_CARD_FROM_DECK) {
        return ({ 
            ...state,
            wagonDeck : payload,
        });
    }

    if (type === REMOVE_DESTINATION_FROM_DECK) {
        return ({ 
            ...state,
            destinationDeck : payload,
        });
    }


    if (type === INIT_GAME_DATA) {
        return payload;
    }

    return state;
};

function arrayRemove(arr, value) { 
    return arr.splice(arr.splice(value, 1));
}