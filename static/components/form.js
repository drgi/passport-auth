import auth from '../utils/auth.js'
export default {
    template: `
    <div>
    <form @submit.prevent="loginSubmit">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Login</label>
      <input type="login" v-model="login" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <button class="btn btn-primary" @click.prevent="refreshToken">RefreshToken</button>
  <p>{{user}}</p>
  </div>
  `,
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async loginSubmit() {
      console.log('login', this.login, this.password);
      const data = {
        login: this.login, password: this.password
      }
      try {
        const user = await auth.login(data)
        this.$emit('set-auth-data', user)
      } catch (err) {
        console.log(err.message)
        this.$emit('auth-error', err.message)
      }    

    },
    async refreshToken() {
      try {
        await auth.refreshToken()
      } catch (err) {
        this.$emit('auth-error', err.message)
      }
      
      
    }
  },
  props: {
    user: Object
  }
}