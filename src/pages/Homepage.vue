<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { fetchTodos, deleteTodo } from "../api/todos";
import type { Todo } from "../types/todo";

import Pagination from "../components/Pagination.vue";
import AddTodoModal from "../components/AddTodoModal.vue";
import TodoHeader from "../components/TodoHeader.vue";
import TodoFilters from "../components/TodoFilters.vue";
import TodoList from "../components/TodoList.vue";

// Props
defineProps<{
  onGoBack?: () => void;
}>();

const queryClient = useQueryClient();

// State
const currentPage = ref(1);
const isModalOpen = ref(false);
const searchQuery = ref("");
const statusFilter = ref<"all" | "completed" | "pending">("all");
const itemsPerPage = 10;

// Fetch todos
const { data, isLoading, isError, error } = useQuery<Todo[], Error>({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});

// Always default to empty array to avoid undefined
const todos = computed(() => data.value ?? []);

// Delete mutation
const { mutate: deleteMutate } = useMutation<
  {
    isDeleted: boolean;
  },
  Error,
  number | string
>({
  mutationFn: deleteTodo,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  onError: (err) => {
    console.error("Delete error:", err);
    alert("Failed to delete todo.");
  },
});

// Computed filtered todos
const filteredTodos = computed(() =>
  todos.value.filter((todo) => {
    const matchesSearch = todo.todo
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      statusFilter.value === "all" ||
      (statusFilter.value === "completed" && todo.completed) ||
      (statusFilter.value === "pending" && !todo.completed);
    return matchesSearch && matchesStatus;
  })
);

const totalPages = computed(() =>
  Math.ceil(filteredTodos.value.length / itemsPerPage)
);

const currentTodos = computed(() =>
  filteredTodos.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
);

// Handlers
const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const setSearchQuery = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1;
};

const setStatusFilter = (status: "all" | "completed" | "pending") => {
  statusFilter.value = status;
  currentPage.value = 1;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-6 relative">
    <!-- Back Button -->
    <div class="mb-6">
      <button
        @click="$props.onGoBack?.()"
        class="inline-flex items-center gap-2 bg-linear-to-r from-blue-700 to-purple-700 hover:from-purple-700 hover:to-blue-700 text-white px-5 py-2.5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Go Back
      </button>
    </div>

    <TodoHeader />

    <!-- Add Button -->
    <div class="flex justify-center mt-4 mb-8">
      <button
        @click="isModalOpen = true"
        class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md transition font-semibold"
      >
        ➕ Add Todo
      </button>
    </div>

    <TodoFilters
      :searchQuery="searchQuery"
      :statusFilter="statusFilter"
      :setSearchQuery="setSearchQuery"
      :setStatusFilter="setStatusFilter"
    />

    <!-- Loading / Error Handling -->
    <div
      v-if="isLoading"
      class="p-6 text-center bg-white rounded-2xl shadow border border-gray-200"
    >
      Loading todos...
    </div>

    <div
      v-else-if="isError"
      class="p-6 text-center text-red-600 bg-white rounded-2xl shadow border border-gray-200"
    >
      Error: {{ error?.message ?? "Unknown error" }}
    </div>

    <!-- Todo List -->
    <div
      v-else
      class="bg-white mt-6 p-6 rounded-2xl shadow-lg border border-gray-200"
    >
      <TodoList :todos="currentTodos" :onDelete="deleteMutate" />
    </div>

    <div class="mt-8 flex justify-center">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @pageChange="handlePageChange"
      />
    </div>

    <AddTodoModal :isOpen="isModalOpen" :onClose="handleCloseModal" />
  </div>
</template>
