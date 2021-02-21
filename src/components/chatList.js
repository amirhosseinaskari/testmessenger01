import ChatList from './chatListItem';
import SearchMessage from './search_message'
import chatReducer from '../reducers/chats'
import {store} from '../store/store';
import '../assets/css/messageList.scss';
import {ThreeDotsVertical, Plus} from 'react-bootstrap-icons';
function MessageList(props){
    const onChatClicked = (e, chatId) => {
       
        store.dispatch(chatReducer.actions.chatStatusEdit({chatStatus: 1}));
        store.dispatch(chatReducer.actions.chatSelected({
            messageInfo: {
              avatar: '',
              bio: '',
              name: '',
              chatId: '',
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
       <div className="userInfo">
            <div className="avatarContainer">
                <img src={props.user.avatar} />
            </div>
            <div className="operation">
               <a href="#">
                  <Plus size={30} />
               </a>
               <a href="#">
                  <ThreeDotsVertical size={24} />
               </a>
            </div>
       </div>
      
       <div className="searchMessage">
           <SearchMessage />
       </div> 
        <ul>
            {
                props.messageList.map((item, index) =>
                <ChatList avatar={item.avatar}
                onClick={(e) => onChatClicked(e, props.chat)}
                key={item.chat} 
                chat={item.last_message.body} 
                unreadMessageCount={item.unreadMessageCount}
                name={item.name} lastMessage={item.last_message.body} />)
            }
        </ul>
    </>);
}

export default MessageList;