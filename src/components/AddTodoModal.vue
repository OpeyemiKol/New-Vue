<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../api/todos";
import { createTodo } from "../api/todos";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

// Props destructured directly
const { isOpen, onClose } = defineProps<{
  isOpen: boolean;
  onClose: () => void;
}>();

// Local state
const todoText = ref("");
const status = ref<"pending" | "completed">("pending");

const queryClient = useQueryClient();

// Optimistic mutation
const mutation = useMutation<
  Todo, // data returned from mutation
  Error, // error type
  Omit<Todo, "id">, // variables type
  { previousTodos: Todo[] } // context type for rollback
>({
  mutationFn: createTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });

    const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

    const optimisticTodo: Todo = {
      ...newTodo,
      id: Date.now(),
      __temp: true, // mark as temporary
    };

    queryClient.setQueryData<Todo[]>(
      ["todos"],
      [optimisticTodo, ...previousTodos]
    );

    return { previousTodos };
  },
  onSuccess: (response) => {
    queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) => {
      // Replace temporary todos with server response
      const withoutOptimistic = oldTodos.filter((t) => !t.__temp);
      return [response, ...withoutOptimistic];
    });
    todoText.value = "";
    status.value = "pending";
    onClose();
  },
  onError: (_err, _newTodo, context) => {
    if (context?.previousTodos) {
      queryClient.setQueryData(["todos"], context.previousTodos);
    }
  },
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (!todoText.value.trim()) return;

  mutation.mutate({
    todo: todoText.value,
    completed: status.value === "completed",
    userId: 1,
  });
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200"
    >
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Add New Todo</h2>

      <form @submit="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Todo Text
          </label>
          <input
            v-model="todoText"
            type="text"
            placeholder="Enter todo"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
            autofocus
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            v-model="status"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <p v-if="mutation.isError" class="text-red-600 text-sm">
          Error: {{ mutation.error?.value?.message }}
        </p>

        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="onClose"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="mutation.isPending.value"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
          >
            {{ mutation.isPending ? "Adding..." : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
