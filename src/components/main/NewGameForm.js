import { useState } from 'react';
import { useSelector } from 'react-redux';
import { emitSyncState } from '../../actions/gameDataActions';
import { getRootReducer } from '../../store/store';

export function NewGameForm({socket, setData, setGameState, room , setRoomData} ) {
    const rootState = useSelector(getRootReducer);
    const [value, setValue] = useState('');
    const [playerCount, setPlayerCount] = useState('2');

    const handleClick = s => { 
       socket.emit('create-room', playerCount,  (resp) => {
            if (resp.status === 'ok') {
                setData(s);
                setRoomData({
                    id: resp.roomId,
                    players: [...room.players, value],
                    gameState: rootState
                });
                
                emitSyncState({id: resp.roomId, players: [...room.players, value], gameState: rootState}, socket, resp.roomId);
                
            } else {
                setData('MAIN_PAGE');
            }
       });
    }

    function handleBack() {
        setGameState('START');
    } 

    return (
        <div id="container_newgame" className="container"> 
                <input 
                    type="text" 
                    placeholder="Név" 
                    value={ value } 
                    onChange={e => setValue(e.target.value)}
                />
                    
                <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min="2" 
                    max="5" 
                    placeholder="Játékosok száma:" 
                    onChange={e => setPlayerCount(e.target.value)}
                />
                    
                <button id="newgame_btn" className="button" 
                    onClick={handleClick.bind(this, 'WAITING_FOR_PLAYERS')}> 
                    Szoba létrehozása 
                </button>
                    
                <button id="back_btn" className="button" 
                    onClick={handleBack.bind(this)}> 
                    Vissza 
                </button>
        </div>
    );
}