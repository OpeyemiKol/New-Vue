<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <h1 class="text-4xl font-bold text-blue-600">{{ msg }}</h1>
</template>

<style scoped>
/* Optional: keep it clean, all styling via Tailwind */
</style>
