import React from "react";
import NavBar from "./UI/NavBar/NavBar";
import api from "./api/api";


class MainPage extends React.Component {


    componentDidMount() {
        api.checkSession().then(r => { if(r) window.location.replace("/dashboard");})
    }

    render() {
        return <NavBar links={[
            {
                name: "Home",
                link: "#"
            },
            {
                name: "Software",
                link: "https://www.github.com/ft-cloud"
            }
        ]} buttons={[
            {
                name: "Einloggen",
                link: "/auth/signin?redirect=/dashboard"
            },
            {
                name: "Registrieren",
                link: "/auth/signup?redirect=/dashboard"

            }
        ]}/>;

    }
}

export default MainPage;