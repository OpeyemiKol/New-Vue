<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

// Pages
import LandingPage from "./pages/LandingPage.vue";
import Homepage from "./pages/Homepage.vue";

// State for landing page
const hasEntered = ref(false);

// Router instance
const router = useRouter();

// Functions
function handleContinue() {
  hasEntered.value = true;
}

function handleGoBack() {
  hasEntered.value = false;
  router.push("/"); // navigate back to landing
}

// Helper to pass props to specific pages
function componentProps(Component: any) {
  if (Component === Homepage) {
    return { onGoBack: handleGoBack };
  }
  return {};
}
</script>

<template>
  <div v-if="!hasEntered">
    <!-- Landing Page -->
    <LandingPage @continue="handleContinue" />
  </div>

  <div
    v-else
    class="min-h-screen bg-[url('/bgimage2.jpg')] bg-cover bg-center bg-no-repeat text-[#1e293b]"
  >
    <div class="min-h-screen bg-white/80">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <!-- Vue Router View -->
        <router-view v-slot="{ Component }" :key="$route.fullPath">
          <component :is="Component" v-bind="componentProps(Component)" />
        </router-view>
      </div>
    </div>
  </div>
</template>
