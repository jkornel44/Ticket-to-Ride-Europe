import { useSelector } from 'react-redux';
import { City } from './City';
import { Connection } from './Connection';
import { getCities, getConnections, getSelectedDestinationFrom, getSelectedDestinationTo } from '../../../selectors/mapDataSelector';
import { getPlayers } from '../../../selectors/playersSelector';

export function GameTable({destination, onSelect}) {
    const conn = useSelector(getConnections);
    const connections = Object.entries(conn);
    const selectedDestinationFrom = useSelector(getSelectedDestinationFrom);
    const selectedDestinationTo = useSelector(getSelectedDestinationTo);
    
    const c = useSelector(getCities);
    const cities = Object.values(c);
    const city_keys = Object.keys(c);

    const dest = (destination);

    const players = useSelector(getPlayers);

    return (
        <div id="container_gametable"> 
                { connections.map( c => <Connection data={c[1]} color={c[1].color + '_track'} key={c[1].id}/> ) }
                { Object.entries(players).map( p =>
                    p[1].tracks.map( c => <Connection data={c} color={p[1].color + '_wagon'}  key={c.id}/>) )}
                { city_keys.filter(c => dest['from'] === c || dest['to'] === c).map((key) => <City name={'cityWrapperSelected'} props={cities[key-1]} key={key}/>)} 
                { cities.map((city) => <City name={selectedDestinationFrom.city === city.city || selectedDestinationTo.city === city.city ? 'cityWrapperSelected':'cityWrapper'} onSelect={onSelect} props={city} key={city.id}/>)} 
                      
        </div>
    );
}

