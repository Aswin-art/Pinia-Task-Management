<template>
  <main>
    <!--Heading  -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- New Task Form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- Filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'fav'">Favorite Tasks</button>
    </nav>

    <!-- Loading -->
    <div class="loading" v-if="loading">Loading task...</div>

    <!-- Task List -->
    <div class="task-list" v-if="filter == 'all'">
      <p>All Tasks | {{ totalCount }}</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter == 'fav'">
      <p>Favorite Tasks | {{ favCount }}</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- Reset -->
    <div class="reset-wrapper">
      <button @click="taskStore.$reset" class="reset">Reset Tasks</button>
    </div>
  </main>
</template>

<script setup>
  import { useTaskStore } from './stores/TaskStore'
  import TaskDetails from './components/TaskDetails.vue'
  import TaskForm from './components/TaskForm.vue'
  import { ref } from '@vue/reactivity'
  import { onMounted } from '@vue/runtime-core'
  import { storeToRefs } from 'pinia'
  
  const taskStore = useTaskStore()
  const { tasks, loading, totalCount, favCount, favs } = storeToRefs(taskStore)
  const filter = ref('all')

  onMounted(() => {
    taskStore.getTasks()
  })
</script>