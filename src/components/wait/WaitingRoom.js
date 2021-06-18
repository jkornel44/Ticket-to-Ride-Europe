import logo from '../../assets/img/logo.png'; 
import { getPlayerColor, emitCloseRoom, emitLeaveRoom} from '../../actions/gameDataActions';

export function WaitingRoom( {setData, room, setRoomData, socket} ) {
 
    const handleClick = () => {
        emitLeaveRoom(socket, room.id);
        setRoomData({
            id: '',
            players: [],
            gameState: {},
        });  
        setData('MAIN_PAGE'); 
    }

    const handleClose = () => {
        emitCloseRoom(socket, room.id);
    }

    return (
        <div className="content">
            <img src= { logo } alt="Ticket to Ride logo" id="logo" width="400px"></img>
            
            <div id="container_waitingroom" className="container"> 
                <h2> Várakozás a többi játékosra</h2>
                { room.players.map(p =>   <div id='players' style={{backgroundColor: getPlayerColor(room.players.indexOf(p))}} key={p}>{p}</div>) } 
                <div id='roomID'> {room['id']} </div>
                { room.players.length > 1 ? <button id='start_btn' className='button' onClick={handleClose.bind(this)} >Játék Indítása {room.players.length} fővel</button> : ''}
                <button id='back_btn' className='button' onClick={handleClick.bind(this)} >Vissza</button>
              </div>
        </div>
    );
}