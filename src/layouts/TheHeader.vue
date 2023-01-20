<script setup>
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import IconHamburger from "@/components/icons/IconHamburger.vue";
import IconPeopleCircle from "@/components/icons/IconPeopleCircle.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import BaseAlert from "@/components/base/BaseAlert.vue";

const router = useRouter();
const loginStore = useLoginStore();

const { access_token, account_email, profile_nickname, isLogoutSuccess } =
  storeToRefs(loginStore);

const { onLogoutWithKakao } = loginStore;

const goLoginView = () => router.push({ name: "LoginView" });
const goHomeView = () => router.push({ name: "HomeView" });
</script>

<template>
  <!-- alert -->
  <Teleport to="#alert">
    <BaseAlert
      :isShow="isLogoutSuccess"
      :classType="'alert-primary'"
      :message="'로그아웃에 성공하였습니다. 😀'"
    />
  </Teleport>

  <!-- header -->
  <header id="header" class="fixed-top">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark px-4 py-1">
      <div class="container-xxl">
        <RouterLink to="/" class="pe-3">
          <img
            class="img"
            src="@/assets/images/logo.png"
            alt="logo"
            style="width: 120px"
          />
        </RouterLink>
        <button
          class="navbar-toggler px-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
          aria-expanded="true"
          style="border: none"
        >
          <span class="db-navbar-toggler">
            <IconHamburger />
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink
                to="/quiz"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Quiz</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/ranking"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Ranking</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/notice"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Notice</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to=""
                class="nav-link"
                active-class="none"
                aria-current="page"
                >Help</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <div v-if="!profile_nickname" class="">
              <BaseButton
                class="btn btn-md btn-outline-light my-2"
                :message="'Login'"
                @click="goLoginView"
              />
            </div>
            <div v-else class="d-md-flex align-items-center pointer">
              <div class="my-2 me-4" style="color: var(--color-pink)" @click="">
                <IconPeopleCircle class="me-2" />
                <span>{{ profile_nickname }}</span>
              </div>
              <BaseButton
                class="btn btn-md btn-outline-light my-2"
                :message="'Logout'"
                @click="onLogoutWithKakao"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.img {
  transition: var(--base-transition);
}
.img:hover {
  transform: rotate(-5deg);
}
.btn {
  opacity: 0.5;
}
.btn:hover {
  opacity: 0.9;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
.navbar-toggler:focus {
  box-shadow: none;
}
</style>
