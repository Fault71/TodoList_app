<template>
  <view class='flex flex-row h-16'>
    <button
      class="h-16 py-3 bg-transparent text-xs leading-10"
      @tap="toggleAll"
    >
      全选
    </button>
    <input
      class="flex-1 h-16 pl-2 pr-9 "
      type="text"
      placeholder="What needs to be done?"
      v-model.trim="text"
    >
    <button
      class="absolute top-4 right-4 w-8 h-8 px-0 leading-8"
      v-show="text !== ''"
      @tap="addNewTodo"
    >
      +
    </button>
  </view>
</template>

<script lang="ts">
import {
  reactive, toRef, defineComponent, PropType,
} from 'vue';
import { Todo } from '../index.vue';

export default defineComponent({
  name: 'TodoListTop',

  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
  },

  emits: ['addTodo'],

  setup(props, context) {
    const data = reactive({
      text: '',
    });

    function addNewTodo(): void {
      if (data.text === '') return;
      const newTodo = {
        id: Number(Math.random().toString() + Date.now()).toString(36),
        name: data.text,
        completed: false,
      };
      context.emit('addTodo', newTodo);
      data.text = '';
    }

    function toggleAll(): void {
      if (props.todos.some((todo) => todo.completed !== true)) {
        props.todos.forEach((todo) => { todo.completed = true; });
      } else {
        props.todos.forEach((todo) => { todo.completed = false; });
      }
    }

    return {
      text: toRef(data, 'text'),
      addNewTodo,
      toggleAll,
    };
  },
});
</script>
