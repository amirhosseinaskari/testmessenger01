import {store} from '../store/store';
import MyMessage from './my_message';
import OtherMessage from './other_message';
function ChatroomBody(props) {
    const messages = store.getState().entities.messages;
    
    return (<>
        <div className="chatroomBody">
            {messages.map((item, index) => (
                item.userId === props.userId ? <MyMessage message={item} key={`chat${index}`} /> : <OtherMessage message={item} key={`chat${index}`} />
            ))}
        </div>
    </>);
}

export default ChatroomBody;