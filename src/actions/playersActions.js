import { changeActualPlayer, removeCardFromDeck, removeCardFromWagons, removeDestinationsFromDeck } from "./gameDataActions";
import { addMessage } from "./messageActions";

export const DRAW_WAGONS_FROM_DECK = 'DRAW_WAGONS_FROM_DECK';
export const DRAW_DESTINATIONS_FROM_DECK = 'DRAW_DESTINATIONS_FROM_DECK';
export const DRAW_LONGDESTINATIONS = 'DRAW_LONGDESTINATIONS';
export const DRAW_WAGONS_FROM_WAGONS = 'DRAW_WAGONS_FROM_WAGONS';
export const REMOVE_WAGONS = 'REMOVE_WAGONS';
export const INCREASE_ROUND = 'INCREASE_ROUND';
export const REMOVE_CARDS = 'REMOVE_CARDS';
export const ADD_TRACKS = 'ADD_TRACKS';
export const ADD_CARD ='ADD_CARD';
export const ADD_POINTS ='ADD_POINTS';
export const ADD_COMPLETED = 'ADD_COMPLETED';

export const ADD_PLAYER = 'ADD_PLAYER';

export const drawWagonsFromDeck = (player, deck) => ({
    type: DRAW_WAGONS_FROM_DECK,
    payload: {'player': player, 'cards': deck}
});

export const drawDestinationsFromDeck = (player, deck) => ({
    type: DRAW_DESTINATIONS_FROM_DECK,
    payload: {'player': player, 'cards': deck}
});

export const drawLongDestinations = (player, deck) => ({
    type: DRAW_LONGDESTINATIONS,
    payload: {'player': player, 'cards': deck}
});

export const drawWagonsFromWagons = (player, cards) => ({
    type: DRAW_WAGONS_FROM_WAGONS,
    payload: {'player': player, 'cards': cards}
});

export const addCard = (player, card) => ({
    type: ADD_CARD,
    payload: {'player': player, 'card': card}
});

export const removeWagons = (player, delta) => ({
    type: REMOVE_WAGONS,
    payload: {'player': player, 'delta': delta}
});

export const increaseRound = (player, delta) => ({
    type: INCREASE_ROUND,
    payload: {'player': player, 'delta': delta}
});

export const removeCards = (player, cards) => ({
    type: REMOVE_CARDS,
    payload: {'player': player, 'cards': cards}
});

export const addTracks = (player, tracks) => ({
    type: ADD_TRACKS,
    payload: {'player': player, 'tracks': tracks}
});

export const addPoints = (player, points) => ({
    type: ADD_POINTS,
    payload: {'player': player, 'points': points}
});

export const addCompletedDest = (player, dest) => ({
    type: ADD_COMPLETED,
    payload: {'player': player, 'dest': dest}
});

export const addPlayer = (player, name) => ({
    type: ADD_PLAYER,
    payload: {'player': player, 'name': name}
});



export const emitDrawWagonsFromDeck = (player ,deck, players, socket, roomID) => {
    socket.emit('sync-action', roomID, drawWagonsFromDeck(player, deck) , false);
    deck.splice(0, 1);
    socket.emit('sync-action', roomID, removeCardFromDeck(deck), false);
    socket.emit('sync-action', roomID, addMessage({'id': Date.now(), 'text': players[player].name  + ' kártyát húzott.'}), false);
};

export const emitDrawDestinationsFromDeck = (player ,deck, players, socket, roomID) => {
    socket.emit('sync-action', roomID, drawDestinationsFromDeck(player, deck) , false);
    deck.splice(0, 1);
    socket.emit('sync-action', roomID, removeDestinationsFromDeck(deck), false);
    socket.emit('sync-action', roomID, addMessage({'id': Date.now(), 'text': players[player].name  + ' új célt húzott.'}), false);
};

export const emitIncreaseRound = (player , delta, nextPlayer, socket, roomID) => {
    socket.emit('sync-action', roomID, increaseRound(player, delta), false);
    socket.emit('sync-action', roomID, changeActualPlayer(nextPlayer), false);
};

export const emitDrawWagonsFromWagons = (player ,cards, id, card, players, socket, roomID) => {
    socket.emit('sync-action', roomID, drawWagonsFromWagons(player, cards.filter((item) => item === card)), false);
    socket.emit('sync-action', roomID, removeCardFromWagons(id, cards), false);
    socket.emit('sync-action', roomID, addMessage({'id': Date.now(), 'text': players[player].name  + ' kártyát húzott.'}), false);
};

export const emitRemoveCards = (player, playerCards, card, socket, roomID) => {
    playerCards.splice((playerCards.flat(1).indexOf(card)),1);
    socket.emit('sync-action', roomID, removeCards(player, playerCards), false);
}

const initPlayers = (dispatch, playerCount, room) => {
    for(let i = 1; i <= playerCount; i++) {
        dispatch(addPlayer(i, room.players[i-1]));
    } 
}

const initWagonCards = (dispatch, playerCount, deck) => {
    for(let i = 1; i <= playerCount; i++) {
        for(let j = 0; j < 4; j++) {
            dispatch(drawWagonsFromDeck(i, deck));
        }  
    } 
}

const initDestinations = (dispatch, playerCount, dest, longDest) => {
    for(let i = 1; i <= playerCount; i++) {
        for(let j = 0; j < 5; j++) {
            dispatch(drawDestinationsFromDeck(i, dest));
        }
        dispatch(drawLongDestinations(i, longDest));
    } 
}

export const initPlayerState = (dispatch, room, deck, dest, longDest) => {
    initPlayers(dispatch, room.players.length, room);
    initWagonCards(dispatch, room.players.length, deck);
    initDestinations(dispatch, room.players.length, dest, longDest);
}