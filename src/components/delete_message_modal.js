import '../assets/css/deleteModal.scss';
function DeleteMessageModal(props){
    return (
        <div className="delete_modal">
            <a href="#">Delete For Me</a>
            <a href="#">Delete For Everyone</a>
        </div>
    );
}

export default DeleteMessageModal;