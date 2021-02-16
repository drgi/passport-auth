let accessToken = ''
window.addEventListener('storage', e => {
    console.log(e.key)
})
function headers(jwt = '') {
    const headers = {
        'Content-Type': 'application/json'
    }
    if (jwt) {
        headers['Authorization'] = `Bearer ${jwt}`
    }
    return headers
}

async function login( { login, password }) {    
    try {
        const req = await fetch('api/auth/login', {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({login, password})
        })
        if (req.ok) {
            const res = await req.json()
            accessToken = res.token
            return {_id: res._id, login: res.login}
        } else {
            const res = await req.json()
            throw new Error(res.error)
        }
    } catch (err) {
        throw err
    }
}
async function logout() {
    try {
        const req = await fetch('api/auth/logout', {
            method: 'POST',
            headers: headers(getAccessToken()),
            credentials: 'include'    
        })
        if (req.ok) {
            accessToken = ''
            window.localStorage.setItem('logout', Date.now())
        } else if (req.status === 401){
            throw new Error(req.statusText)
        }        
    } catch (err) {
        throw err
    }
    
    
}
async function logoutAll() {
    const req = await fetch('api/auth/logoutall', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include'

    })
    if (req.ok) {
        accessToken = ''
        window.localStorage.setItem('logout', Date.now())
    }
    
}
async function refreshToken() {
    try {
       const req = await fetch('api/auth/refreshtoken', {
        method: 'POST',
        credentials: 'include'
    })
    if (req.ok) {
        const res = await req.json()
        accessToken = res.token
        return true
    } else {
        const res = await req.json()
        throw new Error(res.error)
    }
    } catch (err) {
        throw err
    }
}
function isAuth() {
    

}

function getAccessToken(){
    return accessToken
}

function setAccessToken(token) {
    accessToken = token
}

export default {
    login,
    logout,
    logoutAll, 
    getAccessToken, 
    setAccessToken, 
    refreshToken,
    isAuth
}