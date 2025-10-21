<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="text-center p-20 text-gray-600">
    <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p class="mb-6">The page you're looking for does not exist.</p>
    <button
      @click="goHome"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Go Back Home
    </button>
  </div>
</template>
