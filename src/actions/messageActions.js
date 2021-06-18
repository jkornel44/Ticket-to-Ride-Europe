
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
});

export const deleteMessage = (message) => ({
    type: DELETE_MESSAGE,
    payload: message,
});

