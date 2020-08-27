import React, { Component } from 'react';
import '../../assets/css/register.css'
class Register extends Component {
    render() {
        return (
            <div className='register'>
                <input type="text" placeholder="手机号" />
                <input type="text" placeholder="昵称" />
                <div>
                    <input type="text" placeholder="验证码" />
                    <button>发送验证码</button>
                </div>
                <input type="text" placeholder="密码" />
                <button>注册</button>
            </div>
        );
    }
}

export default Register;