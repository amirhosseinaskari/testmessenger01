
import './App.scss';
import sample_avatar from './assets/images/sample_avatar.jpg';
import user_avatar from './assets/images/user_avatar.jpg';
import MessageBox from './components/message_box';
import ChatList from './components/chatList';
import {store} from './store/store';
import {Provider} from 'react-redux';
import { useState, useEffect } from 'react';
import Splash from './components/splash';
import Login from './components/login';
import connection from './components/websocketConnection';
function App() {
  const getUserByUserId = (uuid) => ({
    userId:"12345678",
    avatar:user_avatar,
    name: "AmirHossein Askari",
    bio: "this is bio"
  });
  const [user, setUser] = useState(getUserByUserId(sessionStorage.getItem('user')));
  const [isLogin, setLoginStatus] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem('uuid'));
  console.log(user, userId);
  connection.onopen = (e) => {
    console.log('connection is opened');
  };
  connection.onerror = (error) => {
    connection.log(error);
  };
  connection.onmessage = (m) => {
    const res = JSON.parse(m.data);
    console.log(res);
    if(res.status_code === 200){
        console.log(true);
        setLoginStatus(true);
        setUserId('12345678');
         setUser({
            userId:"12345678",
            avatar:user_avatar,
            name: "AmirHossein Askari",
            bio: "this is bio"
           });
        sessionStorage.setItem('uuid','12345678');
        sessionStorage.setItem('user', {
          userId:"12345678",
          avatar:user_avatar,
          name: "AmirHossein Askari",
          bio: "this is bio"
          });
    }else {
      alert('response is not ok!');
    }
  }
  /**
   * @event
   * @param {uuid} uuid 
   * fetch user info when on user login
   */
  //uuid 01 = 41da92dd-8336-447a-b372-4cb236501120
  const onLogin = (uuid) => {
       
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
        
        const connecting = setInterval(() => {
          if(connection.readyState === 1){
            connection.send(JSON.stringify(message));
            console.log('message sent:', JSON.stringify(message));
            clearInterval(connecting);
          }
        }, 1000);

        
        
  };
  const sampleMessageList = 
    [{
      chat: "abc-ddd-abc",
      name: "Sina ebr",
      avatar:  sample_avatar,
      bio: "this is bio",
      last_message: {
        from: "xxx-xxx-xxx",
        chat: "",
        id: "Message-1",
        temp_id: "tempid-1",
        body: "This is the last chat Message",
        create_datetime: "2021/02/12"
      },
      unreadMessageCount: 2
    },
    {
      chat: "abc-www-abc",
      name: "Amir Askari",
      avatar:  sample_avatar,
      bio: "this is bio",
      last_message: {
        from: "xxx-xxx-xxx",
        chat: "",
        id: "Message-2",
        temp_id: "tempid-2",
        body: "This is the last chat Message",
        create_datetime: "2021/02/12"
      },
      unreadMessageCount: 0

    }
    
    ,
    {
      chat: "abc-eee-abc",
      name: "Maria Laura",
      avatar:  sample_avatar,
      bio: "this is bio",
      last_message: {
        from: "xxx-xxx-xxx",
        chat: "",
        id: "Message-3",
        temp_id: "tempid-3",
        body: "This is the last chat Message",
        create_datetime: "2021/02/12"
      },
      unreadMessageCount: 1
    }];
  return (
       <div className="App">
        {(!isLogin && !userId) ?  <Login onLogin={onLogin} /> : (!user ? <Splash /> : 
          <div>
            <div id="messageList" className="active">
              <ChatList user={user} messageList={sampleMessageList}/>
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
