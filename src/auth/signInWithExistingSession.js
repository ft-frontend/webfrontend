import React, {Component} from 'react';
import api from "../api/api";
import {Redirect} from "react-router-dom";

class SignInWithExistingSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            url: ""
        }
    }

    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const page = urlParams.get('redirect');
        const session = urlParams.get('session');
        api.setSession(session).then(result => {
            if (result === true) {
                this.setState({
                    redirect: true,
                    url: page
                })
            }else{

            }
        });
    }

    render() {
        return (
            <div>
                Please Wait
                {
                    this.state.redirect&&
                    <Redirect to={this.state.url}/>
                }
            </div>
        );
    }
}

export default SignInWithExistingSession;