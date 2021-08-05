import api from "../../api/api";

function getCurrentUserNavBarButtons(isSessionValid) {


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


}

export default getCurrentUserNavBarButtons;