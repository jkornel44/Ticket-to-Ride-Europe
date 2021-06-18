import { useSelector } from 'react-redux';

import { Dest } from './Dest';  

import { getPlayers } from '../../../selectors/playersSelector';

export function Destination({ onSelectDest, uiid }) {
    const players = useSelector(getPlayers);
    const actualPlayer = players[uiid];

    const playerDestinations = actualPlayer.destinations;
    const longDest = actualPlayer.longDestination.flat(1);

    return (
        <>
            <Dest key={longDest[0][0]} datas={longDest[0][1]} onSelectDest={ onSelectDest } player={actualPlayer}/>
            {playerDestinations.map(dest => <Dest key={dest[0][0]} datas={dest[0][1]} onSelectDest={ onSelectDest } player={actualPlayer}/>)} 
        </>
    );
}