import {EmojiSmile, Paperclip, Mic} from 'react-bootstrap-icons';
import {useState, useRef} from 'react';
function  MessageForm(props) {
    const [isTyping, setIsTyping] = useState(false)
    const textMessageInput = useRef(null)
    const textMessageOnChanged = (e) => {
        if(textMessageInput.current.value === ''){
            setIsTyping(false);
            return;
        }
        setIsTyping(true);
    };
    return (<>
        <div className="formMessageContainer">
            <div className="emoji">
                <EmojiSmile size={30} />
            </div>
            <div className="attachment">
                <Paperclip size={30} />
            </div>
            <form className="textMessageForm">
                <input ref={textMessageInput} type="text" placeholder="write your message ..." onChange={textMessageOnChanged} />
                 {isTyping ? <button>Send</button> :null}
            </form>
            <div className="voiceButtonContainer">
                 {!isTyping ? <button><Mic size={24} /></button> : null}
            </div>
        </div>
    </>);
}

export default MessageForm;