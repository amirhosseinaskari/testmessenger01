import '../assets/css/deleteModal.scss';
function DeleteMessageModal(props){

    
    return (
        <div className="delete_modal">
            <a href="#" onClick={props.onDeleteForMeClicked}>Delete For Me</a>
            <a href="#" onClick={props.onDeleteForEveryoneClicked}>Delete For Everyone</a>
        </div>
    );
}

export default DeleteMessageModal;