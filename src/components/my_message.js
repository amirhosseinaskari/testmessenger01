import { useState } from 'react';
import {Check, CheckAll, ArrowClockwise, ExclamationCircle, Trash} from 'react-bootstrap-icons';
import DeleteMessageModal from './delete_message_modal';
function  MyMessage(props) {
    const [deleteModal, setDeleteModal] = useState(null);
    const onDeleteHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDeleteModal(<DeleteMessageModal messageId={props.message.id} />);
    };
    return (<>
        <div className="message myMessage" key={props.code}>
            <div className="message_body">
              <p>{props.message.body}</p>
              <a href="#" onClick={onDeleteHandler} className="delete_message">
                  <Trash size={20} />
                  {deleteModal}
              </a>
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