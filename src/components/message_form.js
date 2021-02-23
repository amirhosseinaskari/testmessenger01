import {EmojiSmile, Paperclip, Mic, MicFill} from 'react-bootstrap-icons';
import {useState, useRef} from 'react';
import { store, getLastMessageId } from '../store/store';
import messageReducer from '../reducers/messages';
function  MessageForm(props) {
    const [isTyping, setIsTyping] = useState(false)
    const textMessageInput = useRef(null)
    /**
     * 
     * @param {event} e 
     * change mic icon to send icon when user is typing
     */
    const textMessageOnChanged = (e) => {
        if(textMessageInput.current.value === ''){
            setIsTyping(false);
            return;
        }
        setIsTyping(true);
    };
    /**
     * 
     * @param {event} e 
     * on submit massage handler
     */
    const onSubmitMessage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const myId = getLastMessageId() + 1;
        const message =  {
            id: myId,
            userId: '12345678',
            chatId: 'xxx-xxx-xxx',
            body: textMessageInput.current.value,
            createDate: '2021/01/23',
            isPending: true,
            isSeen: false,
            isDelivered: false,
            from: 'Amir Askari'
         };
        new Promise((resolve, reject) => {
            store.dispatch(messageReducer.actions.messageAdded({message}));
            resolve();
        })
        .then(() => {
            const isSent = true;
            return(isSent);
        }).then((res) => {
            if(res){
                store.dispatch(messageReducer.actions.messageDeliveryStatus({
                    id: myId,
                    isFailed: false
                }));
            }else{
                store.dispatch(messageReducer.actions.messageDeliveryStatus({
                    id: myId,
                    isFailed: true
                    
                }));
            }
        });
    };
    /**
     * Microphone
     */
    const [mic, setMic] = useState(
        <span className="inactive_mic">
            <Mic size={24} />
        </span>
    );
    const onMicActive = (e) => {
        setMic(
            <span className="active_mic">
                <MicFill size={24} />
            </span>
        );
    };

    const onMicInactive = (e) => {
        setMic(
            <span className="inactive_mic">
                <Mic size={24} />
            </span>
        );
    };
    return (<>
        <div className="formMessageContainer">
            <div className="emoji">
                <EmojiSmile size={30} />
            </div>
            <div className="attachment">
                <Paperclip size={30} />
            </div>
            <form className="textMessageForm" onSubmit={onSubmitMessage}>
                <textarea rows={1} ref={textMessageInput} placeholder="write your message ..." onChange={textMessageOnChanged}></textarea>
                 {isTyping ? <button type="submit">Send</button> :null}
            </form>
            <div className="voiceButtonContainer">
                 {!isTyping ? <button onMouseDown={onMicActive} onMouseUp={onMicInactive}
                  onTouchStart={onMicActive} onTouchEnd={onMicInactive}>
                      {mic}
                  </button> : null}
            </div>
        </div>
    </>);
}

export default MessageForm;