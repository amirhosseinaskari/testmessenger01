import {EmojiSmile, Paperclip} from 'react-bootstrap-icons';
import {useState} from 'react';
function  MessegeForm(props) {
    const [isTyping, setIsTyping] = useState(true)
    return (<>
        <div className="formMessegeContainer">
            <div className="emoji">
                <EmojiSmile size={30} />
            </div>
            <div className="attachment">
                <Paperclip size={30} />
            </div>
            <form className="textMessegeForm">
                <input type="text" placeholder="write your messege ..." />
                 {isTyping ? <button>Send</button> :null}
            </form>
        </div>
    </>);
}

export default MessegeForm;