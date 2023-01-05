<script setup>
import { useRouter } from "vue-router";
import { useKakaoStore } from "@/stores/kakao";
import { storeToRefs } from "pinia";
import IconHamburger from "@/components/icons/IconHamburger.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const router = useRouter();
const kakaoStore = useKakaoStore();

const { access_token, account_email, profile_nickname } =
  storeToRefs(kakaoStore);

const { logoutWithKakao } = kakaoStore;

const goLoginView = () => router.push({ name: "LoginView" });
const goHomeView = () => router.push({ name: "HomeView" });
</script>

<template>
  <header id="header" class="fixed-top">
    <nav
      class="navbar navbar-expand-md navbar-dark bg-dark bg-gradient px-4 py-1"
    >
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
            <BaseButton
              v-if="!access_token"
              class="btn btn-md btn-outline-light my-2"
              :message="'Login'"
              @click="goLoginView"
            />
            <BaseButton
              v-else
              class="btn btn-md btn-outline-light my-2"
              :message="'Logout'"
              @click="logoutWithKakao"
            />
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
