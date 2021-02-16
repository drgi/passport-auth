export default {
    template: `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="/">Auth-test</a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"
          v-for="link in navlink">
            <a class="nav-link" @click.prevent="$emit('navlinkto', link)">{{link}}</a>
          </li>
        </ul>   
        <button class="btn btn-primary">dsadsad</button>     
      </div>
      <button class="btn btn-primary">dsadsad</button>
    </div>
  </nav>`,
  props: {
    navlink: Array
  },
  mounted() {
    console.log(this.navlink);
    this.navlink
  },
  methods: {
    navClick(){
      console.log(this.navlink);
    }
  }
}