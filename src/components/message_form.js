import {EmojiSmile, Paperclip, Mic, MicFill} from 'react-bootstrap-icons';
import {useState, useRef} from 'react';
import { store, getLastMessageId, getUserId, getChatId, getMessageById, getMessageId } from '../store/store';
import messageReducer from '../reducers/messages';
import connection from './websocketConnection';
import { current } from '@reduxjs/toolkit';
function  MessageForm(props) {
    const [isTyping, setIsTyping] = useState(false)
    //req id
    const [reqId, setReqId] = useState('');
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
        const res = JSON.parse(m.data);
        
        console.log('res:',JSON.parse(m.data));
        if(res.opcode === 1002) {
           const messageId = getMessageId(res.req_id, res.req_time);
           if(messageId !== -1) {
               store.dispatch(messageReducer.actions.changeMessageStatus({
                   id: messageId,
                   message: {
                    isPending: false,
                    isSent: true,
                    isDelivered: false,
                    isFailed: false
                   }
               }));
               return;
           }
           const payload = JSON.parse(res.payload);
           const myId = getLastMessageId() + 1;
           store.dispatch(messageReducer.actions.messageAdded({
               message: {
                id: myId,
                reqId: res.req_id,
                reqTime: res.reqTime,
                info: {
                    userId: payload.message.from,
                    chatId: payload.message.chat,
                    client_provided_id: myId,
                    body: payload.message.body
                },
                isPending: false,
                isSent: true,
                isDelivered: false,
                isFailed: false
               }
           }))
        }
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
        const userId = getUserId();
        const chatId = getChatId();
        const reqId = Math.floor(1000 + Math.random() * 8999);
        setReqId(reqId);
        const reqTime = (new Date()).getTime();
        const payload_message = {
            message: {
                from: userId,
                chat: chatId,
                client_provided_id: myId,
                body: textMessageInput.current.value
            }
        };
        store.dispatch(messageReducer.actions.messageAdded({
            message: {
                id: myId,
                reqId: reqId,
                reqTime: reqTime,
                info: {
                    userId: userId,
                    chatId: chatId,
                    client_provided_id: myId,
                    body: textMessageInput.current.value
                },
                isPending: true,
                isSent: false,
                isDelivered: false,
                isFailed: false
            }
        }));
        
        const message = {
            req_id: reqId ,
            req_time:reqTime ,
            payload: JSON.stringify(payload_message),
            opcode: 1002
        }
     
        const connecting = setInterval(() => {
            if(connection.readyState === 1){
              connection.send(JSON.stringify(message));
              console.log('message sent:', JSON.stringify(message));
              clearInterval(connecting);
            }
          }, 100);

        
       
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