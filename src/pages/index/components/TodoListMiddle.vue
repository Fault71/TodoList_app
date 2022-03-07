<template>
  <view>
    <view
      class="relative bg-white"
      v-for="todo in filterData"
      :key="todo.id"
    >
      <view
        :class="{
          'view-editing': todo === editedTodo,
        }"
      >
        <checkbox
          :id="todo.id"
          class="inline-block w-6 h-6 mx-3 my-5"
          :checked="todo.completed"
          @tap="todo.completed = !todo.completed"
        >
        </checkbox>
        <label
          :class="{
            active: true,
            done: todo.completed,
          }"
          @tap="toEdit($event, todo.id)"
        >
          {{todo.name}}
        </label>
        <button
          class="h-12 absolute top-2 right-0 text-red-600"
          plain="true"
          @tap="destroyTodo(todo.id)"
        >
          ×
        </button>
      </view>
      <input
        type="text"
        :class="{
          edit: true,
          'edit-editing': todo === editedTodo,
        }"
        v-model="todo.name"
        v-focus="todo === editedTodo"
        @blur="finishEditing(todo.id)"
      >
    </view>
  </view>
</template>

<script lang='ts'>
import {
  computed, defineComponent, PropType, reactive, toRef,
} from 'vue';
import { Todo } from '../index.vue';

interface Data {
  editedTodo: object,
  thisTime: number,
  lastTime: number,
}

export default defineComponent({
  name: 'TodoListMiddle',

  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
    visibility: {
      type: String,
      required: true,
    },
  },

  emits: ['deleteTodo'],

  setup(props, context) {
    const data: Data = reactive({
      editedTodo: {},
      thisTime: 0,
      lastTime: 0,
    });

    const filterData = computed(() => {
      const filter: { [k:string]: Function } = {
        all(todos: Todo[]): Todo[] {
          return todos;
        },
        active(todos: Todo[]): Todo[] {
          return todos.filter((todo) => !todo.completed);
        },
        completed(todos: Todo[]): Todo[] {
          return todos.filter((todo) => todo.completed);
        },
      };
      return filter[props.visibility](props.todos);
    });

    function destroyTodo(id: number): void {
      context.emit('deleteTodo', id);
    }

    function toEdit(e: Event, id: number): void {
      data.lastTime = data.thisTime;
      data.thisTime = e.timeStamp;
      if (data.lastTime !== 0) {
        if (data.thisTime - data.lastTime < 300) {
          props.todos.forEach((todo) => {
            if (todo.id === id) data.editedTodo = todo;
          });
        }
      }
    }

    function finishEditing(id: number): void {
      props.todos.forEach((todo) => {
        if (todo.id === id) data.editedTodo = {};
      });
    }

    return {
      editedTodo: toRef(data, 'editedTodo'),
      filterData,
      destroyTodo,
      toEdit,
      finishEditing,
    };
  },

  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
});
</script>

<style>
.view-editing{
  @apply hidden
}
.active{
  @apply inline-block h-6 w-56 py-5 pl-2 align-top text-xl leading-5
    border border-solid border-white
}
.done{
  @apply line-through text-gray-300
}
.edit{
  @apply hidden h-6 w-52 py-5 pl-2 ml-12 text-xl border border-solid align-top shadow-inner
}
.edit-editing{
  @apply inline-block
}
</style>
