<template>
  <b-form @submit.prevent="createComment()">
    <b-form-group>
      <b-form-textarea id="textarea1"
                       v-model="body"
                       placeholder="Enter something"
                       :rows="3"
                       :max-rows="6">
      </b-form-textarea>
    </b-form-group>
    <b-form-group>
      <b-form-file v-model="attachment" :state="Boolean(attachment)" placeholder="Choose a file..."></b-form-file>
      <div class="mt-3">Selected file: {{attachment && attachment.name}}</div>
    </b-form-group>
    <div class="divider" />
    <div class="project-task-edit-btn">
      <b-button type="submit" class="mb-5 mr-15">
        Add Task
      </b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  props: ['task'],
  data () {
    return {
      body: '',
      attachment: null
    }
  },
  methods: {
    createComment () {
      this.$store.dispatch('createComment', {
        body: this.body,
        task: this.task,
        attachment: this.attachment
      })
      this.body = ''
      this.attachment = null
    }
  }
}
</script>
