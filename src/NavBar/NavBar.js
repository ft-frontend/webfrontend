import React from "react";
import styles from "./NavBar.module.css";

class NavBar extends React.Component {
    render() {

        const listItems = [];
        this.props.links.forEach(link => {
            listItems.push(<li><a className={styles.NavBarLinks} href={link.link}>{link.name}</a></li>);
        });

        const buttons = [];

        this.props.buttons.forEach(button => {
            buttons.push(
                <a href={button.link}>
                    <button className={styles.NavBarButton}>
                        {button.name}
                    </button>
                </a>
            );

        });


        return (
            <header className={styles.NavBarHeader}>

                <nav>

                    <ul className={styles.NavBarUL}>
                        {listItems}
                    </ul>

                </nav>


                <div className={styles.NavBarButtonDiv}>
                    {this.props.children}
                    {buttons}
                </div>



            </header>


        );
    }
}

export default NavBar;