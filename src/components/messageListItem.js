function MessageListItem(props){
    
    return (<>
        <li className="messageListItem">
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

export default MessageListItem;