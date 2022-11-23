<template>
    <div>
        <form @submit.prevent="addNewTask">
            <input type="text" placeholder="I need to..." v-model="newTask">
            <button>Add task</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useTaskStore } from "../stores/TaskStore";

const newTask = ref('')
const taskStore = useTaskStore()

const addNewTask = () => {
    if(newTask.value.length > 0){
        taskStore.addTask(newTask.value)
        newTask.value = ''
    }else{
        alert('Please fill the form!')
    }
}
</script>