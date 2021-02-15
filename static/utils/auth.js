let accessToken = ''
window.addEventListener('storage', e => {
    console.log(e.key)
})

async function login() {
    try {
        const req = await fetch('api/auth/login', {

        })
    } catch (err) {
        throw err
    }
}
async function logout() {
    const req = await fetch('api/auth/logout', {
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
    getAccessToken, 
    setAccessToken, 
    refreshToken,
    isAuth
}