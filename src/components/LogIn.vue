<template>
  <div class="row">
    <b-col class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
      <h2>Sign In</h2>
      <b-form @submit.prevent="login()">
        <div class="mb-20">
          <b-form-group>
            <b-form-input
              v-model="email"
              type="text"
              placeholder="Enter your email">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              v-model="password"
              type="password"
              placeholder="Enter your password">
            </b-form-input>
          </b-form-group>
        </div>
        <b-button type="submit" class="mb-15 mr-15">
          Sign In
        </b-button>
        <p>Do not have an account? <a @click.prevent="signupRedirect" href="">Sign Up</a></p>
      </b-form>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
        router: this.$router
      })
    },
    signupRedirect () {
      this.$router.replace('/signup')
    }
  }
}
</script>
