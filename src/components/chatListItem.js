import { useState } from 'react';
import connect from 'react-redux/lib/connect/connect';
import chatReducer from '../reducers/chats'
import {store} from '../store/store';
/**
 * @component
 * @param {props} props 
 * summary information of each chat that is shown at the side bar.
 * this information contains avatar, name, last message text, last message date, 
 * count of unread messages
 */
function MessageListItem(props){
   
    const currentChatId = store.getState().entities.chats.chatInfo.chatId;
    
    const onChatClicked = (e, chatId) => {
        //show message box and hide chat list
        const chatListElement = document.querySelector('#messageList');
        const chatroomElement = document.querySelector('#messageBox');
        chatListElement.classList.remove('active');
        chatListElement.classList.add('hidden');
        chatroomElement.classList.add('active');
        chatroomElement.classList.remove('hidden');
        
        if(currentChatId === props.chatId){
            return;
        }
        //change chatroom status to pending and show the status on message box (chatroom)
        store.dispatch(chatReducer.actions.chatStatusEdit({chatStatus: 1}));

        //fetch api chat inforamtion by chat id 
        store.dispatch(chatReducer.actions.chatSelected({
            chatInfo: {
              avatar: props.avatar,
              bio: '',
              name: props.name,
              chatId: props.chatId,
              last_message: {
                  from: "",
                  chat: props.chatId,
                  id: "",
                  temp_id: "",
                  body: "",
                  create_datetime: props.lastMessageDate
                }
          }
          }));
    };
    return (<>
        <li className={`messageListItem ${props.chatId === currentChatId ? "active" : ''}`} onClick={(e) => {onChatClicked(e, props.chatId)}}>
                <div className="messagerAvatarContainer">
                    <img src={props.avatar} />
                </div>
                <div className="messagerInfo">
                    <div>
                        <div className="name">{props.name}</div>
                        <div className="lastChat">
                            {props.lastMessage.length > 30 ? String.substr(0,30) + '...' : props.lastMessage}
                        </div>
                        <div className="lastMessageDate">
                            {props.lastMessageDate}
                        </div>
                    </div>
                    {props.unreadMessageCount > 0 ?  
                    <div className="unreadMessageCount">
                       {props.unreadMessageCount}
                   </div>
                   :
                   null}
                </div>
        </li>
    </>);
}
const mapStateToProps = state => ({
    currentChatId: state.entities.chats.chatInfo.chatId
});
export default connect(mapStateToProps)(MessageListItem); 