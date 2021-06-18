import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { getActualPlayer } from '../../../selectors/gameDataSelectors';

import { addCompletedDest } from '../../../actions/playersActions';
import { find } from '../../../actions/mapDataActions';

export function Dest({datas, onSelectDest, player}) {
    const actualPlayerID = useSelector(getActualPlayer);
    const dispatch = useDispatch();
    const onHover = (datas) => {
        onSelectDest(datas);
    };

    const [isFirst, set] = useState(false);

    const arr = [[]];

    for(let i = 0 ; i < 100 ; i++) {
        arr[i] = [];
    }

    Object.values(player.tracks).map(t => {
        if(!arr[t.from].includes(t.to)) {
            arr[t.from][arr[t.from].length] = (t.to);
        }
        if(!arr[t.to].includes(t.from)) {
            arr[t.to][arr[t.to].length] =(t.from);
        }
    });

    let res = find(arr, datas.from, datas.to);
    if (res === 'completed' && !isFirst && !player.completed.includes(datas)) {dispatch(addCompletedDest(actualPlayerID, datas)); set(true)};
    return (
        <li className={res} onMouseOver= {() => onHover(datas)} >
            {datas.fromCity + '-' + datas.toCity}
        </li>
    );
}