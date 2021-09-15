import api from "../../api/api";
import style from "./UserLoginButtonControl.module.css"
import AccountButton from "../AccountButton/AccountButton";

function getCurrentUserNavBarButtons(isSessionValid) {
/*

    if (isSessionValid) {

        return [
            {
                name: "Ausloggen",
                link: "/auth/signout"
            }
        ];

    } else {
        return [
            {
                name: "Einloggen",
                link: "/auth/signin?redirect=/dashboard"
            },
            {
                name: "Registrieren",
                link: "/auth/signup?redirect=/dashboard"

            }
        ];
    }



 */



    if (isSessionValid) {

        //return <button className={style.NavBarButton} onClick={()=>window.location.href="/auth/signout"}><p>Ausloggen</p></button>;
        return <AccountButton/>
    } else {
        return <>
            <button className={style.NavBarButton} onClick={()=>window.location.href="/auth/signin"}><p>Einloggen</p></button>
            <button className={style.NavBarButton} onClick={()=>window.location.href="/auth/signup"}><p>Registrieren</p></button>
            </>;
    }


}

export default getCurrentUserNavBarButtons;