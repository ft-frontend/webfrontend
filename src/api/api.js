import Cookies from 'universal-cookie';
import {w3cwebsocket as W3CWebSocket} from "websocket";
import i18next from "i18next";

const cookies = new Cookies();
let backend = "https://api.arnold-tim.de/api";
if (cookies.get('backend') !== undefined) {
    backend = cookies.get('backend');
}

var redirect = true;

const post = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: undefined
};

function checkErrorCodes(response) {
    if (response.errorcode) {

        if (response.errorcode === "006") {
            redirectToLogin();
        }
        return true;
    }

}

function redirectToLogin() {
    if (redirect) {
        window.location.href = "/auth/signin?redirect=" + window.location.pathname;
    }

}

function parseError(errorCode) {
    switch (errorCode) {
        case "002":
            return i18next.t("error_2");
            break;
            case "004":
            return i18next.t("error_4");
            break;
            case "005":
            return i18next.t("error_5");
            break;
            case "006":
            return i18next.t("error_6");
            break;
            case "010":
            return i18next.t("error_10");
            break;
            case "011":
            return i18next.t("error_11");
            break;
            case "012":
            return i18next.t("error_12");
            break;
            case "013":
            return i18next.t("error_13");
            break;
            case "014":
            return i18next.t("error_14");
            break;
    }

}

const api = {

    checkSession: function () {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                fetch(backend + `/v1/auth/validateSession?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if(!result.success) {
                        cookies.remove('session', {path: '/'});
                    }
                    resolve(result.success);
                });
            }
        });

    },
    signIn: function (eorn, password, sessionTime=30) {
        return new Promise((resolve, reject) => {
            post.body = JSON.stringify({
                eorn: eorn,
                password: password,
                sessionTime: sessionTime
            });

            fetch(backend + `/v1/auth/signin`, post).then(res => res.json()).then(result => {
                if (!result.error) {
                    cookies.set('session', result.session, {path: '/',expires: new Date(Date.now()+1000*60*60*24*14)});
                    this.getAccountSettings(true);

                    resolve({
                        success: true,
                        session: result.session
                    });
                } else {
                    resolve({
                        success: false,
                        error: result.error
                    });
                }
            });


        });
    },
    signOut: function () {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                });
                fetch(backend + `/v1/auth/signout`, post).then(res => res.json()).then(result => {
                    cookies.remove('session', {path: '/'});
                    cookies.remove('acsettings', {path: '/'});
                    localStorage.removeItem('username');

                    if (!result.error) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }

        });

    },
    signUp: function (username, email, password) {

        return new Promise((resolve, reject) => {
            post.body = JSON.stringify({
                email: email,
                password: password,
                name: username
            });
            fetch(backend + `/v1/auth/signup`, post).then(res => res.json()).then(result => {
                if (result.success) {
                    cookies.set('session', result.session, {path: '/',expires: new Date(Date.now()+1000*60*60*24*14)});
                    this.getAccountSettings(true);

                    resolve({
                        success: true,
                        session: result.session
                    });
                } else {
                    resolve({
                        success: false,
                        error: result.error,
                        errorCode: result.errorcode
                    });
                }
            });


        });

    },

    listAvailableDevices: function () {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/device/listAvailable?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        reject("error");
                        return;
                    }
                    resolve(result.data);
                });
            }

        });
    },

    listSpecificUserDevice: function (deviceUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/device/listSpecificUserDevice?session=${cookies.get('session')}&device=${deviceUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        reject("error");
                        return;
                    }
                    resolve(result.data);
                });
            }

        });
    },
    isSessionCookieAvailable: function() {
        return cookies.get('session') !== undefined;
    },

    updateDeviceName: function (deviceUUID, newName) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    device: deviceUUID,
                    newName: newName
                });
                fetch(backend + `/v1/device/changeDeviceName`,post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        reject("error");
                        return;
                    }
                    resolve(result);
                });
            }

        });
    },

    getUserSpecificDeviceInfo: function (deviceUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/device/getUserSpecificDeviceInfo?session=${cookies.get('session')}&device=${deviceUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        reject("error");
                        return;
                    }

                    resolve(result);
                });
            }

        });
    },


    registerDevice: function (regCode) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/regDevice/registerByCode?session=${cookies.get('session')}&regCode=${regCode}`).then(res => res.json()).then(result => {

                    if (checkErrorCodes(result)) {
                    }
                    if (result.error !== undefined) {
                        resolve({
                            success: false,
                            error: result.error
                        });
                    } else {
                        resolve({
                            success: true,
                            deviceType: result.deviceType,
                            uuid: result.uuid
                        });
                    }
                });
            }

        });
    },

    deleteDevice: function (deviceuuid) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/device/deleteDevice?session=${cookies.get('session')}&deviceuuid=${deviceuuid}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    resolve({
                        success: true
                    });

                });
            }

        });
    },

    getAccountSettings: function (force) {
        return new Promise((resolve, reject) => {

            if (!force) {
                if (cookies.get("acsettings") !== undefined) {
                    resolve({
                        success: true,
                        settings: cookies.get("acsettings")
                    });
                    return;
                }
            }else{
                this.getUserAccountInfo().then((res) => {
                    console.log(res);
                    window.localStorage.setItem("username",res.name);
                })
            }

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/account/getSettings?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (checkErrorCodes(result)) {
                        reject("error");
                        return;
                    }
                    if (result.error !== undefined) {
                        resolve({
                            success: false,
                            error: result.error
                        });
                    } else {
                        cookies.set('acsettings', result, {path: '/'});
                        resolve({
                            success: true,
                            settings: result,
                        });
                    }
                });
            }

        });
    },
    saveAccountSetting: function (key, value) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    key: key,
                    newValue: value
                });
                fetch(backend + `/v1/account/changeSetting`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }

                        resolve({
                            success: result.success
                        });


                });
            }

        });
    },

    getDeviceStatusInfo: function (deviceUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/device/getStatusInfo?session=${cookies.get('session')}&deviceuuid=${deviceUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    resolve({
                        success: true,
                        data: result.data
                    });

                });
            }

        });
    },

    connectToDroneWebsocket: function (deviceuuid) {
        if (cookies.get('session') === undefined) {
            redirectToLogin();
            return undefined;
        } else {
            const client = new W3CWebSocket('wss://api.arnold-tim.de/api/v1/device/droneLiveConnection?session=' + cookies.get("session") + "&device=" + deviceuuid);
            return client;
        }

    },
    makeSearchRequest: function (deviceName, deviceTypeName, searchQuery) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                const params = `${deviceName ? "&deviceName=true" : ""}${deviceTypeName ? "&deviceTypeName=true" : ""}`;

                fetch(backend + `/v1/search/doSearch?session=${cookies.get('session')}${params}&searchquery=${searchQuery}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    resolve({
                        success: true,
                        data: result.result
                    });

                });
            }

        });
    },
    setBackendAddress: function (backendAddress) {
        backend = backendAddress;
        cookies.set('backend', backendAddress, {path: '/'});

    },

    addNewMission: function (name, data) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    name: name,
                    data: data
                });
                fetch(backend + `/v1/drone/mission/createMission`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                            uuid: result.uuid
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }

                });
            }

        });
    },
    listMissions: function () {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/v1/drone/mission/listMissions?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                            missions: result.missions
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }


                });
            }

        });
    },

    getMissionData: function (missionUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/v1/drone/mission/getMissionData?session=${cookies.get('session')}&missionUUID=${missionUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                            mission: result.mission
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }


                });
            }

        });
    },
    saveMissionData: function (missionUUID, missionData) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    missionUUID: missionUUID,
                    data: missionData
                });
                fetch(backend + `/v1/drone/mission/saveMissionData`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }

                });
            }

        });
    },

    getElevationData: function (points) {
        return new Promise((resolve, reject) => {


            fetch(`https://dev.virtualearth.net/REST/v1/Elevation/List?points=${points.join()}&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v`).then(res => res.json()).then(result => {
                resolve({
                    elevations: result.resourceSets[0].resources[0].elevations
                });
            });


        });
    },

    getDeviceConfig: function (deviceUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/v1/device/getDeviceConfig?session=${cookies.get('session')}&device=${deviceUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                            config: result.data
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }


                });
            }

        });
    },

    saveDeviceConfig: function (deviceUUID, key, value) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    deviceuuid: deviceUUID,
                    param: key,
                    value: value
                });
                fetch(backend + `/v1/device/saveConfig`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }

                });
            }

        });
    },

    deleteMission: function (missionUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/v1/drone/mission/deleteDroneMission?session=${cookies.get('session')}&missionUUID=${missionUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }


                });
            }

        });
    },
    renameMission: function (missionUUID, newName) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    missionUUID: missionUUID,
                    newMissionName: newName
                });
                fetch(backend + `/v1/drone/mission/renameDroneMission`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }
                    if (result.success) {
                        resolve({
                            success: true,
                        });
                    } else {
                        resolve({
                            success: false
                        });
                    }

                });
            }

        });
    },

    toggleRedirect: function (redirectToLogin) {
        redirect = redirectToLogin;
    },

    isUserAdmin: function() {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/v1/account/amIAdmin?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({result: false});
                        return;
                    }
                    if (result.isAdmin) {
                        resolve({
                            result: true,
                        });
                    } else {
                        resolve({
                            result: false
                        });
                    }


                });
            }

        });
    },
    getUserAccountInfo: function() {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/v1/account/info?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({result: false});
                        return;
                    }
                        resolve(result);
                });
            }

        });
    },

    changeUsername: function (newUsername) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    newUsername: newUsername
                });
                fetch(backend + `/v1/account/changeUsername`, post).then(res => res.json()).then(result => {
                    console.log(result);
                    if (checkErrorCodes(result)) {
                        resolve(result);
                        return;
                    }
                        resolve(result);


                });
            }

        });
    },

    checkGoogleAccount: function () {
        return new Promise((resolve, reject) => {


            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/v1/account/checkGoogleAuth?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({valid: false});
                        return;
                    }

                  resolve({valid:result.valid,googleResponse: result.googleResponse});
                });
            }

        });
    },
    saveGoogleToken: function (token) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    token: token
                });
                fetch(backend + `/v1/account/changeGoogleAuth`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }

                    resolve({
                        success: result.success
                    });


                });
            }

        });
    },

    loadGoogleAuthScript: function () {
        const meta = document.createElement("meta");
        meta.name = "google-signin-client_id";
        meta.content = "213041413684-upirs2j8p9ute8tjohkd1bqpnrqv49h8.apps.googleusercontent.com"

        document.head.appendChild(meta)
        //Google Oauth
        let script = document.createElement("script");
        script.type = "application/javascript";
        script.async = true;
        script.defer = true;

        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);
        return script
    },

    signInWithGoogleAccountToken: function (token) {
        console.log(token)
        return new Promise((resolve, reject) => {
            post.body = JSON.stringify({
                token: token
            });

            fetch(backend + `/v1/auth/startSessionWithGoogle`, post).then(res => res.json()).then(result => {
                if (!result.error) {
                    cookies.set('session', result.session, {path: '/',expires: new Date(Date.now()+1000*60*60*24*14)});
                    this.getAccountSettings(true);

                    resolve({
                        success: true,
                        session: result.session
                    });
                } else {
                    resolve({
                        success: false,
                        error: result.error
                    });
                }
            });


        });
    },
    deleteGoogleToken: function () {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),

                });
                fetch(backend + `/v1/account/deleteGoogleAuth`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }

                    resolve({
                        success: result.success
                    });


                });
            }

        });
    },
    missionGeneratorZigZa: function (polygon) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    jsonpolygon: polygon,

                });
                fetch(backend + `/api/v1/drone/missionGeneratorPolygonZigZagOverfly`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        resolve({success: false});
                        return;
                    }

                    resolve(result);


                });
            }

        });
    },

    parseError: parseError


};
export default api;