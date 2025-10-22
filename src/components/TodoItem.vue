<script setup lang="ts">
import { ref, computed } from "vue";
import type { Todo } from "../types/todo";
import { updateTodo } from "../api/todos";
import { useRouter } from "vue-router";

const router = useRouter();

const { todo, onDelete } = defineProps<{
  todo: Todo;
  onDelete: (id: number | string) => void;
}>();

const isEditing = ref(false);
const text = ref(todo.todo);
const completed = ref(todo.completed);
const isSaving = ref(false);

const canEdit = computed(() => !(todo.__temp || todo.isOptimistic));

const handleSave = async () => {
  if (!canEdit.value) {
    alert(
      "You cannot update a temporary todo until it is saved to the server."
    );
    return;
  }
  try {
    isSaving.value = true;
    const updated = await updateTodo(todo.id, {
      todo: text.value,
      completed: completed.value,
    });
    text.value = updated.todo;
    completed.value = updated.completed;
    isEditing.value = false;
  } catch (err: any) {
    alert(err.message || "Error updating todo");
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = () => {
  if (confirm("Are you sure you want to delete this todo?")) {
    onDelete(todo.id);
  }
};

const goToDetails = () => {
  if (canEdit.value) {
    router.push(`/todos/${todo.id}`);
  }
};
</script>

<template>
  <li
    class="p-4 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-blue-600 transition cursor-pointer"
    @click="goToDetails"
  >
    <div v-if="isEditing" class="flex flex-col gap-3">
      <input type="text" v-model="text" class="border rounded px-3 py-2" />
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" v-model="completed" />
        Completed
      </label>
      <div class="flex gap-2">
        <button
          @click.stop="handleSave"
          class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
          :disabled="isSaving"
        >
          {{ isSaving ? "Saving..." : "Save" }}
        </button>
        <button
          @click.stop="isEditing = false"
          class="px-3 py-1.5 bg-gray-300 rounded hover:bg-gray-400 transition"
          :disabled="isSaving"
        >
          Cancel
        </button>
      </div>
    </div>

    <div v-else class="flex flex-col">
      <div class="flex flex-col text-gray-800">
        <span class="hover:underline text-base font-medium">{{
          todo.todo
        }}</span>
        <span
          class="text-sm font-semibold flex items-center gap-2"
          :class="todo.completed ? 'text-green-600' : 'text-yellow-600'"
        >
          <span
            v-if="!todo.completed"
            class="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"
          ></span>
          {{ todo.completed ? "Completed" : "Pending" }}
        </span>
      </div>

      <div class="flex justify-between items-center gap-3 mt-3">
        <button
          @click.stop="isEditing = true"
          class="text-sm px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Update Todo
        </button>
        <button
          @click.stop="handleDelete"
          class="text-sm px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Delete
        </button>
      </div>
    </div>
  </li>
</template>
