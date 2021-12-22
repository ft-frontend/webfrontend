import React from "react";
import signInStyle from "./sign.module.css"
import api from "../api/api";
import {Redirect} from "react-router-dom";



class SignIn extends React.Component {

    constructor(props) {
        super(props);
        api.checkSession().then(r => { if(r) window.location.replace("/dashboard");})

        this.state = {value: '',redirect: false,url: '',totp: false};

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleStaySignInChange = this.handleStaySignInChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTOTPTokenChange = this.handleTOTPTokenChange.bind(this);
    }

    handleChangePass(event) {
        this.setState({password: event.target.value});
    }
    handleChangeUser(event) {
        this.setState({name: event.target.value});
    }
    handleStaySignInChange(event) {
        this.setState({staySignIn: event.target.checked});

    }

    handleTOTPTokenChange(event) {
        this.setState({totpToken: event.target.value});
    }


    handleSubmit(event) {
        api.signIn(this.state.name,this.state.password,this.state.totp?this.state.totpToken:undefined,this.state.staySignIn?24*60*14:undefined).then(result => {
           if(result.success) {
               const queryString = window.location.search;
               const urlParams = new URLSearchParams(queryString);
               this.setState({redirect: true,url:  urlParams.get('redirect')})

           }else{
               console.log(result);
               if(result.raw.totp===true) {
                   event.target.reset();
                   this.setState({totp: true})
               }else{
                   this.setState({error: result.error});
               }

           }
        })
        event.preventDefault();
    }

    render() {
        const { redirect,totp } = this.state;

        if (redirect) {
            return <Redirect to={this.state.url}/>;
        }else if(!totp){

            return (

                <div>

                    <div className={signInStyle.loginBackground}/>

                    <form className={signInStyle.signinform} onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <input type="text" placeholder="E-mail/Name" onChange={this.handleChangeUser}/>

                        <input type="password" placeholder="Passwort" onChange={this.handleChangePass}/>

                        <input type="checkbox" id="staySignIn" onChange={this.handleStaySignInChange}/>
                        <label className={signInStyle.staySignInLabel} htmlFor="staySignIn">Angemeldet bleiben </label>

                        <button type='submit'>Login</button>



                        <p className={signInStyle.errorlable}>{this.state.error}</p>


                    </form>

                </div>

            )
        }else{
            return (


                <div  >

                    <div  className={signInStyle.loginBackground}/>

                    <form  className={signInStyle.signinform} onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <input type="text" autoComplete="off" autoCorrect="off" defaultValue={""} placeholder="Code" onChange={this.handleTOTPTokenChange}/>


                        <button type='submit'>Login</button>


                        <p className={signInStyle.errorlable}>{this.state.error}</p>


                    </form>

                </div>
            )
        }
    }
}
export default SignIn;