import Cookies from 'universal-cookie';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const cookies = new Cookies();
let backend = "https://api.arnold-tim.de";
if (cookies.get('backend') !== undefined) {
   backend = cookies.get('backend');
}

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
    window.location.href = "/auth/signin?redirect=" + window.location.pathname;

}

const api = {

    checkSession: function () {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                fetch(backend + `/auth/validateSession?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    resolve(result.success);
                });
            }
        });

    },
    signIn: function (eorn, password) {
        return new Promise((resolve, reject) => {
            post.body = JSON.stringify({
                eorn: eorn,
                password: password
            });
            fetch(backend + `/auth/signin`, post).then(res => res.json()).then(result => {
                if (!result.error) {
                    cookies.set('session', result.session, {path: '/'});
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
                fetch(backend + `/auth/signout`, post).then(res => res.json()).then(result => {
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
            fetch(backend + `/auth/signup`, post).then(res => res.json()).then(result => {
                if (result.success) {
                    cookies.set('session', result.session, {path: '/'});
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
                fetch(backend + `/device/listAvailable?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
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
                fetch(backend + `/device/listSpecificUserDevice?session=${cookies.get('session')}&device=${deviceUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) {
                        reject("error");
                        return;
                    }
                    resolve(result.data);
                });
            }

        });
    },

    updateDeviceName: function (deviceUUID, newName) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                fetch(backend + `/device/changeDeviceName?session=${cookies.get('session')}&device=${deviceUUID}&newName=${newName}`).then(res => res.json()).then(result => {
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
                fetch(backend + `/device/getUserSpecificDeviceInfo?session=${cookies.get('session')}&device=${deviceUUID}`).then(res => res.json()).then(result => {
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
                fetch(backend + `/device/registerByCode?session=${cookies.get('session')}&regCode=${regCode}`).then(res => res.json()).then(result => {

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
                fetch(backend + `/device/deleteDevice?session=${cookies.get('session')}&deviceuuid=${deviceuuid}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
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
                fetch(backend + `/account/getSettings?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
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
                fetch(backend + `/device/getStatusInfo?session=${cookies.get('session')}&deviceuuid=${deviceUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
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
            const client = new W3CWebSocket('wss://api.arnold-tim.de/device/droneLiveConnection?session='+cookies.get("session")+"&device="+deviceuuid);
            return client;
        }

    },
    makeSearchRequest: function(deviceName,deviceTypeName,searchQuery) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {
                const params = `${deviceName?"&deviceName=true":""}${deviceTypeName?"&deviceTypeName=true":""}`

                fetch(backend + `/search/doSearch?session=${cookies.get('session')}${params}&searchquery=${searchQuery}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
                    resolve({
                        success: true,
                        data: result.result
                    });

                });
            }

        });
    },
    setBackendAddress: function(backendAddress) {
        backend = backendAddress;
        cookies.set('backend', backendAddress, {path: '/'});

    },

    addNewMission: function (name) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    name: name
                });
                fetch(backend + `/drone/mission/createMission`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
                   if(result.success) {
                       resolve({
                           success:true,
                           uuid: result.uuid
                       })
                   }else{
                       resolve({
                           success:false
                       })
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

                fetch(backend + `/drone/mission/listMissions?session=${cookies.get('session')}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
                    if(result.success) {
                        resolve({
                            success: true,
                            missions: result.missions
                        });
                    }else{
                        resolve({
                            success: false
                        });
                    }


                });
            }

        });
    },

    getMissionData: function(missionUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/drone/mission/getMissionData?session=${cookies.get('session')}&missionUUID=${missionUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
                    if(result.success) {
                        resolve({
                            success: true,
                            mission: result.mission
                        });
                    }else{
                        resolve({
                            success: false
                        });
                    }


                });
            }

        });
    },
    saveMissionData: function(missionUUID,missionData) {
        return new Promise((resolve, reject) => {
            if (cookies.get('session') === undefined) {
                resolve(false);
            } else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                    missionUUID: missionUUID,
                    data: missionData
                });
                fetch(backend + `/drone/mission/saveMissionData`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
                    if(result.success) {
                        resolve({
                            success:true,
                        })
                    }else{
                        resolve({
                            success:false
                        })
                    }

                });
            }

        });
    },

    getElevationData: function(points) {
        return new Promise((resolve, reject) => {



                fetch(`https://dev.virtualearth.net/REST/v1/Elevation/List?points=${points.join()}&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v`).then(res => res.json()).then(result => {
                        resolve({
                           elevations: result.resourceSets[0].resources[0].elevations
                        });
                });


        });
    },

    getDeviceConfig: function(deviceUUID) {
        return new Promise((resolve, reject) => {

            if (cookies.get('session') === undefined) {
                redirectToLogin();
                resolve(false);
            } else {

                fetch(backend + `/device/getDeviceConfig?session=${cookies.get('session')}&device=${deviceUUID}`).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
                    if(result.success) {
                        resolve({
                            success: true,
                            config: result.data
                        });
                    }else{
                        resolve({
                            success: false
                        });
                    }


                });
            }

        });
    },

    saveDeviceConfig: function(deviceUUID, key,value) {
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
                fetch(backend + `/device/saveConfig`, post).then(res => res.json()).then(result => {
                    if (checkErrorCodes(result)) { resolve({success:false}); return}
                    if(result.success) {
                        resolve({
                            success:true,
                        })
                    }else{
                        resolve({
                            success:false
                        })
                    }

                });
            }

        });
    }



};
export default api;