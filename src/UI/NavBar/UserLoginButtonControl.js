import api from "../../api/api";

function getCurrentUserNavBarButtons() {


    return new Promise((resolve, reject) => {
        api.checkSession().then(r => {
            if (r) {

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

    });


}

export default getCurrentUserNavBarButtons;