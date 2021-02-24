import {EmojiSmile, Paperclip, Mic, MicFill} from 'react-bootstrap-icons';
import {useState, useRef} from 'react';
import { store, getLastMessageId } from '../store/store';
import messageReducer from '../reducers/messages';
import connection from './websocketConnection';
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
    connection.onmessage = (m) => {
        console.log('res:',JSON.parse(m.data));
       
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
        const payload_message = {
            message: {
                from: '41da92dd-8336-447a-b372-4cb236501120',
                chat: 'chat-e3584091-a7f4-4ec1-af90-31777dc83e9b',
                client_provided_id: '123',
                body: textMessageInput.current.value
            }
        }
        const message = {
            req_id: Math.floor(1000 + Math.random() * 8999),
            req_time: (new Date()).getTime(),
            payload: JSON.stringify(payload_message),
            opcode: 1002
        }
        // const message =  {
        //     id: myId,
        //     userId: '12345678',
        //     chatId: 'xxx-xxx-xxx',
        //     body: textMessageInput.current.value,
        //     createDate: '2021/01/23',
        //     isPending: true,
        //     isSeen: false,
        //     isDelivered: false,
        //     from: 'Amir Askari'
        //  };
        const connecting = setInterval(() => {
            if(connection.readyState === 1){
              connection.send(JSON.stringify(message));
              console.log('message sent:', JSON.stringify(message));
              clearInterval(connecting);
            }
          }, 1000);
        // new Promise((resolve, reject) => {

        //     store.dispatch(messageReducer.actions.messageAdded({message}));
        //     resolve();
        // })
        // .then(() => {
        //     const isSent = true;
        //     return(isSent);
        // }).then((res) => {
        //     if(res){
        //         store.dispatch(messageReducer.actions.messageDeliveryStatus({
        //             id: myId,
        //             isFailed: false
        //         }));
        //     }else{
        //         store.dispatch(messageReducer.actions.messageDeliveryStatus({
        //             id: myId,
        //             isFailed: true
                    
        //         }));
        //     }
        // });
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