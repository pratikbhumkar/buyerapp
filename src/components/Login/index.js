import React from 'react';
import { Redirect } from 'react-router-dom';
const firebase = require('firebase');
const config = {
    apiKey: 'AIzaSyAQHf0O3YXXMjF5wAoVzMJrx3AIEfAUrK8',
    authDomain: 'buyer-app-d455c.firebaseio.com',
    databaseURL: 'https://buyer-app-d455c.firebaseio.com',
    projectId: 'buyer-app-d455c',
    storageBucket: 'buyer-app-d455c.appspot.com',
    messagingSenderId: '73842735952',
};
var that= null;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectMe: false
        }
        this.onChange = this.onChange.bind(this);
        that = this;
    }

    onChange() {
        this.setState({ redirectMe: true })
    }
    doLogin() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        firebase.database().ref('users').orderByChild('email').equalTo(email).once("value", snapshot => {
            const userData = snapshot.val();
            if (userData) {
                snapshot.forEach(function (childSnapshot) {
                    const value = childSnapshot.val();
                    if (value.password.trim() === password.trim()) {
                        localStorage.setItem("user", JSON.stringify(value));
                        that.onChange();
                    }
                    else {
                        alert('Either user id or password is incorrect')
                        document.getElementById('email').value = '';
                        document.getElementById('password').value = '';
                    }
                });
            }
            else {
                alert('Either user id or password is incorrect')
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            }



        })
    }

    render() {
        if (this.state.redirectMe) {
            return <Redirect to='/home' />
        }
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" id="email" className="form-control" placeholder="username" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" id="password" className="form-control" placeholder="password" />
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" />Remember Me
                            </div>
                                <div className="form-group">
                                    <input type="button" onClick={() => this.doLogin()} value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/registerUser">Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;