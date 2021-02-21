
import './App.scss';
import sample_avatar from './assets/images/sample_avatar.jpg';
import user_avatar from './assets/images/user_avatar.jpg';
import MessegeBox from './components/messege_box';
import MessegeList from './components/messegeList';

function App() {
  const user = {
    uuid:"123-456-789",
    avatar:user_avatar,
    name: "AmirHossein Askari",
    bio: "this is bio"
  }
  const sampleMessegeList = 
    [{
      chat: "abc-ddd-abc",
      name: "Sina ebr",
      avatar:  sample_avatar,
      bio: "this is bio",
      last_message: {
        from: "xxx-xxx-xxx",
        chat: "",
        id: "messege-1",
        temp_id: "tempid-1",
        body: "This is the last chat messege",
        create_datetime: ""
      },
      unreadMessegeCount: 2
    },
    {
      chat: "abc-www-abc",
      name: "Sina ebr",
      avatar:  sample_avatar,
      bio: "this is bio",
      last_message: {
        from: "xxx-xxx-xxx",
        chat: "",
        id: "messege-2",
        temp_id: "tempid-2",
        body: "This is the last chat messege",
        create_datetime: ""
      },
      unreadMessegeCount: 0

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
        id: "messege-3",
        temp_id: "tempid-3",
        body: "This is the last chat messege",
        create_datetime: ""
      },
      unreadMessegeCount: 1
    }];
  return (
    <div className="App">
      <div id="messegeList">
        <MessegeList user={user} messegeList={sampleMessegeList}/>
      </div>
      <div id="messegeBox">
         <MessegeBox />
      </div>
      
    </div>
  );
}

export default App;
