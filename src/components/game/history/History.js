import { Message } from './Message';
import { useSelector } from 'react-redux';
import { getMessages } from '../../../selectors/messageSelector';

export function History() {
    const messages = useSelector(getMessages);
    return (
        <div id="history">
            { messages.map(msg => <Message content={msg.text} key={msg.id}/>) }
        </div>
    );
}
