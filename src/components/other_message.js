function  OtherMessage(props) {
    return (<>
         <div className="message otherMessage" key={props.code}>
            <p>{props.message.info.body}</p>
            <div className="data_seen_container">
                 <span className="date">
                   {props.message.createDate}
                </span>
            </div>
        </div>
    </>);
}

export default OtherMessage;