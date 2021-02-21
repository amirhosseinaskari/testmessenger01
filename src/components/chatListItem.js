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
        if(currentChatId === props.chatId){
            return;
        }
        store.dispatch(chatReducer.actions.chatStatusEdit({chatStatus: 1}));
        store.dispatch(chatReducer.actions.chatSelected({
            chatInfo: {
              avatar: '',
              bio: '',
              name: '',
              chatId: chatId,
              last_message: {
                  from: "",
                  chat: "",
                  id: "",
                  temp_id: "",
                  body: "",
                  create_datetime: ""
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