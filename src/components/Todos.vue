<template>
    <div>
        <h3>Todos</h3>

        <div class="todos">
            <div v-for="todo in allTodos" :key="todo.id" class="todo">
                {{ todo.title }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "Todos",

    data() {
        return {}
    },

    created() {
        this.fetchTodos();
    },

    computed: mapGetters(['allTodos']),

    methods: {
        ...mapActions(['fetchTodos'])
    },
}
</script>

<style scoped>
.todos {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
}

.todo {
    padding: 1rem;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    position: relative;
    background: #41b883;
    border: 1px solid #ccc;
}
</style>