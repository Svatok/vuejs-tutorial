<template>
  <b-form @submit.prevent="createProject()">
    <div class="mb-20">
      <b-form-group>
        <b-form-input
          v-model="title"
          type="text"
          placeholder="Enter Project Name..."
          >
        </b-form-input>
      </b-form-group>
    </div>
    <b-button type="submit" class="mb-15 mr-15">
      Create Project
    </b-button>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    createProject () {
      this.$store.dispatch('createProject', {
        title: this.title
      })
      this.title = ''
    }
  }
}
</script>
