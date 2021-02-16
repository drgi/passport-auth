
import Navbar from './components/navbar.js'
import AuthForm from './components/form.js'
import RegisterForm from './components/register.js'
import Profile from './components/profile.js'
import Alert from './plugins/alerts.js'
import auth from './utils/auth.js'
// import Auth from './utils/authclass.js'
// const authenticate = new Auth()
const App = {
    data() {
        return {
            isAuth: false,
            token: '',
            user: {},
            currentTab: 'login',
            navlink: ['Login', 'Register', 'Profile'],
            error: ''
        }
    },
    methods: {
        currentTabChange(link) {
            console.log(link);
            if (link === 'Profile' && !auth.getAccessToken()) {
                this.errorHandler('You not authorized')
                return this.currentTab = 'login'
            }
            this.currentTab = link
        },
        setAuthData(payload) {
            Object.assign(this.user, payload)
            this.isAuth = true
        },
        async logout() {            
            try {
                await auth.logout()
                console.log('getToken', auth.getAccessToken())
                this.currentTab = 'login'
            } catch (err) {
                this.errorHandler(err.message)
            }
        },   
        async logoutAll() {
            await auth.logoutAll()
        },
        async getSecretUserData() {
            // Запрос на сервер по токену 
            const req = await fetch('api/user/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.getAccessToken()}`
                }
            })
            if (req.ok) {
                Object.assign(this.user, await req.json())
            }
        },
        errorHandler(errMessage) {
            console.log('errMessage', errMessage)
            this.error = errMessage
        }
    },
    computed: {
        currentTabComponent() {
            return this.currentTab.toLowerCase()
        },
        isAuthMessage() {
            return auth.getAccessToken() ? 'Authorized saccess' : 'Token expired'
        }
    },
    async mounted(){
        try {
            this.isAuth = await auth.refreshToken()
            if (this.isAuth) {
                this.token = auth.getAccessToken()
                await this.getSecretUserData()
            }
        } catch(err) {
            console.log(err.message)
            this.errorHandler(err.message)
            
        }
        
    }
}

const app = Vue.createApp(App)

app.component('navbar', Navbar)
app.component('login', AuthForm)
app.component('register', RegisterForm)
app.component('profile', Profile)
app.mount('#app')


