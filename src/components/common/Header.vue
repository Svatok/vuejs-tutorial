<template>
  <header class="main-header">
    <div class="container pt-10 pb-5">
      <div class="row d-flex align-center">
        <div class="col-xs-3">
          <a class="mb-5" href="/">
            <img src="@/assets/logo.svg" alt="logo" />
          </a>
        </div>
        <div class="col-xs-6 text-center">
          <h1 class="mt-0 mb-5">Simple ToDo List</h1>
        </div>
        <div class="col-xs-3 text-right">
          <b-button class="mb-5" v-on:click="logout">Exit</b-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout () {
      const token = localStorage.getItem('user-token')
      if (token) {
        localStorage.removeItem('user-token')
        this.$router.replace('/login')
      }
    }
  }
}
</script>
