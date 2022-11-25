import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: "/",
      name: "HomeView",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "LoginView",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/notice",
      name: "NoticeView",
      component: () => import("@/views/NoticeView.vue"),
    },
    {
      path: "/quiz",
      name: "QuizView",
      component: () => import("@/views/QuizView.vue"),
    },
    {
      path: "/ranking",
      name: "RankingView",
      component: () => import("@/views/RankingView.vue"),
    },
  ],
});

export default router;
