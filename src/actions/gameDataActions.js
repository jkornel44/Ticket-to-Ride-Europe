export const REMOVE_DESTINATION_FROM_DECK = 'REMOVE_DESTINATION_FROM_DECK';
export const REMOVE_CARD_FROM_WAGONS = 'REMOVE_CARD_FROM_WAGONS';
export const FILL_WAGON_CARDS = 'FILL_WAGON_CARDS';
export const SET_EMPTY_WAGON_CARDS = 'SET_EMPTY_WAGON_CARDS';
export const THROW_CARDS = 'THROW_CARDS';

export const CHANGE_STATE = 'CHANGE_STATE';
export const CHANGE_ACTUAL_PLAYER = 'CHANGE_ACTUAL_PLAYER';
export const FILL_WAGON_DECK = 'FILL_WAGON_DECK';
export const REMOVE_CARD_FROM_DECK = 'REMOVE_CARD_FROM_DECK';

export const INIT_GAME_DATA = 'INIT_GAME_DATA';

export const removeCardFromWagons = (id, cards) => ({
    type: REMOVE_CARD_FROM_WAGONS,
    payload: {'id': id, 'cards': cards}
});

export const fillWagonCards = (deck) => ({
    type: FILL_WAGON_CARDS,
    payload: deck
});

export const setEmptyWagonCards = (cards) => ({
    type: SET_EMPTY_WAGON_CARDS,
    payload: cards
});

export const throwCards = (cards) => ({
    type: THROW_CARDS,
    payload: cards
});

export const changeState = (gameState) => ({
    type: CHANGE_STATE,
    payload: gameState
});

export const changeActualPlayer = (id) => ({
    type: CHANGE_ACTUAL_PLAYER,
    payload: id
});

export const fillWagonDeck = (deck) => ({
    type: FILL_WAGON_DECK,
    payload: deck
});

export const removeCardFromDeck = (deck) => ({
    type: REMOVE_CARD_FROM_DECK,
    payload: deck
});

export const removeDestinationsFromDeck = (deck) => ({
    type: REMOVE_DESTINATION_FROM_DECK,
    payload: deck
});

export const initGameData = (data) => ({
    type: INIT_GAME_DATA,
    payload: data
})

export const emitFillWagonCards = async (deck, socket, roomID) => {
    socket.emit('sync-action', roomID, fillWagonCards(deck) , false);
    deck.splice(0, 1);
    socket.emit('sync-action', roomID, removeCardFromDeck(deck), false);
};

export const emitSetEmptyWagonCards = (wagonDeck, wagonCards, socket, roomID) => {
    socket.emit('sync-action', roomID, setEmptyWagonCards([]), false);
    socket.emit('sync-action', roomID, throwCards(wagonCards), false);
    for(let i = 0; i < 5; i++) {
        fillWagonCards(wagonDeck);
    }
}

export const emitFillWagonDeck = (player, usedCards, socket, roomID) => {
    socket.emit('sync-action', roomID, fillWagonDeck(usedCards), false);
}

export const emitLastRound = (socket, roomID) => {
    socket.emit('sync-action', roomID, changeState('END_GAME'), false);
}

export const emitThrowSelectedCard = (card, socket, roomID) => {
    socket.emit('sync-action', roomID, throwCards(card), false);
}

export const emitCloseRoom = (socket, roomID) => {
    socket.emit('close-room', roomID);   
}

export const emitLeaveRoom = (socket, roomID) => {
    socket.emit('leave-room', roomID);   
}

export const emitSyncState = (state, socket, roomID) => {
    socket.emit('sync-state', roomID, state, false);
}

export const getPlayerColor = (num) => {
    switch(num) {
        case 0 : return '#e07a5f';
        case 1 : return '#81b29a';
        case 2 : return '#ffd166';
        case 3 : return '#9a8c98';
        case 4 : return '#3d405b';
        default: return 'white';
    }
} 

export const lastRound = (player, actualPlayerID, players, setLast, lastPlayer, gameState, dispatch, socket, roomID) => {
    if (players[player].wagons <= 2) {  
        if (gameState === 'LAST_ROUND' && lastPlayer == actualPlayerID) {
            emitLastRound(socket, roomID);
        }

        if(lastPlayer === '') {
            setLast(player);
            dispatch(changeState('LAST_ROUND'));
        } 
        
    }
}
