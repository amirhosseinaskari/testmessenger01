import {EmojiSmile, Paperclip} from 'react-bootstrap-icons';
import {useState, useRef} from 'react';
function  MessegeForm(props) {
    const [isTyping, setIsTyping] = useState(false)
    const textMessegeInput = useRef(null)
    const textMessegeOnChanged = (e) => {
        if(textMessegeInput.current.value === ''){
            setIsTyping(false);
            return;
        }
        setIsTyping(true);
    };
    return (<>
        <div className="formMessegeContainer">
            <div className="emoji">
                <EmojiSmile size={30} />
            </div>
            <div className="attachment">
                <Paperclip size={30} />
            </div>
            <form className="textMessegeForm">
                <input ref={textMessegeInput} type="text" placeholder="write your messege ..." onChange={textMessegeOnChanged} />
                 {isTyping ? <button>Send</button> :null}
            </form>
            <div className="voiceButtonContainer">
                 {!isTyping ? <button>Voice</button> : null}
            </div>
        </div>
    </>);
}

export default MessegeForm;