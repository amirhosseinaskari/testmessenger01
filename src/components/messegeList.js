import MessegeListItem from './messegeListItem';
import SearchMessege from './search_messege'
import '../assets/css/messegeList.scss';
import {ThreeDotsVertical, Plus} from 'react-bootstrap-icons';
function MessegeList(props){
    const onMessegeListItemClicked = (e, chatId) => {
        
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
       <div></div>
       <div className="searchMessege">
           <SearchMessege />
       </div> 
        <ul>
            {
                props.messegeList.map((item, index) =>
                <MessegeListItem avatar={item.avatar}
                onClick={(e) => onMessegeListItemClicked(e, props.chat)}
                key={item.chat} 
                chat={item.last_message.body} 
                unreadMessegeCount={item.unreadMessegeCount}
                name={item.name} lastMessege={item.last_message.body} />)
            }
        </ul>
    </>);
}

export default MessegeList;