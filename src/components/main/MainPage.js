import { useState } from 'react';
import { useSpring, animated } from 'react-spring'

import logo from '../../assets/img/logo.png'; 
import { Start } from './Start';
import { JoinGameForm } from '../main/JoinGameForm';
import { NewGameForm } from '../main/NewGameForm';

export function MainPage( {socket, data, setData, room, setRoomData, isFull} ) {
    const [gameState, setState] = useState('START');

    const switchState = () => {
        switch(gameState) {
            case "START":   return <Start setGameState={setState}/>
            case "NEW":   return < NewGameForm  socket={socket} setData={setData} setGameState={setState} room={room} setRoomData={setRoomData}/>;
            case "JOIN" :   return < JoinGameForm socket={socket} data={data} setData={setData} setGameState={setState} room={room} setRoomData={setRoomData}  isFull={isFull}/>;
            default: return <Start setGameState={setState}/>
        }
    }  
    
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const styles = useSpring({
        config: { duration: 800, velocity: 0.1},
        to: { opacity: 1, y: 0},
        from: { opacity: 0, y: -40},
    });    
        
    return (
        <div className="content">

            <animated.img style={styles} src={logo} alt="Ticket to Ride logo" id="logo" width="400px" />
            { switchState() }
            <button id="rules_btn" className="button" onClick={() => openInNewTab('http://jatekdij.hu/tartalom/tarsasjatek/Ticket-to-ride-europa.pdf')} ><div className="gg-info "></div></button>
        </div>
    );
}