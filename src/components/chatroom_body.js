import {store} from '../store/store';
import MyMessage from './my_message';
import OtherMessage from './other_message';
function ChatroomBody(props) {
    const messages = store.getState().entities.messages;
    return (<>
        <div className="chatroomBody">
            {messages.map((item) => (
                item.userId === props.userId ? <MyMessage message={item} /> : <OtherMessage message={item} />
            ))}
        </div>
    </>);
}

export default ChatroomBody;