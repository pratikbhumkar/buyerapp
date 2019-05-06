import React from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import Webcam from "react-webcam";
import Modal from '@trendmicro/react-modal';
import '@trendmicro/react-modal/dist/react-modal.css';
const firebase = require('firebase');
var that = '';
const config = {
    apiKey: 'AIzaSyAQHf0O3YXXMjF5wAoVzMJrx3AIEfAUrK8',
    authDomain: 'buyer-app-d455c.firebaseio.com',
    databaseURL: 'https://buyer-app-d455c.firebaseio.com',
    projectId: 'buyer-app-d455c',
    storageBucket: 'buyer-app-d455c.appspot.com',
    messagingSenderId: '73842735952',
};

var imageSrc = null;
const videoConstraints = {
    width: 350,
    height: 350,
    facingMode: "user"
};
var user = null;
var eventData = null;
var eventId = '';
var _isMounted = false;
class AddItemToEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: null,
            saveImage: false,
            webcamEnabled: false,
            redirect: false
        }
        if (this.props.location.state != undefined) {
            eventId = (this.props.location.state.eventId);

        }
        that = this;
    }
    enableWebcam = () => this.setState({ webcamEnabled: !this.state.webcamEnabled });

    setRef = webcam => {
        this.webcam = webcam;
    };
    capture = () => {
        imageSrc = this.webcam.getScreenshot();
        localStorage.setItem("imageSrc", imageSrc);
        // this.setState({
        //     imageData: imageSrc
        // })
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    // onClickRetake = (e) => {
    //     e.persist();
    //     this.setState({
    //         imageData: null
    //     })
    // }
    saveButtonClick() {
        var image = localStorage.getItem("imageSrc");
        var vendor = document.getElementById('vendor').value;
        var price = document.getElementById('price').value;
        var moq = document.getElementById('moq').value;
        var comment = 'To be decided';
        var description = 'to be decided';
        var downPayment = '$100';
        var eventId = (eventId != '' && eventId != null) ? eventId : this.props.location.state.eventId;
        var itemName = '';
        var productTime = '2 weeks';
        var size = '5x7';
        var vendor = 'Ratnesh';

        if (!this.state.webcamEnabled) {
            if (this.isValidString(image) && this.isValidString(vendor) && this.isValidString(price) && this.isValidString(moq)) {
                // const event = snapshot.val();
                firebase.database().ref('items/').push({
                    comment,
                    description,
                    downPayment,
                    eventId,
                    image,
                    itemName,
                    moq,
                    price,
                    productTime,
                    size,
                    vendor
                }).then((data) => {
                    //success callback
                    console.log('data ', data)
                    alert('event saved successfully.')
                }).catch((error) => {
                    //error callback
                    console.log('error ', error)
                });
            }
            else {
                alert('Please fill records in all fields')
            }
        }
        else {
            alert('Please close/disable Webcam before save');
        }

    }

    isValidString(value) {
        if (value.toString().trim() !== null && value.toString().trim() !== undefined && value.toString().trim() !== '') {
            return true;
        }
        return false;
    }
    onClickSave = (e) => {
        e.persist();
        this.saveButtonClick();
        // this.setState(
        //     (previousState) => {
        //         return {
        //             saveImage: !previousState.saveImage
        //         }
        //     })
    }

    // handleChange = (e) => {
    //     e.persist();
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    handleSaveSubmit = (e) => {
        e.preventDefault();
        let imageObject = {
            image_name: this.state.image_name,
        }
    }

    fileInput(input) {
        if (input !== null && input !== undefined) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var url = reader.readAsDataURL(input.files[0]);
                return (
                    <div className="row input-group mb-3">
                        <div className="col-sm-12 text-center">
                            <div>
                                <span className="input-group-text" id="basic-addon1">Your Image</span>
                            </div>
                            <img id="imgShowPic" src={(input.files[0] != null) ? input.files[0] : localStorage.getItem("imageSrc")} />
                        </div>
                    </div>
                )
            }
        }

    }

    renderShowImage() {
        if (this.state.imageData !== null || localStorage.getItem("imageSrc")) {
            return (
                <div className="row input-group mb-3">
                    <div className="col-sm-12 text-center">
                        <div>
                            <span className="input-group-text" id="basic-addon1">Your Image</span>
                        </div>
                        <img id="imgShowPic" src={(this.state.imageData != null) ? this.state.imageData : localStorage.getItem("imageSrc")} />
                    </div>
                </div>
            )
        }
    }

    returnHome() {
        that.setState({ redirect: true })
    }

    renderTableData() {
        var events = [];
        var event = null;
        user = localStorage.getItem('user');
        var userObj = JSON.parse(user);
        var userId = userObj.id;
        new Promise(function (resolve, reject) {
            setTimeout(() => resolve(firebase.database().ref('items').orderByChild('eventId').once("value", snapshot => {
                snapshot.forEach(function (childSnapshot) {
                    events.push(childSnapshot.val());
                });
            })), 2000);
        }).finally(() => console.log("Promise ready"))
            .then(function () {
                if (document.getElementById('tblEventDetails') !== null && document.getElementById('tblEventDetails') !== undefined) {
                    var tableRef = document.getElementById('tblEventDetails').getElementsByTagName('tbody')[0];
                    var htmlData = '';
                    events.map((events, index) => {
                        var newRow = tableRef.insertRow(tableRef.rows.length);
                        const { eventId, vendor, image, price, moq } = events //destructuring
                        htmlData =
                            '<tr key=' + eventId + '>' +
                            '<td>' + vendor + '</td>' +
                            '<td><img style={{ height: 100px, width: 100px }} src={' + image + '} /></td>'
                            + '<td>' + price + '</td>' +
                            '<td>' + moq + '</td>' +
                            '</tr>';

                        newRow.innerHTML = htmlData;

                    })
                }

                // var newData = ReactDOMServer.renderToString(htmlString);
                // var myList = document.getElementById('myList');
                // if (myList != null)
                //     myList.innerHTML = newData;
            });


        // <tbody>
        //                             <tr>
        //                                 <td>Event 1</td>
        //                                 <td><img style={{ height: '100px', width: '100px' }} src="https://www.gstatic.com/webp/gallery/1.jpg" className="img-thumbnail img-responsive" /></td>
        //                                 <td>$400</td>
        //                                 <td>61</td>

        //                             </tr>
        //                             <tr>
        //                                 <td>Event2</td>
        //                                 <td><img style={{ height: '100px', width: '100px' }} src="https://www.gstatic.com/webp/gallery/1.jpg" className="img-thumbnail img-responsive" /></td>
        //                                 <td>$1200.50</td>
        //                                 <td>63</td>

        //                             </tr>
        //                             <tr>
        //                                 <td>Event3</td>
        //                                 <td><img style={{ height: '100px', width: '100px' }} src="https://www.gstatic.com/webp/gallery/1.jpg" className="img-thumbnail img-responsive" /></td>
        //                                 <td>$5500</td>
        //                                 <td>66</td>

        //                             </tr>
        //                             <tr>
        //                                 <td>Event4</td>
        //                                 <td><img style={{ height: '100px', width: '100px' }} src="https://www.gstatic.com/webp/gallery/1.jpg" className="img-thumbnail img-responsive" /></td>
        //                                 <td>$9900</td>
        //                                 <td>22</td>

        //                             </tr>
        //                         </tbody>
    }
    render() {
        alert(this.state.redirect)
        if (this.state.redirect) {
            return <Redirect to='/home' />
        }
        else {
            user = localStorage.getItem("user");
            if (user != null && user != undefined) {
                return (
                    <div>
                        <div className="col-xs-4 text-center">
                            <h3>New Item</h3>
                            {/* <button className="btn btn-lg"><i className="fa fa-plus"></i> Create New Event</button> */}
                        </div>

                        <form className="container">
                            {this.state.webcamEnabled ?
                                <div className="row input-group mb-3">
                                    <div className="col-sm-12 text-center">
                                        <span className="input-group-text text-center" id="basic-addon1">WebCam</span>
                                        <Webcam
                                            audio={false}
                                            height={350}
                                            ref={this.setRef}
                                            screenshotFormat="image/jpeg"
                                            width={350}
                                            videoConstraints={videoConstraints}
                                        />
                                        <span className="input-group-text text-center" id="basic-addon1">WebCam</span>
                                    </div>
                                </div> :
                                (
                                    <div />
                                )}

                            <div className="row input-group mb-3">
                                <div className="col-sm-12 text-center">
                                    <button id="btnTakePic" className="btn btn-light btn-outline-secondary fa fa-image" style={{ width: '150px', height: '50px', marginRight: '5px' }} onClick={this.capture} > Take Picture</button>
                                    <button className="btn btn-light btn-outline-secondary fa fa-image" style={{ width: '150px', height: '50px', marginRight: '5px' }} id="btnEnableCamera" type="button" onClick={this.enableWebcam}>
                                        {(!this.state.webcamEnabled) ? 'Enable Webcam' : 'Disable Webcam'}
                                    </button>
                                    <span accept="image/*" id="btnSelectPic" ref={this.fileInput} className="btn btn-light btn-outline-secondary fa fa-image" style={{ width: '150px', height: '50px', marginRight: '5px', position: 'relative', overflow: 'hidden' }} display="none">
                                        Choose Image<input id="imgShow" style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            width: '100%',
                                            height: '100%',
                                            size: '100px',
                                            align: 'right',
                                            filter: 'alpha(opacity = 0)',
                                            opacity: '0',
                                            outline: 'none',
                                            cursor: 'inherit',
                                            display: 'block'
                                        }} type="file" />
                                    </span>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Vendor#</span>
                                </div>
                                <input type="text" className="form-control" id="vendor" aria-describedby="basic-addon3" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon2">Price</span>
                                </div>
                                <input type="text" className="form-control" id="price" aria-describedby="basic-addon3" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">MOQ#</span>
                                </div>
                                <input type="text" className="form-control" id="moq" aria-describedby="basic-addon3" />
                            </div>
                            {this.renderShowImage()}
                            <div className="row input-group mb-3">
                                <div className="col-sm-12 text-center">
                                    <button id="btnSave" type="button" className="btn btn-light btn-outline-secondary far fa-save" style={{ width: '150px', height: '50px', marginRight: '5px' }} onClick={this.onClickSave} > Save</button>
                                    <button id="btnReturnHome" type="button" className="btn btn-light btn-outline-secondary fas fa-home" style={{ width: '150px', height: '50px', marginRight: '5px' }} onClick={this.returnHome}> Return Home</button>
                                </div>
                            </div>
                            <div>
                                <table id="tblEventDetails" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
                                    <thead>
                                        <tr style={{ height: '60px' }}>
                                            <th className="th-sm">Vdndor#
          </th>
                                            <th className="th-sm">Image(thumbnail)
          </th>
                                            <th className="th-sm">Price
          </th>
                                            <th className="th-sm">MOQ#
          </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                )
            }
            else {
                return <Redirect to='/' />
            }
        }


    }
}
export default AddItemToEvent;