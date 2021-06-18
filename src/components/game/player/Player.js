import { Destination } from './Destination';
import { PlayerCard } from './PlayerCard';
import { useSelector } from 'react-redux';
import { getPlayers } from '../../../selectors/playersSelector';
import { Build } from './Build';

export function Player({ onSelectDest, userState, handleClick, handleContext, onBuild, onReset, uiid}) {
    const players = useSelector(getPlayers);
    const playerData = Object.values(players);
    const playerCards = playerData[uiid-1].cards;

    const colors = ['red','black','white','blue','green','yellow','purple','orange','joker'];

    const getOccurrences = (color) => {
        return playerCards.flat(1).filter(card => card === color).length;
    }

    return (
        <div id="player">
            {userState.gameState !== 'CHOOSE_CARDS' ?  
            <ul id="myDestinations">
                < Destination onSelectDest = {onSelectDest} uiid={uiid}/>
            </ul>
                : 
            <Build route={userState.route} selectedCards={userState.selectedCards} onBuild={onBuild} onReset={onReset}/>         
            }
            <ul id="cardlist">       
                { colors.map(color => getOccurrences(color) > 0 ? <PlayerCard handleClick={handleClick} handleContext={handleContext} number={getOccurrences(color)} color={color} key={color}/> : '')}                 
            </ul>
        </div>
    );
}