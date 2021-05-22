import React from "react";
import NavBar from "./NavBar/NavBar";


class MainPage extends React.Component {
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
                link: "#"
            },
            {
                name: "Registrieren",
                link: "#"

            }
        ]}/>;

    }
}

export default MainPage;