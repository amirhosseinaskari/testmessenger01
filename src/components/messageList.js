import MessageListItem from './messageListItem';
import SearchMessage from './search_message'
import '../assets/css/messageList.scss';
import {ThreeDotsVertical, Plus} from 'react-bootstrap-icons';
function MessageList(props){
    const onMessageListItemClicked = (e, chatId) => {
        
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
                <MessageListItem avatar={item.avatar}
                onClick={(e) => onMessageListItemClicked(e, props.chat)}
                key={item.chat} 
                chat={item.last_message.body} 
                unreadMessageCount={item.unreadMessageCount}
                name={item.name} lastMessage={item.last_message.body} />)
            }
        </ul>
    </>);
}

export default MessageList;