import { useRef } from "react";
import '../assets/css/login.scss';
function  Login(props) {
    const inputRef = useRef(null);
    return (<div className="loginContainer">
        <div className="login_form">
            <form onSubmit={(e) => { 
                    e.stopPropagation();
                    e.preventDefault();
                    props.onLogin(inputRef.current.value);
                    }}>
                <input ref={inputRef} required type="text" placeholder="enter your id" />
                <button type="submit">Login</button>
            </form>
        </div>
    </div>);
}

export default Login;