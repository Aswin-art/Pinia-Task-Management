import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
    }),

    getters: {
        favs(){
            return this.tasks.filter(e => e.isFav)
        },

        favCount(){
            const favTasks = this.tasks.filter(e => e.isFav)
            return favTasks.length
        },

        totalCount: (state) => {
            return state.tasks.length
        }
    },

    actions: {
        async getTasks(){
            this.loading = true
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()
            this.tasks = data
            this.loading = false
        },

        addTask(task){
            this.tasks.push({
                id: Math.floor(Math.random() * 1000),
                title: task,
                isFav: false
            })
        },

        toggleFav(id){
            this.tasks.forEach(e => {
                if(e.id == id){
                    e.isFav = !e.isFav
                    return
                }
            })
        },

        deleteTask(id){
            // Cara 1
            // this.tasks.forEach((e, index) => {
            //     if(e.id == id){
            //         this.tasks.splice(index, 1)
            //         return
            //     }
            // })

            // Cara 2
            this.tasks = this.tasks.filter(e => {
                return e.id != id
            })
        }
    }
})