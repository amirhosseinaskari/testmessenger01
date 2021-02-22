import { store } from "../store/store";
import {ArrowLeft} from 'react-bootstrap-icons';
function  ChatroomHeader(props) {
    const chatInfo = store.getState().entities.chats.chatInfo;
    const onBackButtonClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        //hide message box and ahow chat list
        const chatListElement = document.querySelector('#messageList');
        const chatroomElement = document.querySelector('#messageBox');
        chatListElement.classList.remove('hidden');
        chatListElement.classList.add('active');
        chatroomElement.classList.add('hidden');
        chatroomElement.classList.remove('active');
    };
    return (<>
        <div className="chatroomHeader">
            <div className="chatInfo">
                <button className="backButton" onClick={onBackButtonClicked}>
                    <ArrowLeft size={20} />
                </button>
                <div className="avatarContainer">
                    <img src={chatInfo.avatar} />
                </div>
                <div>
                    <div className="name">{chatInfo.name}</div>
                    <div className="connectionStatus">Online</div>
                </div>
            </div>
            <div className="operations"></div>
        </div>
    </>);
}

export default ChatroomHeader;