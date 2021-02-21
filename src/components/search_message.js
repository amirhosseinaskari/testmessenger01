import {Search} from 'react-bootstrap-icons';
function SearchMessege(){
    return (<>
        <form className="searchForm">
            <input type="text" placeholder="Search ..." />
            <button type="submit">
                <Search size={20}/>
            </button>
        </form>
    </>);
}

export default SearchMessege;