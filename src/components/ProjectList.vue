<template>
  <div class="row">
    <b-col class="col-sm-8 col-sm-offset-2">
      <h2>Projects</h2>
      <ProjectItem
        v-for="project in projects"
        v-bind:project="project"
        :key="project.id"
      >
      </ProjectItem>
      <CreateProject></CreateProject>
    </b-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectItem from './projects/ProjectItem'
import CreateProject from './projects/CreateProject'

export default {
  name: 'ProjectList',
  components: {
    ProjectItem,
    CreateProject
  },
  computed: {
    ...mapState(['projects'])
  },
  created () {
    this.$store.dispatch('fetchProjects')
  }
}
</script>
