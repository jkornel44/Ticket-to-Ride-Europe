import { useSelector } from 'react-redux';

import { Dest } from './player/Dest'; 

import { getPlayers } from '../../selectors/playersSelector';
import { find } from '../../actions/mapDataActions';


export function Scoreboard({room}) {

    const players = useSelector(getPlayers);
    const onSelectDest = () => {}   

    function renderTableData() {
        return Object.values(players).splice(0, room.players.length).map((p) => {
           return (
              <div className='columnWrapper'>
                <th>{p.name}</th>
                    <tr>
                        <td><Dest key={p.longDestination.flat(1)[0][0]} datas={p.longDestination.flat(1)[0][1]} onSelectDest={ onSelectDest } player={p}/><p>{p.longDestination.flat(1)[0][1].value}</p></td>
                    </tr>
                {p.destinations.map(d => 
                    <tr>
                        <td><Dest key={d[0][0]} datas={d[0][1]} onSelectDest={onSelectDest} player={p}/> <p>{d[0][1].value} </p></td>
                    </tr>
                )}
                <tr>
                    <td>
                       <li id='points'>utak pontszáma: {p.points}</li> 
                    </td>
                </tr>    
                <tr>
                    <td>
                        <li id='points'>célok pontszáma: {
                            p.destinations
                                .map(d => parseInt(d[0][1].value))
                                .reduce(function(acc, val) { return acc + val; }, 0) -
                            p.destinations
                                .map(d => parseInt(d[0][1].value))
                                .reduce(function(acc, val) { return acc + val; }, 0)
                        }</li> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <li id='result'>összesen: {
                            p.points + 
                            p.completed
                                .map(c => parseInt(c[0][1].value))
                                .reduce(function(acc, val) { return acc + val; }, 0) -
                            p.destinations
                                .map(d => parseInt(d[0][1].value))
                                .reduce(function(acc, val) { return acc + val; }, 0)
                        }</li> 
                    </td>
                </tr>
              </div>
           )
        })
    }

    return(
        <>
            <div id='container_scoreboard'>
                <h1>Eredménytábla</h1>
                <table>
                    <tbody>
                        <tr>
                            { renderTableData() }
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button id="home_btn" className="button" onClick={() => window.location.reload(false)}>Vissza a főoldalra</button>
            </div>
        </>
    );
}