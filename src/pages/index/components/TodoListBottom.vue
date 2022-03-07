<template>
  <view
    class="items-center bg-grey-200"
    v-show="totalCount"
  >
    <view class="cursor-default h-8 text-center border-2 bg-yellow-200 leading-8">
        {{activeTodos}} items left
    </view>
    <view class="flex flex-row py-1 bg-green-200">
      <button
        class="h-6 text-center bg-green-400 text-xs text-white leading-6"
        @tap="showAllTodos"
      >
        All
      </button>
      <button
        class="h-6 text-center bg-green-400 text-xs text-white leading-6"
        @tap="showActiveTodos"
      >
        Active
      </button>
      <button
        class="h-6 text-center bg-green-400 text-xs text-white leading-6"
        @tap="showCompletedTodos"
      >
        Completed
      </button>
    </view>
    <button
      class="rounded-none h-8 text-sm leading-8"
      v-show="clearCompletedButton()"
      @tap="clearCompletedTodos"
    >
      Clear completed
    </button>
  </view>
</template>

<script lang='ts'>
import {
  computed, defineComponent, PropType, reactive, toRef,
} from 'vue';
import { Todo } from '../index.vue';

export default defineComponent({
  name: 'TodoListBottom',

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

  emits: ['clearTodo', 'changeVisibility'],

  setup(props, context) {
    const data = reactive({
      selector: ['all', 'active', 'completed'],
    });

    const totalCount = computed(() => props.todos.length);

    const activeTodos = computed(
      () => props.todos.reduce((pre, cur) => (cur.completed ? pre : pre + 1), 0),
    );

    function clearCompletedTodos(): void {
      context.emit('clearTodo');
    }

    function showAllTodos(): void {
      context.emit('changeVisibility', 'all');
    }

    function showActiveTodos(): void {
      context.emit('changeVisibility', 'active');
    }

    function showCompletedTodos(): void {
      context.emit('changeVisibility', 'completed');
    }

    function clearCompletedButton(): boolean {
      if (props.todos.length - activeTodos.value <= 0) return false;
      return true;
    }

    return {
      selector: toRef(data, 'selector'),
      totalCount,
      activeTodos,
      clearCompletedTodos,
      showAllTodos,
      showActiveTodos,
      showCompletedTodos,
      clearCompletedButton,
    };
  },

});
</script>
