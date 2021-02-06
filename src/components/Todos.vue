<template>
    <div>
        <h3>Todos</h3>

        <div class="legend">
            <span>Double click to mark as complete</span>
            <span>
                <span class="incomplete-box"></span> Incomplete
            </span>
            <span>
                <span class="complete-box"></span> Complete
            </span>
        </div>

        <div class="todos">
            <div
                v-for="todo in allTodos"
                :key="todo.id"
                :class="{'is-complete': todo.completed}"
                class="todo"

                @dblclick="onDoubleClick(todo)">

                {{ todo.title }}
                <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
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
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),

        onDoubleClick(todo) {
            const updateTodo = {
                id: todo.id,
                title: todo.title,
                completed: !todo.completed
            }

            this.updateTodo(updateTodo);
        }
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

.delete {
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    position: absolute;
}

.legend {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
}
.complete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #35495e;
}
.incomplete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #41b883;
}
.is-complete {
    background: #35495e;
    color: #fff;
}
@media (max-width: 500px) {
    .todos {
        grid-template-columns: 1fr;
    }
}
</style>