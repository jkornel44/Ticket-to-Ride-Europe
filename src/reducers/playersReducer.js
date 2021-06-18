import { DRAW_WAGONS_FROM_DECK, DRAW_DESTINATIONS_FROM_DECK, DRAW_WAGONS_FROM_WAGONS, REMOVE_WAGONS, INCREASE_ROUND, REMOVE_CARDS, ADD_TRACKS, ADD_CARD, ADD_POINTS, ADD_COMPLETED, DRAW_LONGDESTINATIONS, ADD_PLAYER } from '../actions/playersActions';

const initialState = {
    1 : {
        id: 1,
        name: 'player1',
        points: 0,
        cards: [],
        wagons: 45,
        destinations: [],
        longDestination: [],
        tracks: [],
        rounds: 0,
        color: 'red',
        completed: []
    },
    2 : {
        id: 2,
        name: 'player2',
        points: 0,
        cards: [],
        wagons: 45,
        destinations: [],
        longDestination: [],
        tracks: [],
        rounds: 0,
        color: 'green',
        completed: []
    },
    3 : {
        id: 3,
        name: 'player3',
        points: 0,
        cards: [],
        wagons: 45,
        destinations: [],
        longDestination: [],
        tracks: [],
        rounds: 0,
        color: 'yellow',
        completed: []
    },
    4 : {
        id: 4,
        name: 'player4',
        points: 0,
        cards: [],
        wagons: 45,
        destinations: [],
        longDestination: [],
        tracks: [],
        rounds: 0,
        color: 'purple',
        completed: []
    },
    5 : {
        id: 5,
        name: 'player5',
        points: 0,
        cards: [],
        wagons: 45,
        destinations: [],
        longDestination: [],
        tracks: [],
        rounds: 0,
        color: 'blue',
        completed: []
    }
};

export const playersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    if( type === DRAW_WAGONS_FROM_DECK )  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                cards: [...state[payload.player].cards, payload.cards.splice(0, 1)]
            }
        };
    }

    if( type === DRAW_DESTINATIONS_FROM_DECK )  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                destinations: [...state[payload.player].destinations, payload.cards.splice(0,1)]
            }
        };
    }

    if( type === DRAW_LONGDESTINATIONS )  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                longDestination: [...state[payload.player].longDestination, payload.cards.splice(0,1)]
            }
        };
    }

    if( type === DRAW_WAGONS_FROM_WAGONS )  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                cards: [...state[payload.player].cards, payload.cards.splice(0, 1)]
            }
        };
    }

    if( type === ADD_CARD )  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                cards: [...state[payload.player].cards, payload.card]
            }
        };
    }

    if( type === REMOVE_WAGONS)  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                wagons: state[payload.player].wagons - payload.delta
            }
        };
    }

    if( type === INCREASE_ROUND)  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                rounds: state[payload.player].rounds + payload.delta
            }
        };
    }

    if( type === REMOVE_CARDS)  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                cards: payload.cards
            }
        };
    }

    if( type === ADD_TRACKS)  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                tracks: [...state[payload.player].tracks, payload.tracks]
            }
        };
    }

    if( type === ADD_POINTS)  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                points: state[payload.player].points + payload.points
            }
        };
    }

    if( type === ADD_COMPLETED)  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                conpleted: [...state[payload.player].completed, payload.dest]
            }
        };
    }

    if( type === ADD_PLAYER)  {
        return {
            ...state,
            [payload.player]: {
                ...state[payload.player],
                name: payload.name
            }
        };
    }

    return state;
};