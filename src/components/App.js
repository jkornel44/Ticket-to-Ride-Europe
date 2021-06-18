import { useState } from 'react';
import { useDispatch } from 'react-redux';

import '../assets/style/style.css';

import { socketApi } from '../api/socket';
import { MainPage } from './main/MainPage';
import { WaitingRoom } from './wait/WaitingRoom';
import { GamePage } from './game/GamePage';

export function App() {
    const dispatch = useDispatch();
    const [socket] = useState(socketApi.connect());
    const [state, setGameState] = useState('MAIN_PAGE');
    const [uiid, setPlayerID] = useState(0);
    const [room, setRoomData] = useState({
        id: '',
        players: [],
        gameState: {},
    });


    socketApi.onRoomIsFull((resp) => {
        setRoomData(JSON.parse(resp.state));
        setPlayerID(resp.player);  
        setTimeout(() => {setGameState('IN_GAME')}, 1000);      
    });  

    socketApi.onActionSent((resp) => {
        dispatch(resp.action);
    });

    socketApi.onStateChanged((resp) => {
        setRoomData(resp.state)
    });

    const switchState = () => {
        switch(state) {
            case "MAIN_PAGE": return < MainPage socket={socket} data={state} setData={setGameState} room={room} setRoomData={setRoomData}/>;
            case "WAITING_FOR_PLAYERS": return < WaitingRoom socket={socket} setData= {setGameState} room={room} setRoomData={setRoomData}/>;
            case "IN_GAME": return < GamePage socket={socket} room={room} uiid={uiid} />;
            default: return;
        }
    }      
    return (
        <>
            { switchState() }
        </>
    );
}