<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

// Pages
import LandingPage from "./pages/LandingPage.vue";
import Homepage from "./pages/Homepage.vue";

// Router instance
const router = useRouter();
const route = useRoute();

// Show landing page only on "/"
const isLandingPage = computed(() => route.path === "/");

// Go back handler
function handleGoBack() {
  router.push("/");
}
</script>

<template>
  <!-- Landing page -->
  <div v-if="isLandingPage">
    <LandingPage @continue="() => router.push('/todos')" />
  </div>

  <!-- App pages -->
  <div
    v-else
    class="min-h-screen bg-[url('/bgimage2.jpg')] bg-cover bg-center bg-no-repeat text-[#1e293b]"
  >
    <div class="min-h-screen bg-white/80">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <RouterView v-slot="{ Component }" :key="$route.fullPath">
          <component
            :is="Component"
            v-bind="(Component as any) === Homepage ? { onGoBack: handleGoBack } : {}"
          />
        </RouterView>
      </div>
    </div>
  </div>
</template>
