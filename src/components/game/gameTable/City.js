import { useDispatch, useSelector } from 'react-redux';
import { ticketToRideData } from '../../../constants/ticket-to-ride-data';
import { getSelectedDestination } from '../../../selectors/mapDataSelector';

export function City({props, name, onSelect}) { 
    const data = props;
    const x = props['x'];
    const y = props['y'];

    const style = {
        top:   (y-2.5) + '%',
        left:  (x-2) + '%',
    };
    
    return (
        <div className={ name } style={style} onClick={() => onSelect(props)}> 
            <div className="cityInner"> 
            </div>
        </div>
    );
}