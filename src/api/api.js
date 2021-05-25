import Cookies from 'universal-cookie';
const cookies = new Cookies();

const backend = "https://api.arnold-tim.de"

const post = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: undefined
};

const api = {

    checkSession: function() {
    return new Promise((resolve, reject) => {
        if(cookies.get('session')===undefined) {
            resolve(false);
        }else{
            fetch(backend+`/auth/validateSession?session=${cookies.get('session')}`).then(res=>res.json()).then(result => {
                resolve(result.success);
            })
        }
    })

    },
    signIn: function (eorn, password) {
        return new Promise((resolve, reject) => {
            post.body = JSON.stringify({
                eorn: eorn,
                password: password
            })
          fetch(backend+`/auth/signin`,post).then(res=>res.json()).then(result => {
              if(!result.error){
                  cookies.set('session', result.session, { path: '/' });

                  resolve({
                      success:true,
                      session: result.session
                  });
              }else{
                  resolve({
                      success:false,
                      error: result.error
                  });
              }
          })


        });
    },
    signOut: function () {
        return new Promise((resolve, reject) => {
            if(cookies.get('session')===undefined) {
                resolve(false);
            }else {
                post.body = JSON.stringify({
                    session: cookies.get('session'),
                })
                fetch(backend + `/auth/signout`, post).then(res => res.json()).then(result => {
                    cookies.remove('session',{ path: '/' });

                    if (!result.error) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
            }

        });

    },
    signUp: function (username,email,password) {

        return new Promise((resolve, reject) => {
            post.body = JSON.stringify({
                email: email,
                password: password,
                name: username
            })
            fetch(backend+`/auth/signup`,post).then(res=>res.json()).then(result => {
                if(result.success){
                    cookies.set('session', result.session, { path: '/' });

                    resolve({
                        success:true,
                        session: result.session
                    });
                }else{
                    resolve({
                        success:false,
                        error: result.error
                    });
                }
            })


        });

    },

    listAvailableDevices: function() {
        return new Promise((resolve,reject) => {

            if(cookies.get('session')===undefined) {
                resolve(false);
            }else{
                fetch(backend+`/device/listAvailable?session=${cookies.get('session')}`).then(res=>res.json()).then(result => {
                    resolve(result.data);
                })
            }

        })
    },

    listSpecificUserDevice: function(deviceUUID) {
        return new Promise((resolve,reject) => {

            if(cookies.get('session')===undefined) {
                resolve(false);
            }else{
                fetch(backend+`/device/listSpecificUserDevice?session=${cookies.get('session')}&device=${deviceUUID}`).then(res=>res.json()).then(result => {
                    resolve(result.data);
                })
            }

        })
    },

    updateDeviceName: function(deviceUUID,newName) {
        return new Promise((resolve,reject) => {

            if(cookies.get('session')===undefined) {
                resolve(false);
            }else{
                fetch(backend+`/device/changeDeviceName?session=${cookies.get('session')}&device=${deviceUUID}&newName=${newName}`).then(res=>res.json()).then(result => {
                    resolve(result);
                })
            }

        })
    },

    getUserSpecificDeviceInfo: function(deviceUUID) {
        return new Promise((resolve,reject) => {

            if(cookies.get('session')===undefined) {
                resolve(false);
            }else{
                fetch(backend+`/device/getUserSpecificDeviceInfo?session=${cookies.get('session')}&device=${deviceUUID}`).then(res=>res.json()).then(result => {
                    resolve(result);
                })
            }

        })
    },

    registerDevice: function (regCode) {
        return new Promise((resolve,reject) => {

            if(cookies.get('session')===undefined) {
                resolve(false);
            }else{
                fetch(backend+`/device/registerByCode?session=${cookies.get('session')}&regCode=${regCode}`).then(res=>res.json()).then(result => {
                    if(result.error!==undefined) {
                        resolve({
                            success:false,
                            error: result.error
                        })
                    }else{
                        resolve({
                            success:true,
                            deviceType: result.deviceType,
                            uuid: result.uuid
                        })
                    }
                })
            }

        })
    }





}
export default api;