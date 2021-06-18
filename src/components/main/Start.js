export function Start({setGameState}) {
    const handleClick = e => {
        setGameState(e);
    };

    return (
        <div id="container" className="container"> 
            <button id="newgame_btn" className="button" onClick={handleClick.bind(this, 'NEW')} >Új játék indítása</button>
            <button id="joingame_btn" className="button"onClick={handleClick.bind(this, 'JOIN')}>Csatlakozás játékhoz</button>
        </div>
    );
}