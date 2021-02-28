
import './App.scss';
import user_avatar from './assets/images/user_avatar.jpg';
import MessageBox from './components/message_box';
import ChatList from './components/chatList';
import {store} from './store/store';
import { useState } from 'react';
import Splash from './components/splash';
import Login from './components/login';
import connection from './components/websocketConnection';
import chatReducer from './reducers/chats';
function App() {
  //user information, when the user logs in, his/her information is stored in session storage by key = 'user'
  const [user, setUser] = useState(sessionStorage.getItem('user'));
  //login status
  const [isLogin, setLoginStatus] = useState(false);
  //user Id (uuid), when the user logs in, his/her uuid is stored in session storage by key = 'uuid'
  const [userId, setUserId] = useState(sessionStorage.getItem('uuid'));
  //req id
  const [reqId, setReqId] = useState(null);

  /**
   * @event
   * @param {uuid} uuid 
   * fetch user info when user logs in
   */
  //uuid 01 = 41da92dd-8336-447a-b372-4cb236501120
  const onLogin = (uuid) => {
    //login request 
    const payload = {
      uuid: uuid
    };
    const message = {
      req_id: Math.floor(1000 + Math.random() * 8999),
      req_time: (new Date()).getTime(),
      from: uuid,
      opcode: 1000,
      payload: JSON.stringify(payload) 
    };
    
    //trying to send request for login after connection is ready
    const connecting = setInterval(() => {
      if(connection.readyState === 1){
        connection.send(JSON.stringify(message));
        console.log('message sent:', JSON.stringify(message));
        setReqId(message.req_id);
        clearInterval(connecting);
      }
    }, 100); 
};
  //when websocke connection is opened
  connection.onopen = (e) => {
    console.log('connection is opened');
    if(userId) {
      onLogin(userId);
    }
  };
  
  //when an error occurs in the websocket connection
  connection.onerror = (error) => {
    connection.log(error);
  };
  //when a message is received from the server
  connection.onmessage = (m) => {
    const res = JSON.parse(m.data);
    
    if(res.status_code === 200){ //if response is OK
        if(res.opcode === 1000 && res.req_id === reqId) { //if opcode === 1000 (login)
          const payload = JSON.parse(res.payload);
          setLoginStatus(true);
          setUserId(payload.uuid);
          setUser({
              userId:payload.uuid,
             });
          store.dispatch(chatReducer.actions.userLoggedIn({userId: payload.uuid}));
          //storing uuid and user information after the login response is OK
          sessionStorage.setItem('uuid',payload.uuid);
          sessionStorage.setItem('user', {
            userId:payload.uuid
            });
        }
       
    }else { //if response is not ok for the request
      alert('response is not ok!');
    }
  }
  

  //message list
  const messageList = [
    {
      chatId:'chat-e3584091-a7f4-4ec1-af90-31777dc83e9b',
      unreadMessageCount: 2,
      avatar: user_avatar,
      last_message: {
      body:'last sample message',
      create_datetime: '2021/02/21',

      }

}];
  
  return (
       <div className="App">
        {(!isLogin && !userId) ?  <Login onLogin={onLogin} /> : (!user ? <Splash /> : 
          <div>
            <div id="messageList" className="active">
              <ChatList user={user} messageList={messageList}/>
            </div>
            <div id="messageBox" className="hidden">
                <MessageBox user={user} store={store} />
            </div>
          </div>)
         }
          
       </div>
   
  );
}

export default App;
