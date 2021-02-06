import axios from "axios";

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        commit('setTodos', response.data);
    },

    async addTodo({ commit }, title) {
        const response = await axios.post(
            'https://jsonplaceholder.typicode.com/todos',
            { title, completed: false}
        );

        commit('newTodo', response.data);
    },

    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id);
    },

    async filterTodos({ commit }, e) {
        // Get selected number of items
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos', response.data);
    },

    updateTodo({ commit }, updatedTodo) {
        axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo)
            .then(response => {
                commit('editTodo', response.data);
            })
            .catch(err => console.log(err))
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),

    newTodo: (state, todo) => state.todos.unshift(todo),

    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),

    editTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updatedTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}