export default {
    template: `<h1>Profile</h1><p>ID: {{user._id}}</p><p>Login: {{user.login}}</p>`,
    props: {
        user: Object
    }
}