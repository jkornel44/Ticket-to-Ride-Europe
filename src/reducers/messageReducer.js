import { ADD_MESSAGE, DELETE_MESSAGE } from "../actions/messageActions";

const initialState = [];

export const messageReducer = (state = initialState, action) => {
    const { type, payload } = action;

    if(type === ADD_MESSAGE) {
        return [payload, ...state];
    }

    if(type === DELETE_MESSAGE) {
        return state.splice(0,1);
    }

    return state;
}