import MessageForm from './message_form'
import ChatroomBody from './chatroom_body';
import '../assets/css/messageBox.scss';
import {connect} from 'react-redux'
import {store, getChatId} from '../store/store'
import ChatroomHeader from './chatroom_header';
/**
 * @component
 * first message box shows nothing. when user clicks on item at the 
 * message list (side bar) message box shows messages 
 */
function MessageBox(props){
    const chatStatus = store.getState().entities.chats.chatStatus;
    const chatId = getChatId();
   
   const result = (chatStatus) => { switch (chatStatus) {
        case 1:
            return <div className="emptyMessageBox">Messages are loading ...</div>
        case 2:
            return <div className="chatroomBodyWrapper"> 
                        <ChatroomHeader />
                        <ChatroomBody userId={props.user.userId} store={store} />
                        <MessageForm chatId = {chatId} />
                   </div> 
        case 3:
            return <div className="emptyMessageBox">Loading Messages is Failed</div>
        default:
            return <div className="emptyMessageBox">Select a chat from the sidebar</div>;
            
    }
}
    return (<>
        {result(chatStatus)}
    </>);
  
}
const mapStateToProps = state => ({
    showMessageBox: state.entities.chats.chatStatus
});

export default connect(mapStateToProps)(MessageBox);