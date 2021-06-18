import logo from '../../assets/img/logo.png'; 

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { GameTable } from './gameTable/GameTable'
import { History } from './history/History';
import { Player } from './player/Player';
import { Players } from './playertags/Players';
import { PublicArea } from './publicarea/PublicArea';
import { Scoreboard } from './ScoreBoard';

import { getActualPlayer, getDestinationDeck, getGameState, getLongDestinations, getUsedCards, getWagonDeck, getNextPlayer } from '../../selectors/gameDataSelectors';
import { getConnections, getSelectedDestinationFrom } from '../../selectors/mapDataSelector';
import { getPlayers } from '../../selectors/playersSelector';

import { addCard, emitRemoveCards, initPlayerState } from '../../actions/playersActions';
import { changeState, initGameData, lastRound } from '../../actions/gameDataActions';
import { getRouteBetweenCities, emitShowSelectedDestinationFrom, emitShowSelectedDestinationTo, emitResetSelectedDestinations, hasEnoughCards, emitBuildTrack } from '../../actions/mapDataActions';

export function GamePage({socket, room, uiid}) {
    const dispatch = useDispatch();

    const [selectedDest, setSelectedDest] = useState('');
    const [lastPlayer, setLast] = useState('');
    const [userState, setState] = useState({
        gameState: 'USER_MAIN',
        route: {},
        selectedCards: [],
        drawedCards: 0,
    });

    const gameState = useSelector(getGameState);
    
    if(gameState === 'GAME_BEGIN') dispatch(initGameData(room.gameState.gameData));

    const usedCards = useSelector(getUsedCards);
    const longDestinations = useSelector(getLongDestinations);
    const wagonDeck = useSelector(getWagonDeck);
    const players = useSelector(getPlayers);
    const actualPlayerID = useSelector(getActualPlayer);
    const destinationDeck = useSelector(getDestinationDeck);
    const connections = useSelector(getConnections);
    const destinationFrom = useSelector(getSelectedDestinationFrom);

    const getSelectedDest = (dest) => {
        setSelectedDest(dest);
    };

    switch(gameState) {
        case 'GAME_BEGIN' : 
            initPlayerState(dispatch, room, wagonDeck, destinationDeck, longDestinations);
            dispatch(changeState('IN_GAME'));
            break;
    }

    const actualPlayer = players[uiid];
    const playerCards = players[uiid].cards;

    console.log(actualPlayer.completed);
    
    const handleSelectFrom = (dest) => { 
        if(actualPlayerID === uiid) {
            if(userState.gameState === 'USER_MAIN') {
                emitShowSelectedDestinationFrom(dest, socket, room.id);
    
                setState({
                    ...userState,
                        gameState: 'SELECT_DEST'
                });  
            }
    
            if(userState.gameState === 'SELECT_DEST') {
                emitShowSelectedDestinationTo(dest, socket, room.id);
                
                if(getRouteBetweenCities(destinationFrom, dest, connections).length > 0) {
                    getRouteBetweenCities(destinationFrom, dest, connections).map( c => {
                        if(hasEnoughCards(c, actualPlayer)) {
                            
                            setState({
                                ...userState,
                                    gameState: 'CHOOSE_CARDS',
                                    route: c
                            });
    
                        } else {
                            emitResetSelectedDestinations(setState, socket, room.id);
                        }
                    });
                }             
            } 
        }
    }

    const handleClick = (card) => {   
        if(actualPlayerID === uiid) {
            if(userState.route.color === 'gray') {
                if( userState.gameState === 'CHOOSE_CARDS' && userState.selectedCards.filter(c => c !== 'joker').length === 0 ) {
                    emitRemoveCards(uiid, playerCards, card, socket, room.id);
    
                    setState({
                        ...userState,
                            selectedCards: [...userState.selectedCards, card]
                    });

                } else if( userState.gameState === 'CHOOSE_CARDS'  && (userState.selectedCards.find(c => c !== 'joker') === card || card === 'joker') ) {
                    emitRemoveCards(uiid, playerCards, card, socket, room.id);

                    setState({
                        ...userState,
                            selectedCards: [...userState.selectedCards, card]
                    });
                }
            } else {
                if ( userState.gameState === 'CHOOSE_CARDS'  && (userState.route.color === card || card === 'joker')) {
                    emitRemoveCards(uiid, playerCards, card, socket, room.id);

                    setState({
                        ...userState,
                            selectedCards: [...userState.selectedCards, card]
                    });
                } else {

                }
            }
            lastRound(uiid, actualPlayerID, players, setLast, lastPlayer, gameState, dispatch, socket, room.id);
        }
    }

    const handleContext = (card) => {       
        setState({
            ...userState,
                selectedCards:   userState.selectedCards.splice(userState.selectedCards.indexOf(card),1)
        });
    }

    const onBuild = () => {
        if(actualPlayerID === uiid && actualPlayer.wagons >= userState.selectedCards.length) {
            lastRound(uiid, actualPlayerID, players, setLast, lastPlayer, gameState, dispatch, socket, room.id);
            emitBuildTrack(uiid, actualPlayer, setState, userState, getNextPlayer(actualPlayerID, room.players.length), socket, room.id);
        }
    }

    const onReset = () => {
        emitResetSelectedDestinations(setState, socket, room.id);
        resetSelectedCards();
    }

    const resetSelectedCards = () => {
        userState.selectedCards.map(s => dispatch(addCard(actualPlayerID, s)));
    }

    return (
        <div className="game">
            <header>
                <img src= { logo } alt="Ticket to Ride logo" id="logo" width="300px"/>
            </header>
            
            {gameState !== 'END_GAME' ? 
                <>
                    < GameTable destination={ selectedDest } userState={userState} setState={setState} onSelect={handleSelectFrom}/>
                    < PublicArea userState={userState} setState={setState} setLast={setLast} lastPlayer={lastPlayer} socket={socket} room={room} uiid={uiid}/>
                    < Players room={room}/>
                    < History />
                    < Player onSelectDest={ getSelectedDest } userState={userState} setState={setState} handleClick={handleClick} handleContext={handleContext} onBuild={onBuild} onReset={onReset} uiid={uiid}/>   
                </>   
                : 
                <>
                    < Scoreboard room={room}/>
                </>
            } 
        </div>
    );
}