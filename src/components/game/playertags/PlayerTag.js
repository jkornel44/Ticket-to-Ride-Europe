import { getPlayerColor } from '../../../actions/gameDataActions';

export function PlayerTag({data, mode, color}) {
    return (
        <div id="playertag" className={mode}>
            <div id="playercolor" style={{backgroundColor: getPlayerColor(data.id-1)}}></div>
            <div id="playerdata">
                <p id="playername"> <b>{data.name}</b></p>
                <div id="playerstats">
                    <table>
                        <tbody>
                            <tr>
                                <th>pontok</th>
                                <th>kártyák</th>
                                <th>vagonok</th>
                                <th>célok</th>
                                <th>körök</th>
                            </tr>
                            <tr>
                                <td>{data.points}</td>
                                <td>{data.cards.length}</td>
                                <td>{data.wagons}</td>
                                <td>{data.destinations.length}</td>
                                <td>{data.rounds}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}