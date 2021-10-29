const app = Vue.createApp({
  data(){
    return {
      newTodo: "",
      todoList: [
        {id: 1, text: "First Task", completed: true, edit: false},
        {id: 2, text: "Second Task", completed: false, edit: false},
      ],
    }
  },
  methods: {
    editMode(todo){
      todo.text = todo.text.trim();
      
      if(todo.text.length > 0){
         todo.edit = !todo.edit;
      }
    },
    deleteTodo(todo){
      this.todoList = this.todoList.filter(t => t.id != todo.id)
    },
    addTodo(){
      if(this.newTodo.trim().length > 0){
        this.todoList.push({
          id: new Date().getTime(),
          text: this.newTodo.trim(),
          completed: false,
          edit: false
        });
      }
      this.newTodo = "";
    }
  },
  computed: {
    completedCount(){
      return this.todoList.filter(t => t.completed).length;
    }
  }
}).mount("#app");