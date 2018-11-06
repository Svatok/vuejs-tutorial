<template>
  <b-form @submit.prevent="createTask()">
    <b-form-group>
      <b-form-input
        v-model="name"
        type="text"
        placeholder="Enter Task Name..."
        >
      </b-form-input>
    </b-form-group>
    <div class="divider" />
    <div class="project-task-edit-btn">
      <b-button type="submit" bsStyle="info" class="mb-5 mr-15">
        Add Task
      </b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  props: ['projectId'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    createTask () {
      this.$store.dispatch('createTask', {
        name: this.name,
        projectId: this.projectId
      })
      this.name = ''
    }
  }
}
</script>
