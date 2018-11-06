<template>
  <div class="project-task">
    <b-form v-if="isEditing" @submit.prevent="updateTask()">
      <b-form-group>
        <b-form-input
          v-model="name"
          type="text"
          >
        </b-form-input>
      </b-form-group>
      <b-button class="mb-5 mr-5" type="submit">Save</b-button>
      <b-button class="mb-5 mr-5" v-on:click="hideForm">Cancel</b-button>
    </b-form>

    <label class="checkbox-inline" title="" v-if="!isEditing">
      <input type="checkbox" :checked="done" v-on:change="completeTask">
      <span>{{ name }}</span>
      <div class="in-green-500 font-10">{{ task.deadline }}</div>
    </label>
    <div class="no-shrink pt-5" v-if="!isEditing">
      <CommentsModal v-bind:comments="task.comments" v-bind:task="task" />
      <span class="align-middle d-inline-block mb-5" v-on:click="showForm">Edit</span>
      <span class="align-middle d-inline-block mb-5" v-on:click="deleteTask">Delete</span>
    </div>
  </div>
</template>

<script>
import CommentsModal from './comments/CommentsModal'

export default {
  props: ['task'],
  components: {
    CommentsModal
  },
  data () {
    return {
      isEditing: false,
      name: this.task.name,
      done: this.task.done,
      modalShow: true
    }
  },
  methods: {
    showForm () {
      this.isEditing = true
    },
    hideForm () {
      this.isEditing = false
      this.name = this.task.name
    },
    updateTask () {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        name: this.name
      }).then(() => {
        this.name = this.task.name
      })
      this.isEditing = false
    },
    completeTask () {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        done: !this.done
      }).then(() => {
        this.done = this.task.done
      })
    },
    deleteTask () {
      this.$store.dispatch('deleteTask', this.task)
    }
  }
}
</script>
