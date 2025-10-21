<script setup lang="ts">
import { defineProps } from "vue";

type StatusFilter = "all" | "completed" | "pending";

interface TodoFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
}

const props = defineProps<TodoFiltersProps>();

function handleSearchChange(event: Event) {
  const target = event.target as HTMLInputElement;
  props.setSearchQuery(target.value);
}

function handleStatusChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  props.setStatusFilter(target.value as StatusFilter);
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6"
  >
    <input
      type="text"
      placeholder="Search todos..."
      :value="props.searchQuery"
      @input="handleSearchChange"
      class="flex-1 px-3 py-1.5 cursor-pointer rounded-md bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
    />

    <select
      :value="props.statusFilter"
      @change="handleStatusChange"
      class="px-3 py-1.5 cursor-pointer rounded-md bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  </div>
</template>
