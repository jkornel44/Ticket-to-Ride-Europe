import io from 'socket.io-client';

let socket = null;

class SocketApi {
    connect() {
        socket = io('http://webprogramozas.inf.elte.hu:3031');
        return socket;
    }
    
    onActionSent(handler) {
        const listener = resp => {
            handler(resp);
        }
        socket.on('action-sent', listener);
    }

    onStateChanged(handler) {
        const listener = resp => {
            handler(resp);
        }
        socket.on('state-changed', listener);
    }

    onRoomIsFull(handler) {
        const listener = resp => {
            handler(resp);
        }
        socket.on('room-is-full', listener);
    }

    onPlayerLeft(handler) {
        const listener = resp => {
            handler(resp);
        }
        socket.on('player-left', listener);
    }
}

export const socketApi = new SocketApi();