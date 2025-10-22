import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import Homepage from "../pages/Homepage.vue";
import TodoDetail from "../pages/TodoDetail.vue";
import TestError from "../pages/TestError.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/todos", component: Homepage },
  { path: "/todos/:id", component: TodoDetail },
  { path: "/test-error", component: TestError },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
