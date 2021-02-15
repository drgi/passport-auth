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
        const req = await fetch('api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (req.ok) {
        const res = await req.json()
        this.$emit('set-auth-data', res)
        auth.setAccessToken(res.token)
      }

      } catch (error) {
        console.log(error.message)
      }
      
      

    },
    async refreshToken() {
      console.log('refresh',await auth.refreshToken())
      
    }
  },
  props: {
    user: Object
  }
}