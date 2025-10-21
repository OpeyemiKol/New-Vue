<script setup lang="ts">
import { ref, defineProps } from "vue";

defineProps<{
  children?: any;
}>();

const hasError = ref(false);
const errorMessage = ref("");

function resetError() {
  hasError.value = false;
  errorMessage.value = "";
  window.location.reload();
}

// This hook captures errors from child components
defineExpose({
  errorCaptured(err: unknown) {
    hasError.value = true;
    errorMessage.value = (err as Error).message || String(err);
    return false; // stops propagation
  },
});
</script>

<template>
  <div v-if="hasError" class="text-center p-10 text-red-600">
    <h2 class="text-2xl font-bold">Something went wrong</h2>
    <p class="my-4">{{ errorMessage }}</p>
    <button
      @click="resetError"
      class="mt-4 px-4 py-2 bg-red-500 cursor-pointer text-white rounded"
    >
      Try Again
    </button>
  </div>
  <slot v-else />
</template>
