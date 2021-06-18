import { useSelector } from 'react-redux';

import { PlayerTag } from './PlayerTag';
import { getPlayers } from '../../../selectors/playersSelector';
import { getActualPlayer } from '../../../selectors/gameDataSelectors';

export function Players({room}) {
    const players = useSelector(getPlayers);
    const playersData = Object.values(players);
    
    const keys = Object.keys(players);
    const actualPlayer = useSelector(getActualPlayer);

    const isActualPlayer = (id) => {
        return actualPlayer == id ? 'active' : 'inactive';
    } 
    
    return (

        <div id="opponents">
            { keys.filter(p => p <= room.players.length).map( p => < PlayerTag data={playersData[p-1]} mode={ isActualPlayer(p) } key={p}/>) }  
        </div>
    );
}