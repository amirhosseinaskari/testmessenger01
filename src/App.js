
import './App.scss';
import sample_avatar from './assets/images/sample_avatar.jpg';
import user_avatar from './assets/images/user_avatar.jpg';
import MessageBox from './components/message_box';
import ChatList from './components/chatList';
import {store} from './store/store';
import Provider from 'react-redux/lib/components/Provider';
import { useState, useEffect } from 'react';
import Splash from './components/splash';
function App() {
  const [user, setUserState] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setUserState({
        uuid:"123-456-789",
        avatar:user_avatar,
        name: "AmirHossein Askari",
        bio: "this is bio"
      });
    }, 2000);
  }, [user])
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
        create_datetime: ""
      },
      unreadMessageCount: 2
    },
    {
      chat: "abc-www-abc",
      name: "Sina ebr",
      avatar:  sample_avatar,
      bio: "this is bio",
      last_message: {
        from: "xxx-xxx-xxx",
        chat: "",
        id: "Message-2",
        temp_id: "tempid-2",
        body: "This is the last chat Message",
        create_datetime: ""
      },
      unreadMessageCount: 0

    }
    
    ,
    {
      chat: "abc-eee-abc",
      name: "Sina ebr",
      avatar:  sample_avatar,
      bio: "this is bio",
      last_message: {
        from: "xxx-xxx-xxx",
        chat: "",
        id: "Message-3",
        temp_id: "tempid-3",
        body: "This is the last chat Message",
        create_datetime: ""
      },
      unreadMessageCount: 1
    }];
  return (
    <Provider store={store}>
       <div className="App">
         {!user ? <Splash /> : 
          <div>
            <div id="messageList">
              <ChatList user={user} messageList={sampleMessageList}/>
            </div>
            <div id="messageBox">
                <MessageBox store={store} />
            </div>
          </div>
         }
          
       </div>
    </Provider>
   
  );
}

export default App;
