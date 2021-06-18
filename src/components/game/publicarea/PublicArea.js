import { useDispatch, useSelector } from 'react-redux';

import { PublicCard } from './PublicCard';

import { emitDrawWagonsFromDeck, emitDrawWagonsFromWagons, emitIncreaseRound, emitDrawDestinationsFromDeck } from '../../../actions/playersActions';
import { emitFillWagonCards, emitFillWagonDeck, emitSetEmptyWagonCards, lastRound } from '../../../actions/gameDataActions'

import { getPlayers } from '../../../selectors/playersSelector';
import { fisherYates, getActualPlayer, getDestinationDeck, getGameState, getNextPlayer, getUsedCards, getWagonCards, getWagonDeck, hasTreeLocomotive } from '../../../selectors/gameDataSelectors';

export function PublicArea({userState, setState, setLast, lastPlayer, socket, room, uiid}) {
    const dispatch = useDispatch();

    const gameState = useSelector(getGameState);

    const players = useSelector(getPlayers);
    const actualPlayerID = useSelector(getActualPlayer);
    const usedCards = useSelector(getUsedCards);
    const wagonDeck = useSelector(getWagonDeck);
    const wagonCards = useSelector(getWagonCards);
    const actualPlayer = useSelector(getActualPlayer);
    const destinationDeck = useSelector(getDestinationDeck);
     
    const handleDrawFromWDeck = () => { 
        if(actualPlayerID === uiid) {
            if((userState.gameState === 'USER_MAIN' || userState.gameState === 'DRAW_FROM_DECK') && wagonDeck.length > 0) {   
            setState({
                    ...userState,
                        drawedCards: userState.drawedCards + 1,
                        gameState: 'DRAW_FROM_DECK'
                });
                
                emitDrawWagonsFromDeck(uiid, wagonDeck, players, socket, room.id);
                if(userState.drawedCards === 1) {
                    setState({
                        ...userState,
                            drawedCards: 0,
                            gameState: 'USER_MAIN'
                    });
                    emitIncreaseRound(uiid, 1, getNextPlayer(actualPlayer, room.players.length), socket, room.id);
                    lastRound(uiid, actualPlayerID, players, setLast, lastPlayer, gameState, dispatch, socket, room.id);
                }
            }
            isEmptyDeck();
        }
    }

    const handleDrawFromDestDeck = () => {  
        if(userState.gameState === 'USER_MAIN'  && destinationDeck.length > 0 && actualPlayerID === uiid) {   
            emitDrawDestinationsFromDeck(uiid, destinationDeck, players, socket, room.id);
            lastRound(uiid, actualPlayerID, players, setLast, lastPlayer, gameState, dispatch, socket, room.id);
            emitIncreaseRound(uiid, 1, getNextPlayer(actualPlayer, room.players.length), socket, room.id);
        }
    }

    const handleDrawFromCards = (id, card) => {
        if(actualPlayerID === uiid) {
            if(userState.gameState === 'DRAW_FROM_WAGONS' && card !== 'joker') {
                setState({
                    ...userState,
                        drawedCards: userState.drawedCards + 1,
                });

                emitDrawWagonsFromWagons(uiid, wagonCards, id, card, players, socket, room.id);

                if(userState.drawedCards === 1) {
                    setState({
                        ...userState,
                            drawedCards: 0,
                            gameState: 'USER_MAIN'
                    });
                    emitIncreaseRound(uiid, 1, getNextPlayer(actualPlayer, room.players.length), socket, room.id);
                    lastRound(uiid, actualPlayerID, players, setLast, lastPlayer, gameState, dispatch, socket, room.id);
                }   
            }  
            
            if((userState.gameState === 'USER_MAIN') && wagonCards.length > 0) {
                setState({
                    ...userState,
                        drawedCards: userState.drawedCards + 1,
                        gameState: 'DRAW_FROM_WAGONS'
                });
                emitDrawWagonsFromWagons(uiid, wagonCards, id, card, players, socket, room.id);

                if(card === 'joker') {
                    setState({
                        ...userState,
                            drawedCards: 0,
                            gameState: 'USER_MAIN'
                    });
                    emitIncreaseRound(uiid, 1, getNextPlayer(actualPlayer, room.players.length), socket, room.id);
                    lastRound(uiid, actualPlayerID, players, setLast, lastPlayer, gameState, dispatch, socket, room.id);
                }
            }

            if (wagonCards.length <= 5) {
                emitFillWagonCards(wagonDeck, socket, room.id);
                isEmptyDeck();
            }
        }
    }
    
    if(hasTreeLocomotive(wagonCards)) {
        emitSetEmptyWagonCards(wagonDeck, wagonCards, socket, room.id);
    }
    
    const isEmptyDeck = () => {
        if(wagonDeck.length === 0) {
            fisherYates(usedCards);
            emitFillWagonDeck(uiid, usedCards, socket, room.id);
        }
    }
    
    return (
        <div id="cards">
            <ul id="desk">  
                {wagonCards.map( (card, index) => <PublicCard color={card} onSelect={ () => handleDrawFromCards(index, card) } key={index}/>)}               
            </ul>
        
            <ul id="decks">                 
                < PublicCard color="wagons" onSelect={ handleDrawFromWDeck} />
                < PublicCard color="destinations" onSelect={ handleDrawFromDestDeck }/>
            </ul>
        </div>
    );
}
