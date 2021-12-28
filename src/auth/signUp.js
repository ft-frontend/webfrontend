import React from "react";
import api from "../api/api";
import {Redirect} from "react-router-dom";
import signInStyle from "./sign.module.css";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', hasSignedUp: false, url: ''};
        api.checkSession().then(r => {
            if (r) window.location.replace("/dashboard");
        });

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePass(event) {
        this.setState({password: event.target.value});
    }

    handleChangeUser(event) {
        this.setState({name: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {

        api.signUp(this.state.name, this.state.email, this.state.password).then(result => {
            if (result.success) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                this.setState({hasSignedUp: true, url: urlParams.get('redirect')});

            } else {
                console.log(result.errorCode);
                this.setState({error: api.parseError(result.errorCode)});
            }
        });
        event.preventDefault();
    }

    render() {
        const {hasSignedUp} = this.state;

        if (hasSignedUp) {
            return (<div className={signInStyle.loginBackground}>

                    <div className={signInStyle.signinform}>

                        <h1>Registrieren</h1>
                        <p style={{color: "#fff"}}>Abgeschlossen. Bitte Verifizieren deine Email über den Link in deinem Postfach</p>
                        <a style={{color: "#fff",textDecoration: "none"}} href={"/auth/signin?redirect=" + this.state.url}>Zum Login</a>
                    </div>

                </div>
            );
        } else {

            return (

                <div>

                    <div className={signInStyle.loginBackground}/>

                    <form className={signInStyle.signinform} onSubmit={this.handleSubmit}>
                        <h1>Registrieren</h1>
                        <input type="text" placeholder="Name" onChange={this.handleChangeUser}/>
                        <input type="text" placeholder="E-Mail" onChange={this.handleChangeEmail}/>

                        <input type="password" placeholder="Passwort" onChange={this.handleChangePass}/>

                        <button type="submit">Registrieren</button>

                        <p className={signInStyle.errorlable}>{this.state.error}</p>

                    </form>
                </div>

            );
        }
    }
}

export default SignUp;