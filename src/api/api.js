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
            console.log(backend+`/auth/validateSession?session=${cookies.get('session')}`)
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

    }


}
export default api;