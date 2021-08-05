import api from "../../api/api";

function getCurrentUserNavBarButtons(isSessionValid) {


    return new Promise((resolve, reject) => {

            if (isSessionValid) {

                    resolve([
                        {
                            name: "Ausloggen",
                            link: "/auth/signout"
                        }
                    ]);

            } else {
                resolve([
                    {
                        name: "Einloggen",
                        link: "/auth/signin?redirect=/dashboard"
                    },
                    {
                        name: "Registrieren",
                        link: "/auth/signup?redirect=/dashboard"

                    }
                ])
            }


    });


}

export default getCurrentUserNavBarButtons;