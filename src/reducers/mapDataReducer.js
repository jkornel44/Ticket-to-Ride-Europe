import { SHOW_SELECTED_DEST_FROM, SHOW_SELECTED_DEST_TO, REMOVE_CONNECTION } from "../actions/mapDataActions";
import { importCities, importConnections } from "../selectors/mapDataSelector";

const initialState = {
    cities: importCities,
    shortDestinations: [],
    longDestinations: [],
    connections: importConnections,
    from: {},
    to: {} 
};

export const mapDataReducer = (state = initialState, action) => {
    const { type, payload } = action;

    if (type === SHOW_SELECTED_DEST_FROM) {
        return ({
            ...state,
                from: payload
        });
    }

    if (type === SHOW_SELECTED_DEST_TO) {
        return ({
            ...state,
                to: payload 
        });
    }

    if (type === REMOVE_CONNECTION) {
        const output = Object.entries(state.connections)
            .filter(([k, v]) => 
                v.id !== payload.id
            )
            .reduce((accum, [k, v]) => {
                accum[k] = v;
                return accum;
            }, {});
        
        return ({
            ...state,
               connections: output
        });
    }

    return state;
};
