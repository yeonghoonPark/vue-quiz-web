<script setup>
import BaseButton from "../components/base/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goLoginView = () => router.push({ name: "LoginView" });
</script>

<template>
  <div id="HomeView">
    <BaseButton
      class="btn-primary btn-lg"
      :message="'Start'"
      @click="goLoginView"
    />
  </div>
</template>

<style scoped></style>
