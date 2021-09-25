import i18next from "i18next";

const accountSettingsHandler = {

    handlerSettings: function (settings) {
        if(typeof (settings.darkmode) !== undefined) {
            console.log(settings.darkmode)
            if(settings.darkmode) {
                window.localStorage.setItem("darkmode", settings.darkmode);

                document.body.classList.add("dark-body")
            }else{
                document.body.classList.remove("dark-body")
            }
        }
        if(typeof (settings.language) !== undefined) {
            i18next.changeLanguage(settings.language);
        }


    }

}

export default accountSettingsHandler;