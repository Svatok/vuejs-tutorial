<template>
  <div class="row">
    <b-col class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
      <h2>Sign Up</h2>
      <b-form @submit.prevent="signup">
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
              placeholder="Password">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              v-model="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation">
            </b-form-input>
          </b-form-group>
        </div>
        <b-button type="submit" class="mb-15 mr-15">
          Sign Up
        </b-button>
        <p>Already a member? <a @click.prevent="loginRedirect" href="">Sign In</a></p>
      </b-form>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    signup () {
      this.$store.dispatch('signup', {
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        router: this.$router
      })
    },
    loginRedirect () {
      this.$router.replace('/login')
    }
  }
}
</script>
