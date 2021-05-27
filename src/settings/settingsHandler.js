const settingsHandler = {

    handlerSettings: function (settings) {
        if(typeof (settings.darkmode) !== undefined) {
            if(settings.darkmode) {
                document.body.classList.add("dark-body")
            }else{
                document.body.classList.remove("dark-body")
            }
        }


    }

}

export default settingsHandler;