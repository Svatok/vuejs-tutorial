<template>
  <div class="pb-5">
    <div class="divider" />
    <div class="pt-15 pr-15 pb-5 pl-15">
      <div>
        <span @click="deleteComment">Delete Comment</span>
      </div>
      <a class="mr-15" :href="comment.attachmentUrl" download v-if="comment.attachmentUrl">
        Download attachment
      </a>
      <p class="mb-5">{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment', 'task'],
  methods: {
    deleteComment () {
      this.$store.dispatch('deleteComment', {
        comment: this.comment,
        task: this.task
      })
    }
  }
}
</script>
