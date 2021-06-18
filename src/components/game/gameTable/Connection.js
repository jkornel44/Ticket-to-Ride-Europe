import { Track } from './Track';

export function Connection({data, color}) { 
    const tracks = data['elements'];

    return(
        <>
            { tracks.map((t, index) => <Track data={t} color={color} key={index}/>) }
        </>
    );
}