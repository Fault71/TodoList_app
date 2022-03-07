<template>
  <view class="index w-11_12 mx-auto bg-gray-300">
    <TodoListTop
      :todos='todos'
      @addTodo='addTodo'
    />
    <TodoListMiddle
      :todos='todos'
      :visibility='visibility'
      @deleteTodo='deleteTodo'
    />
    <TodoListBottom
      :todos='todos'
      :visibility='visibility'
      @clearTodo='clearTodo'
      @changeVisibility='changeVisibility'
    />
  </view>
</template>

<script lang='ts'>
import {
  reactive, toRef, defineComponent, watch,
} from 'vue';
import Taro from '@tarojs/taro';
import TodoListTop from './components/TodoListTop.vue';
import TodoListMiddle from './components/TodoListMiddle.vue';
import TodoListBottom from './components/TodoListBottom.vue';

export interface Todo {
  id: number,
  name: string,
  completed: boolean,
}

interface Data {
  todos: Todo[],
  visibility: string
}

export default defineComponent({
  name: 'App',

  components: {
    TodoListTop,
    TodoListMiddle,
    TodoListBottom,
  },

  setup() {
    function getTodo(): Todo[] {
      if (Taro.getStorageSync('todos')) {
        return JSON.parse(Taro.getStorageSync('todos'));
      }
      return [];
    }

    const data:Data = reactive({
      todos: getTodo(),
      // todos: JSON.parse(Taro.getStorageSync('todos')) || [],
      visibility: 'all',
    });

    watch(
      () => data.todos,
      (value: Todo[]) => {
        Taro.setStorageSync('todos', JSON.stringify(value));
      },
      { deep: true },
    );

    function addTodo(todo: Todo): void {
      data.todos.unshift(todo);
    }

    function deleteTodo(id:number): void {
      data.todos = data.todos.filter((todo) => todo.id !== id);
    }

    function clearTodo(): void {
      data.todos = data.todos.filter((todo) => !todo.completed);
    }

    function changeVisibility(status: string): void {
      data.visibility = status;
    }

    return {
      todos: toRef(data, 'todos'),
      visibility: toRef(data, 'visibility'),
      addTodo,
      deleteTodo,
      clearTodo,
      changeVisibility,
    };
  },
});
</script>
