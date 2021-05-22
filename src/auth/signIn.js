import React from "react";
import signInStyle from "./signIn.module.css"
import api from "../api/api";



class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

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
           }else{
               this.setState({error: result.error});
           }
        })
        event.preventDefault();
    }

    render() {
       return (


            <div>
                <div className={signInStyle.loginBackground}/>

                <form className={signInStyle.signinform} onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <input type="text" placeholder="E-mail/Name" onChange={this.handleChangeUser} />

            <input type="password" placeholder="Passwort" onChange={this.handleChangePass}/>

              <button  type='submit' >Login</button>

            <p className={signInStyle.errorlable}>{this.state.error}</p>

        </form>
            </div>

    )
    }
}
export default SignIn;