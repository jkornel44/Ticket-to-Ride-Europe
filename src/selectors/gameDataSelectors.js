import { wagonCards } from '../constants/cards';
import { shortDestinations } from '../constants/destinations';
import { longDestinations } from '../constants/destinations';

export const getWagonCards = state => state.gameData.wagons;
export const getActualPlayer = state => state.gameData.actualPlayer;
export const getWagonDeck = state => state.gameData.wagonDeck;
export const getDestinationDeck = state => state.gameData.destinationDeck;
export const getUsedCards = state => state.gameData.usedCards;
export const getGameState = state => state.gameData.gameState;

export const getLongDestinations = state => state.gameData.longDests;

export const getNextPlayer = (actualPlayer, roomSize) => {
    if( actualPlayer < roomSize ) return actualPlayer + 1;
    else return 1;
}

export const initGameData = () => { 
    let wdeck = [];
    let ddeck = Object.entries(shortDestinations);
    let lddeck = Object.entries(longDestinations);

    initWagonDeck(wdeck);
    initDestDeck(ddeck);
    initDestDeck(lddeck);

    return ({
        gameState: 'GAME_BEGIN',
        wagonDeck: wdeck,
        destinationDeck: ddeck,
        longDests: lddeck,
        wagons: wdeck.splice(0,5),
        usedCards: [],
        actualPlayer: 1
    });
};

function initWagonDeck(deck) {
    let j = 0;
    Object.entries(wagonCards).map(
        s => {
            for(let i = 0; i < s[1]; i++) deck.push(s[0]);
        });
        fisherYates(deck);
}

function initDestDeck(deck) {
    fisherYates(deck);
}

export const fisherYates = (array) => {
    var count = array.length,
        randomnumber,
        temp;
    while( count ){
     randomnumber = Math.random() * count-- | 0;
     temp = array[count];
     array[count] = array[randomnumber];
     array[randomnumber] = temp
    }
}

export const hasTreeLocomotive = (cards) => {
    return cards.filter(c => c === "joker").length > 2;
};


