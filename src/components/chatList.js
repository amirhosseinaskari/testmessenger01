import ChatListItem from './chatListItem';
import SearchMessage from './search_message'
import {store} from '../store/store'

import '../assets/css/messageList.scss';
import {ThreeDotsVertical, Plus} from 'react-bootstrap-icons';
function ChatList(props){
   
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
                <ChatListItem avatar={item.avatar}
                    store={store}
                    chatId={item.chat}
                    key={item.chat} 
                    lastMessage={item.last_message.body} 
                    lastMessageDate = {item.last_message.create_datetime}
                    unreadMessageCount={item.unreadMessageCount}
                    name={item.name} lastMessage={item.last_message.body} />)
            }
        </ul>
    </>);
}

export default ChatList;