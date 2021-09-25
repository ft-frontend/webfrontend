import style from "./UserLoginButtonControl.module.css"
import AccountNavBar from "../AccountButton/AccountNavBar";
import {useTranslation} from "react-i18next";

function GetCurrentUserNavBarButtons(isSessionValid) {

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
        return <AccountNavBar/>
    } else {
        return <GenerateButtons/>;
    }


}

function GenerateButtons(props) {
    const {t} = useTranslation();

    return   <>
        <button className={style.NavBarButton} onClick={()=>window.location.href="/auth/signin?redirect=/dashboard"}><p>{t('signin')}</p></button>
        <button className={style.NavBarButton} onClick={()=>window.location.href="/auth/signup?redirect=/dashboard"}><p>{t('signup')}</p></button>
    </>
}

export default GetCurrentUserNavBarButtons;