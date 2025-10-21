<script setup lang="ts">
import { defineProps, computed } from "vue";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const props = defineProps<PaginationProps>();

const pages = computed(() =>
  Array.from({ length: props.totalPages }, (_, i) => i + 1)
);

function goPrev() {
  if (props.currentPage > 1) props.onPageChange(props.currentPage - 1);
}

function goNext() {
  if (props.currentPage < props.totalPages)
    props.onPageChange(props.currentPage + 1);
}
</script>

<template>
  <div class="flex flex-wrap justify-center items-center gap-2 mt-6">
    <button
      @click="goPrev"
      :disabled="props.currentPage === 1"
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Prev
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="props.onPageChange(page)"
      :class="[
        'px-3 py-1 rounded',
        page === props.currentPage
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 hover:bg-gray-300',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="goNext"
      :disabled="props.currentPage === props.totalPages"
      class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
