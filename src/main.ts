import { createApp, h } from "vue";
import App from "./App.vue";
import "./style.css";

// Vue Router
import { createRouter, createWebHistory } from "vue-router";
import routes from "./router/routes";

// Vue Query
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

// Error boundary (Vue has a built-in error handling hook)
import ErrorBoundary from "./components/ErrorBoundary.vue"; // Optional custom component

// Create Vue Query client
const queryClient = new QueryClient();

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create Vue app
const app = createApp({
  render: () =>
    h(ErrorBoundary, null, {
      default: () => h(App),
    }),
});

// Use plugins
app.use(router);
app.use(VueQueryPlugin, { queryClient });

// Mount app
app.mount("#app");
