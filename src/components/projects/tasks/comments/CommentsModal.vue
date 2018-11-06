<template>
  <div class="align-middle d-inline-block mb-5">
    <span v-on:click="showModal">
      {{ comments && comments.length }} Comment(s)
    </span>
    <transition name="modal" v-if="modalVisible">
     <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Comments
            </h4>
          </div>
          <div class="modal-body">
            <CommentItem
              v-for="comment in comments"
              v-bind:comment="comment"
              v-bind:task="task"
              :key="comment.id"
            >
            </CommentItem>
            <CreateComment v-bind:task="task"></CreateComment>
          </div>
          <div class="modal-footer">
            <b-button type="button" @click="hideModal()"> Close </b-button>
          </div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import CreateComment from './CreateComment'

export default {
  props: ['comments', 'task'],
  components: {
    CommentItem,
    CreateComment
  },
  data () {
    return {
      modalVisible: false
    }
  },
  methods: {
    showModal () {
      this.modalVisible = true
    },
    hideModal () {
      this.modalVisible = false
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
</style>
