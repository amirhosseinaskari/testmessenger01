import {store} from '../store/store';
import MyMessage from './my_message';
import OtherMessage from './other_message';
import {connect} from 'react-redux';
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
const mapStateToProps = state => ({
    messages: state.entities.messages
});
export default connect(mapStateToProps)(ChatroomBody);