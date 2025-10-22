<script setup lang="ts">
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem.vue";

const props = defineProps<{
  todos: Todo[];
  onDelete: (id: number | string) => void;
}>();
</script>

<template>
  <ul class="mt-6 space-y-4">
    <TodoItem
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      :onDelete="props.onDelete"
    />
  </ul>
</template>
