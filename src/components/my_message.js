import {Check, CheckAll, ArrowClockwise, ExclamationCircle} from 'react-bootstrap-icons';
function  MyMessage(props) {
    
    return (<>
        <div className="message myMessage" key={props.code}>
            <p>{props.message.body}</p>
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