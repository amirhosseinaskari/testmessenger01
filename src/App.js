
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
  const [user, setUser] = useState(null);
  const [isLogin, setLoginStatus] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem('uuid'));
  /**
   * check user is logged in before or not.
   * if user logged in before she/he doesn't have to login again
   * we handled it by checking uuid that is stored in sessionStorage
   */
  const fetchUserInfoByUserId = (uuid) => {
    if(uuid){
      setTimeout(async () => {
        setUser({
          userId:"12345678",
          avatar:user_avatar,
          name: "AmirHossein Askari",
          bio: "this is bio"
        });
      }, 2000);
      return user;
    }
    return null;
  };
  /**
   * @event
   * @param {uuid} uuid 
   * fetch user info when on user login
   */
  const onLogin = (uuid) => {
   const loginRequest = new Promise((resoleve, reject) => {
      setTimeout(() => {
        resoleve(200);
      }, 1000);
    });
    loginRequest.then((res) => {
      if(res === 200){
        setLoginStatus(true);
        sessionStorage.setItem('uuid',uuid);
      }
    }).then(() => {
      setUserId(uuid);
      
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
    <Provider store={store}>
       <div className="App">
        {(!isLogin && !userId) ?  <Login onLogin={onLogin} /> : (!fetchUserInfoByUserId(userId) ? <Splash /> : 
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
    </Provider>
   
  );
}

export default App;
