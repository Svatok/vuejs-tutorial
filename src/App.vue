<template>
  <div id="app">
    <Header />
    <Alert />
    <div class="page-container">
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/common/Header'
import Alert from './components/common/Alert'

export default {
  name: 'App',
  components: {
    Header,
    Alert
  }
}
</script>
