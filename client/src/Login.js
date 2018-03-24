import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <form action="/login" method="POST">
              First name:<br>
              <input type="text" name="username" >
              <br>
              Last name:<br>
              <input type="text" name="password" >
              <br><br>
                <button>Login</button>
            </form> 
        )
    }
}
export default Login;