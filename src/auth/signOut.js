import React from "react";
import api from "../api/api";
import {Redirect} from "react-router-dom";

class SignOut extends React.Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        setTimeout(() => {
            api.signOut().then(res => {
                    this.setState({redirect: true});
            });
        },1000)
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return <p>Please Wait while we signing you out!</p>
    }
}
export default SignOut;