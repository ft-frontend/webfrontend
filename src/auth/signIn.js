import React from "react";
import signInStyle from "./sign.module.css"
import api from "../api/api";
import {useLocation} from "react-router-dom";
import {Redirect} from "react-router-dom";



class SignIn extends React.Component {

    constructor(props) {
        super(props);
        api.checkSession().then(r => { if(r) window.location.replace("/dashboard");})

        this.state = {value: '',redirect: false,url: ''};

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePass(event) {
        this.setState({password: event.target.value});
    }
    handleChangeUser(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {

        api.signIn(this.state.name,this.state.password).then(result => {
           if(result.success) {
               const queryString = window.location.search;
               const urlParams = new URLSearchParams(queryString);
               this.setState({redirect: true,url:  urlParams.get('redirect')})

           }else{
               this.setState({error: result.error});
           }
        })
        event.preventDefault();
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={this.state.url}/>;
        }else {

            return (

                <div>

                    <div className={signInStyle.loginBackground}/>

                    <form className={signInStyle.signinform} onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <input type="text" placeholder="E-mail/Name" onChange={this.handleChangeUser}/>

                        <input type="password" placeholder="Passwort" onChange={this.handleChangePass}/>

                        <button type='submit'>Login</button>

                        <p className={signInStyle.errorlable}>{this.state.error}</p>

                    </form>
                </div>

            )
        }
    }
}
export default SignIn;