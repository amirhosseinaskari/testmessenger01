
import './App.scss';
import sample_avatar from './assets/images/sample_avatar.jpg';
import user_avatar from './assets/images/user_avatar.jpg';
import MessageBox from './components/message_box';
import MessageList from './components/messageList';
import {store} from './store/store';
import messageInfoReducer from './reducers/messegeInfo';
function App() {
  store.dispatch(messageInfoReducer.actions.messageSelected({
    messageInfo: {
      avatar: '',
      bio: '',
      name: '',
      chatId: '',
      last_message: {
          from: "",
          chat: "",
          id: "",
          temp_id: "",
          body: "",
          create_datetime: ""
        }
  }
  }));

  
  const user = {
    uuid:"123-456-789",
    avatar:user_avatar,
    name: "AmirHossein Askari",
    bio: "this is bio"
  }
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
    <div className="App">
      <div id="messageList">
        <MessageList user={user} messageList={sampleMessageList}/>
      </div>
      <div id="messageBox">
         <MessageBox />
      </div>
      
    </div>
  );
}

export default App;
