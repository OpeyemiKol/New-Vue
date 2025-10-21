import type { RouteRecordRaw } from "vue-router"; // ✅ type-only import
import Homepage from "../pages/Homepage.vue";
import TodoDetail from "../pages/TodoDetail.vue";
import TestError from "../pages/TestError.vue";
import NotFound from "../pages/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/todos" },
  { path: "/todos", component: Homepage },
  { path: "/todos/:id", component: TodoDetail },
  { path: "/test-error", component: TestError },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export default routes;
