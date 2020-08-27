import React, { Component } from 'react';
import '../../assets/css/login.css'
class Login extends Component {
    render() {
        return (
            <div className="login">
                {/* <h3>Welecom</h3> */}
                <input type="text" placeholder="手机号" />
                <input type="text" placeholder="密码"/>
                <button>登录</button>
            </div>
        );
    }
}

export default Login;