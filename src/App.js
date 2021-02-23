
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
function App() {
  const getUserByUserId = (uuid) => ({
    userId:"12345678",
    avatar:user_avatar,
    name: "AmirHossein Askari",
    bio: "this is bio"
  });
  const [user, setUser] = useState(getUserByUserId(sessionStorage.getItem('uuid')));
  const [isLogin, setLoginStatus] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem('uuid'));


  /**
   * @event
   * @param {uuid} uuid 
   * fetch user info when on user login
   */
  const onLogin = (uuid) => {
   const loginRequest = new Promise((resoleve, reject) => {
        resoleve(200);
    });
    loginRequest.then((res) => {
      if(res === 200){
        setLoginStatus(true);
        sessionStorage.setItem('uuid',uuid);
      }
    }).then(() => {
      setUserId(uuid);
    }).then(() => {
      setUser({
        userId:"12345678",
        avatar:user_avatar,
        name: "AmirHossein Askari",
        bio: "this is bio"
      });
      sessionStorage.setItem('user', {
        userId:"12345678",
        avatar:user_avatar,
        name: "AmirHossein Askari",
        bio: "this is bio"
      });
    });
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
