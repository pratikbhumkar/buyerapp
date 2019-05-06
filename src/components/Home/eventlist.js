import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import $ from 'jquery';

const data = [
    ["eventdate", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
const headers = [
    { label: "Event Date", key: "eventdate" },
    { label: "Event Location", key: "location" },
    { label: "Event Name", key: "name" },
    { label: "MOQ", key: "moq" }

];

class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    onChildButtonClick(val) {
        alert(val);
      }
    render() {
        return (
            <li className="list-group-item">
                <div className="col-xs-4 text-center">
                        <b>{this.props.name}</b>
                    <div style={{ margin: 10 }}>
                        <button key={this.props.eventId} id={"btn"+this.props.eventId} type="button" onClick={this.onChildButtonClick.bind(null, this.props.eventId)} style={{ marginRight: 5 }} className="btn btn-light btn-outline-secondary">Add Item To Event</button>
                        <button type="button" id={"btnCSV"+this.props.eventId} style={{ marginLeft: 5 }} className="btn btn-light btn-outline-secondary" data={data } headers={headers}>Expot Event (CSV Format)</button>
                    </div>
                </div>
            </li>
        );
    }
}
export default EventList;


// htmlString += <li className="list-group-item">' +
// '<div className="col-xs-4 text-center">' +
//                     value.name +
// '<div style={{ margin: 10 }}>' +
// '<button type="button" onClick={() => that.setState({ redirectMe: true })} style={{ marginRight: 5 }} className="btn btn-light btn-outline-secondary">Add Item To Event</button>' +
// '<CSVLink type="button" style={{ marginLeft: 5 }} className="btn btn-light btn-outline-secondary" data={'+data +'} headers={'+ headers +'}>Expot Event (CSV Format)</CSVLink>' +
// '</div>' +
// '</div>' +
// '</li>'