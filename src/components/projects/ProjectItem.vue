<template>
  <div :class="projectClass">
    <div class="project-edit">
      <b-form @submit.prevent="updateProject()">
        <b-form-group>
          <b-form-input
            v-model="title"
            type="text"
            >
          </b-form-input>
        </b-form-group>
        <b-button class="mb-5 mr-5" type="submit">Save</b-button>
        <b-button class="mb-5 mr-5" v-on:click="hideForm">Cancel</b-button>
      </b-form>
    </div>
    <div :class="projectInfoClass">
      <div class="project-info__header">
        <p class="project-info__title" v-on:click="toggle">
          <span class="project-info__title-icon  icon icon-arrow-up" />
          {{ title }}
        </p>
        <div class="project-info__actions">
          <span class="align-middle d-inline-block mb-5 mr-5" v-on:click="showForm">Edit</span>
          <span class="align-middle d-inline-block mb-5 mr-5" v-on:click="deleteProject">Delete</span>
        </div>
      </div>
      <div class="project-info__body">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project'],
  data () {
    return {
      isEditing: false,
      open: false,
      projectInfoClass: 'project-info',
      projectClass: 'project',
      title: this.project.title
    }
  },
  methods: {
    showForm () {
      this.projectClass = 'project edit'
      this.projectInfoClass = 'project-info'
      this.open = false
    },
    hideForm () {
      this.projectClass = 'project'
      this.title = this.project.title
    },
    toggle () {
      if (this.open) {
        this.projectInfoClass = 'project-info'
        this.open = false
      } else {
        this.projectInfoClass = 'project-info open'
        this.open = true
      }
    },
    updateProject () {
      this.$store.dispatch('updateProject', {
        id: this.project.id,
        title: this.title
      }).then(() => {
        this.title = this.project.title
      })
      this.projectClass = 'project'
    },
    deleteProject () {
      this.$store.dispatch('deleteProject', {
        id: this.project.id
      })
    }
  }
}
</script>
