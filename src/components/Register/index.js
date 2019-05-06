import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
const firebase = require('firebase');
const uuid = require('uuid');
var alreadySavedId = 0;
const config = {
    apiKey: 'AIzaSyAQHf0O3YXXMjF5wAoVzMJrx3AIEfAUrK8',
    authDomain: 'buyer-app-d455c.firebaseio.com',
    databaseURL: 'https://buyer-app-d455c.firebaseio.com',
    projectId: 'buyer-app-d455c',
    storageBucket: 'buyer-app-d455c.appspot.com',
    messagingSenderId: '73842735952',
};
firebase.initializeApp(config);

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectMe: false,
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }
    componentDidMount() {
        this.hideSlidingMenu();
    }
    hideSlidingMenu() {
        if (document.getElementById('main') != null)
            document.getElementById('main').style.display = 'none';
    }

    onSave() {
        let postRef = firebase.database().ref('users').orderByKey().limitToLast(1);
        let id = 0;
        let email = document.getElementById('email').value;
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let password = document.getElementById('password').value;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = dd + '/' + mm + '/' + yyyy;
        if (email.toString().trim() !== '' && email.toString().trim() !== null && firstName.toString().trim() !== '' && firstName.toString().trim() !== null && lastName.toString().trim() !== ''
            && lastName.toString().trim() !== null && password.toString().trim() !== '' && password.toString().trim() !== null) {
            new Promise(function (resolve, reject) {
                setTimeout(() => resolve(firebase.database().ref('users').orderByChild('id').once("value", snapshot => {
                    const userData = snapshot.val();
                    snapshot.forEach(function (childSnapshot) {
                        id++;
                    });
                })), 1000);
            }).finally(() => console.log("Promise ready"))
                .then(function () {
                    firebase.database().ref('users').orderByChild('email').equalTo(email).once("value", snapshot => {
                        const userData = snapshot.val();
                        if (!userData) {
                            firebase.database().ref('users/').push({
                                email,
                                firstName,
                                id,
                                lastName,
                                password,
                                today
                            }).then((data) => {
                                //success callback
                                console.log('data ', data)
                                alert('you are registered successfully, please login to enter')
                            }).catch((error) => {
                                //error callback
                                console.log('error ', error)
                            });
                        }
                        else {
                            var value = '';
                            snapshot.forEach(function (childSnapshot) {
                                value = childSnapshot.val();
                            });
                            alert('User email ' + value.email + ' already exists.');
                        }
                    })
                })
        }
        else {
            alert('Plese fill all fields for registering')
        }
    }

    getUserTableId() {
        var id = 0;

        alreadySavedId = id;
    }
    submitData(event) {
        event.preventDefault();
        firebase
            .database()
            .ref(`Newdata/${this.state.uid}`)
            .set({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
    }

    onClear() {
        document.getElementById('email').value = '';
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('password').value = '';
    }

    redirectToLogin() {
        this.setState({ redirectMe: true })
    }
    render() {
        if (this.state.redirectMe) {
            return <Redirect to='/' />
        }
        return (
            <div className="container" style={{ marginTop: '50' }}>
                <div className="col-xs-4 text-center">
                    <h3>Register User</h3>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">Email</span>
                    </div>
                    <input type="text" className="form-control" id="email" aria-describedby="basic-addon3" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">First Name</span>
                    </div>
                    <input type="text" className="form-control" id="firstName" aria-describedby="basic-addon3" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">Last Name</span>
                    </div>
                    <input type="text" className="form-control" id="lastName" aria-describedby="basic-addon3" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">Password</span>
                    </div>
                    <input type="password" className="form-control" id="password" aria-describedby="basic-addon3" />
                </div>

                <div className="col-xs-4 text-center">
                    <div style={{ margin: 10 }}>
                        <button type="button" onClick={() => this.onSave()} style={{ marginRight: 5, width: '250px' }} className="btn btn-light btn-outline-secondary">Save</button>
                        <button type="button" onClick={() => this.onClear()} style={{ marginLeft: 5, width: '250px' }} className="btn btn-light btn-outline-secondary">Clear</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;