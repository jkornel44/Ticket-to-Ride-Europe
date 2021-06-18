export function PublicCard({color, onSelect}) {

    return (
        <li className="card" id={color} onClick={ onSelect}></li>
    );
    
}