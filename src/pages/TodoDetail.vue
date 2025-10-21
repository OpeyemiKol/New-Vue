<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { fetchTodosById, type Todo } from "../api/todos";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const query = useQuery<Todo, Error>({
  queryKey: ["todo", id],
  queryFn: () => fetchTodosById(id),
  enabled: !!id,
});

const todo = query.data; // ref<Todo | undefined>
const isLoading = query.isLoading;
const isError = query.isError;
const error = query.error;
</script>

<template>
  <div class="max-w-xl mx-auto mt-12 px-4">
    <h1 class="text-2xl font-bold mb-4">Todo Details</h1>

    <div
      v-if="isLoading"
      class="p-6 text-lg bg-white rounded-xl border border-gray-200 shadow"
    >
      Loading Todo...
    </div>

    <div
      v-else-if="isError"
      class="p-6 text-red-600 bg-white rounded-xl border border-gray-200 shadow"
    >
      Error loading todo: {{ error?.message }}
    </div>

    <div
      v-else-if="todo"
      class="bg-white p-4 rounded-xl border border-gray-200 shadow"
    >
      <p class="text-lg font-medium">{{ todo.todo }}</p>
      <p
        class="mt-2 text-sm font-semibold"
        :class="todo.completed ? 'text-green-600' : 'text-yellow-600'"
      >
        {{ todo.completed ? "Completed" : "Pending" }}
      </p>
      <p class="mt-2 text-xs text-gray-500">ID: {{ todo.id }}</p>
    </div>

    <div
      v-else
      class="p-6 text-gray-600 bg-white rounded-xl border border-gray-200 shadow"
    >
      Todo not found.
    </div>

    <button
      @click="router.back()"
      class="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
    >
      Go Back
    </button>
  </div>
</template>
