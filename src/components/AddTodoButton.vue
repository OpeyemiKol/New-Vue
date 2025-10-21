<script setup lang="ts">
defineProps<{
  onAdd: () => void;
}>();
</script>

<template>
  <div class="text-center mb-8">
    <button
      @click="onAdd"
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition font-semibold"
    >
      Add Todo
    </button>
  </div>
</template>
