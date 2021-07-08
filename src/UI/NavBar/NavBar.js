import React from "react";
import styles from "./NavBar.module.css";
import AppSelector from "../appSelector/appSelector";

class NavBar extends React.Component {
    render() {

        const listItems = [];
        this.props.links.forEach(link => {
            listItems.push(<li key={link.name}><a className={styles.NavBarLinks} href={link.link}>{link.name}</a></li>);
        });

        const buttons = [];

        this.props.buttons.forEach(button => {
            buttons.push(

                    <button onClick={()=> window.location.href=button.link} key={button.name} className={styles.NavBarButton} >
                        <p>
                        {button.name}
                        </p>
                    </button>

            );

        });


        return (
            <header className={styles.NavBarHeader}>

                <nav>

                    <ul  className={styles.NavBarUL}>
                        {listItems}
                    </ul>

                </nav>

                {this.props.children}

                <div className={styles.NavBarButtonDiv}>
                    <AppSelector/>
                    {buttons}
                </div>



            </header>


        );
    }
}

export default NavBar;