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
      component: () => import("@/views/notice/NoticeView.vue"),
    },
    {
      path: "/notice/write",
      name: "NoticeWriteView",
      component: () => import("@/views/notice/NoticeWriteView.vue"),
    },
    {
      path: "/notice/detail:id",
      name: "NoticeDetailView",
      component: () => import("@/views/notice/NoticeDetailView.vue"),
    },
    {
      path: "/notice/detail:id/edit",
      name: "NoticeEditView",
      component: () => import("@/views/notice/NoticeEditView.vue"),
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
