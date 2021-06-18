import { emitThrowSelectedCard } from "./gameDataActions";
import { addMessage } from "./messageActions";
import { addPoints, addTracks, emitIncreaseRound, removeWagons } from "./playersActions";

export const SHOW_SELECTED_DEST_FROM = 'SHOW_SELECTED_DEST_FROM';
export const SHOW_SELECTED_DEST_TO = 'SHOW_SELECTED_DEST_TO';
export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';

export const showSelectedDestinationFrom = (data) => ({
    type: SHOW_SELECTED_DEST_FROM,
    payload: data
});

export const showSelectedDestinationTo = (data) => ({
    type: SHOW_SELECTED_DEST_TO,
    payload: data
});

export const removeBuiltConnection = (connection) => ({
    type: REMOVE_CONNECTION,
    payload: connection
});

export const emitShowSelectedDestinationFrom = (dest, socket, roomID) => {
    socket.emit('sync-action', roomID, showSelectedDestinationFrom(dest), false);
}

export const emitShowSelectedDestinationTo = (dest, socket, roomID) => {
    socket.emit('sync-action', roomID, showSelectedDestinationTo(dest), false);
}

export const emitResetSelectedDestinations = (setState, socket, roomID) => {
    socket.emit('sync-action', roomID, showSelectedDestinationFrom({}), false);
    socket.emit('sync-action', roomID, showSelectedDestinationTo({}), false);
    setState(resetUserState());
}

export const emitBuildTrack = (player, actualPlayer, setState, userState, nextPlayer, socket, roomID) => {
    socket.emit('sync-action', roomID, removeBuiltConnection(userState.route), false);
    socket.emit('sync-action', roomID, addTracks(player, userState.route), false);
    socket.emit('sync-action', roomID, removeWagons(player, userState.route.elements.length), false);
    socket.emit('sync-action', roomID, addPoints(player, getPoints(userState.route.elements.length)), false);
    socket.emit('sync-action', roomID, addMessage({'id': Date.now(), 'text': actualPlayer.name + ' utat épített ' + userState.route.fromCity +'-' + userState.route.toCity + ' vonalon.'}), false);
    emitIncreaseRound(player , 1, nextPlayer, socket, roomID);
    emitResetSelectedDestinations(setState, socket, roomID);
    throwSelectedCards(userState, socket, roomID);

    setState(resetUserState());
}

export const getRouteBetweenCities = (from, to, connections) =>{
    return Object.values(connections).filter((c) => (c.from === from.id && c.to === to.id) || (c.from === to.id && c.to === from.id));
 };

export const hasEnoughCards = (c, actualPlayer) => {
    if(c.color == 'gray') return true;
    return c.elements.length <=  actualPlayer.cards.filter(card => card == c.color  || card == 'joker').length;
}

const resetUserState = () => {
    return {
        gameState: 'USER_MAIN',
        route: {},
        selectedCards: [],
        drawedCards: 0,
}}

const throwSelectedCards = (userState, socket, roomID) => {
    userState.selectedCards.map(s => emitThrowSelectedCard(s, socket, roomID));
}

const getPoints = (distance) => {
    switch(distance) {
        case 1 : return 1;
        case 2 : return 2;
        case 3 : return 4;
        case 4 : 
        case 5 : return 7;
        case 6 : return 15;
        case 7 : return 21;
        
    }
}

export const find = (graph, source, target) => {
    let start = graph[source];
    
    let stack = [];
    stack.push(start);

    while(stack.length > 0) {
        let n = stack.pop();

        if (n.includes(`${target}`)) { 
            return 'completed';                
        } 

        let i = 0;
        let l = n.length;
        while(i < n.length) {
            stack.push(graph[n[i++]]);
        }
        
        for(let i = stack.length-1 ; i > stack.length-l-1 ; i--) {
            n.splice(n.indexOf(stack[i]))
        }
    }
    return 'notCompleted';
}


