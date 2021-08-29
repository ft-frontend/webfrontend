import Cookies from 'universal-cookie';
import {w3cwebsocket as W3CWebSocket} from "websocket";

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

const api = {

    checkSession: function () {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                fetch(backend + `/v1/auth/validateSession?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
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
                        error: result.error
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
                fetch(backend + `/v1/device/registerByCode?session=${cookies.get('session')}&regCode=${regCode}`).then(res => res.json()).then(result => {

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
                    console.log(cookies.get("acsettings"));
                    resolve({
                        success: true,
                        settings: cookies.get("acsettings")
                    });
                    return;
                }
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
    }


};
export default api;