<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import IconHamburger from "@/components/icons/IconHamburger.vue";
import IconPeopleCircle from "@/components/icons/IconPeopleCircle.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const router = useRouter();
const loginStore = useLoginStore();

const { profile_nickname, isLogoutSuccess } = storeToRefs(loginStore);

const { onLogoutWithKakao } = loginStore;

const isHelpCard = ref(false);
</script>

<template>
  <!-- alert -->
  <Teleport to="#alert">
    <BaseAlert
      :isShow="isLogoutSuccess"
      :classType="'alert-primary'"
      :message="'로그아웃에 성공하였습니다.'"
    />
  </Teleport>

  <!-- card -->
  <Teleport to="#card">
    <div
      v-if="isHelpCard"
      class="position-fixed top-0 start-0 w-100 h-100 user-select-none"
      style="z-index: 1"
    />
    <div
      v-if="isHelpCard"
      class="position-fixed top-50 start-50 translate-middle"
      style="z-index: 2"
    >
      <BaseCard class="text-center user-select-none">
        <template #header>
          <h5 class="">도움말</h5>
        </template>
        <div class="card-title p-2 text-start mb-3">
          <ol>
            <li class="d-flex mb-3">
              <span class="me-1">1.</span>
              <span class="">
                퀴즈 및 글 작성과 열람은 로그인 후 이용 가능합니다.
              </span>
            </li>
            <li class="d-flex mb-3">
              <span class="me-1">2.</span>
              <span class=""> 회원가입은 따로 필요치 않습니다.</span>
            </li>
            <li class="d-flex mb-3">
              <span class="me-1">3.</span>
              <span class="">
                로그인페이지의 정보입력이나 카카오로그인을 이용하여 로그인 할 수
                있습니다.
              </span>
            </li>
            <li class="d-flex mb-3">
              <span class="me-1">4.</span>
              <span class="">
                로그인페이지에서 입력한 정보는 저장되지 않습니다.
              </span>
            </li>
            <li class="d-flex mb-3">
              <span class="me-1">5.</span>
              <span class="">
                순위페이지의 순위 기준은 우선순위로
                <span class="font-pink">맞춘 갯수</span>를 기준으로 하며
                차선순위로는 <span class="font-pink">소요 시간</span>을 기준으로
                삼습니다.
              </span>
            </li>
          </ol>
        </div>

        <BaseButton
          class="btn-primary mb-3"
          style="opacity: 1"
          :message="'확인'"
          @click="isHelpCard = false"
        />
      </BaseCard>
    </div>
  </Teleport>

  <!-- header -->
  <header id="header" class="fixed-top">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark px-4 py-1">
      <div class="container-xxl">
        <RouterLink to="/" class="pe-3" @click="isHelpCard = false">
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
                @click="isHelpCard = false"
                >Quiz</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/ranking"
                class="nav-link"
                active-class="active"
                aria-current="page"
                @click="isHelpCard = false"
                >Ranking</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/notice"
                class="nav-link"
                active-class="active"
                aria-current="page"
                @click="isHelpCard = false"
                >Notice</RouterLink
              >
            </li>
            <li class="nav-item">
              <template v-if="profile_nickname">
                <RouterLink
                  to="/notice/write"
                  class="nav-link"
                  active-class="active"
                  aria-current="page"
                  @click="isHelpCard = false"
                  >Write</RouterLink
                >
              </template>
            </li>
            <li class="nav-item">
              <RouterLink
                to=""
                class="nav-link"
                active-class="none"
                aria-current="none"
                @click="isHelpCard = true"
                >Help</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <div v-if="!profile_nickname" class="">
              <BaseButton
                class="btn btn-md btn-outline-light my-2"
                :message="'Login'"
                @click="router.push({ name: 'LoginView' })"
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
