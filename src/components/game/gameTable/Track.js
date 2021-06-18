
export function Track({data, color}) { 
   
    return(
        <div className="track" id={ color } style={{
            top:   (data['y']-0.8) + '%',
            left:  (data['x']-0.8) + '%',
            transform: 'rotate(' + data['r'] + 'deg)',
        }}>
            
        </div>
    );
}