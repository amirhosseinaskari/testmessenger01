function MessegeListItem(props){
    
    return (<>
        <li className="messegeListItem">
                <div className="messegerAvatarContainer">
                    <img src={props.avatar} />
                </div>
                <div className="messegerInfo">
                    <div>
                        <div className="name">{props.name}</div>
                        <div className="lastChat">
                            {props.lastMessege.length > 30 ? String.substr(0,30) + '...' : props.lastMessege}
                        </div>
                    </div>
                    {props.unreadMessegeCount > 0 ?  
                    <div className="unreadMessegeCount">
                       {props.unreadMessegeCount}
                   </div>
                   :
                   null}
                </div>
             
               
        </li>
    </>);
}

export default MessegeListItem;