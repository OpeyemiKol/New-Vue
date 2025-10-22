import { createApp, h } from "vue";
import App from "./App.vue";
import "./style.css";

import router from "./router"; // ✅ now imports the router instance
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import ErrorBoundary from "./components/ErrorBoundary.vue";

const queryClient = new QueryClient();

const app = createApp({
  render: () => h(ErrorBoundary, null, { default: () => h(App) }),
});

app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.mount("#app");
