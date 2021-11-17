import React, {Component} from 'react';
import api from "../api/api";
import VersionNumber from "../UI/Version/VersionNumber";

class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <button onClick={() => {api.setBackendAddress("https://testingapi.arnold-tim.de/api")}}>Testing Backend</button>
                <button onClick={() => {api.setBackendAddress("https://api.arnold-tim.de/api")}}>Production Backend</button>
                <button onClick={() => {api.setBackendAddress("http://localhost/api")}}>Local Backend</button>
                <VersionNumber/>
            </div>
        );
    }
}

export default AdminDashboard;