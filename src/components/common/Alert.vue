<template>
  <b-alert
    v-if="alert"
    show
    dismissible
    fade
    :variant="alert.alertType"
    class="mb-10"
    @dismissed="removeAlert"
  >
    <p class="mb-5" v-for="(message, index) in alert.messages" v-bind:key="index">
      {{ message }}
    </p>
  </b-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Alert',
  computed: {
    ...mapState(['alert'])
  },
  methods: {
    removeAlert () {
      this.$store.dispatch('removeAlert')
    }
  }
}
</script>
