import { useState } from 'react';
import {Check, CheckAll, ArrowClockwise, ExclamationCircle, Trash} from 'react-bootstrap-icons';
import DeleteMessageModal from './delete_message_modal';
import {store} from '../store/store';
import messageReducer from '../reducers/messages';
function  MyMessage(props) {
    const [deleteModal, setDeleteModal] = useState(null);

     /**
     * 
     * @param {event} e 
     * handling Delete For Me 
     */
    const onDeleteForMeClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const sendRequestForDelete = new Promise((resolve,reject) => {
            resolve(202);
        });
        sendRequestForDelete.then((val) => {
            if(val === 200){
                store.dispatch(messageReducer.actions.messageDelete({id: props.message.id}));
                return;
            }
            throw 'Whoops!! an error occured while deleting the message';
        }).catch((error) => {
            alert(`${error}`);
        });
    };
    /**
     * 
     * @param {event} e
     * handling Delete For EveryOne
     */
    const onDeleteForEveryoneClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const sendRequestForDelete = new Promise((resolve,reject) => {
            resolve(200);
        });
        sendRequestForDelete.then((val) => {
            if(val === 200){
                store.dispatch(messageReducer.actions.messageDelete({id: props.message.id}));
                return;
            }
            throw 'Whoops!! an error occured while deleting the message';
        }).catch((error) => {
            alert(`${error}`);
        });;
    };
    /**
     * 
     * @param {event} e 
     * a handler for click on delete message icon
     */
    const onDeleteHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(deleteModal){
            setDeleteModal(null);
        }else{
            setDeleteModal(<DeleteMessageModal onDeleteForMeClicked={onDeleteForMeClicked}
                 onDeleteForEveryoneClicked={onDeleteForEveryoneClicked}
                 messageId={props.message.id} />);
        }
        
    };

   
    return (<>
        <div className="message myMessage" key={props.code}>
            <div className="message_body">
              <p>{props.message.info.body}</p>
              <div onClick={onDeleteHandler} className="delete_message_icon">
                  <Trash size={20} />
                  {deleteModal}
              </div>
            </div>
            <div className="data_seen_container">
                <span className="date">
                   {props.message.createDate}
                </span>
                {props.message.isPending ? 
                <span><ArrowClockwise size={20} /></span> : 
                (props.message.isSeen ? <span className="seen"><CheckAll size={20} /></span> : 
                (props.message.isDelivered ?  <span className="delivered"><CheckAll size={20} /></span> : 
                (props.message.isFailed ? <span className="failed"><ExclamationCircle size={20} /></span> :<span className="sent"><Check size={20} /></span>)
                ))}
            </div>
        </div>
    </>);
}

export default MyMessage;