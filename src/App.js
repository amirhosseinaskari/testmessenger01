
import './App.scss';
import user_avatar from './assets/images/user_avatar.jpg';
import MessageBox from './components/message_box';
import ChatList from './components/chatList';
import {store} from './store/store';
import { useState } from 'react';
import Splash from './components/splash';
import Login from './components/login';
import connection from './components/websocketConnection';
function App() {
  //user information, when the user logs in, his/her information is stored in session storage by key = 'user'
  const [user, setUser] = useState(sessionStorage.getItem('user'));
  //login status
  const [isLogin, setLoginStatus] = useState(false);
  //user Id (uuid), when the user logs in, his/her uuid is stored in session storage by key = 'uuid'
  const [userId, setUserId] = useState(sessionStorage.getItem('uuid'));

  //when websocke connection is opened
  connection.onopen = (e) => {
    console.log('connection is opened');
  };

  //when an error occurs in the websocket connection
  connection.onerror = (error) => {
    connection.log(error);
  };
  //when a message is received from the server
  connection.onmessage = (m) => {
    const res = JSON.parse(m.data);
    
    if(res.status_code === 200){ //if response is OK
        if(res.opcode === 1000) { //if opcode === 1000 (login)
          setLoginStatus(true);
          setUserId(res.uuid);
           setUser({
              userId:res.uuid,
              avatar:user_avatar,
              name: res.name,
              bio: res.bio
             });
          //storing uuid and user information after the login response is OK
          sessionStorage.setItem('uuid',res.uuid);
          sessionStorage.setItem('user', {
            userId:res.uuid,
            avatar:user_avatar,
            name: res.name,
            bio: res.bio
            });
        }
       
    }else { //if response is not ok for the request
      alert('response is not ok!');
    }
  }
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
            clearInterval(connecting);
          }
        }, 100);

        
        
  };

  //message list
  const messageList = [];
  
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
