<template>
  <div>
    <TaskItem v-for="task in tasks" v-bind:task="task" :key="task.id" />
    <CreateTask v-bind:projectId="projectId" />
  </div>
</template>

<script>
import TaskItem from './tasks/TaskItem'
import CreateTask from './tasks/CreateTask'

export default {
  name: 'TaskList',
  components: {
    TaskItem,
    CreateTask
  },
  props: ['tasks', 'projectId']
}
</script>

<style>
</style>
