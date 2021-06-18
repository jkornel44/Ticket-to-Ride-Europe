import { useState } from 'react';
import { emitSyncState } from '../../actions/gameDataActions';

export function JoinGameForm({socket, data, setData, setGameState, room, setRoomData} ) { 
    const [value, setValue] = useState('');
    const [PIN, setPIN] = useState('');
    
    const handleClick = s => {  
        socket.emit('join-room', PIN, (resp) => {
            if (resp.status === 'ok') {
                let datas = JSON.parse(resp.state);
                setData(s);
                setRoomData({
                    id: PIN,
                    players: [...datas.players, value],
                    gameState: datas.gameState
                });
                
                emitSyncState({id: PIN, players: [...datas.players, value], gameState: datas.gameState}, socket, PIN)

            } else {
                setData('MAIN_PAGE');
            }
        })
    }

    function handleBack() {
        setGameState('START');
    } 

    return (
        <div id="container_joingame" className="container"> 
                <input 
                    type="text" 
                    placeholder="Név" 
                    value={ value } 
                    onChange={e => setValue(e.target.value)}
                />

                <input 
                    type="text" 
                    id="roomid" 
                    name="roomid" 
                    placeholder="Game PIN" 
                    onChange={e => setPIN(e.target.value)}
                />

                <button id="newgame_btn" className="button" 
                    onClick={handleClick.bind(this, 'WAITING_FOR_PLAYERS')}> 
                    Csatlakozás 
                </button>
                
                <button id="back_btn" className="button" 
                    onClick={handleBack.bind(this)}> 
                    Vissza 
                </button>
        </div>
    );
}