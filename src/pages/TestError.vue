<script setup lang="ts">
// Immediately throw an error when this component is rendered
throw new Error("This is a test error from TestError page!");
</script>

<template>
  <!-- Nothing will render because the error is thrown -->
</template>
