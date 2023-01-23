<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div id="HomeView" class="user-select-none">
    <!-- title -->
    <div
      class="d-md-flex"
      style="
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -40%);
      "
    >
      <h1 style="font-size: 8rem">
        <span style="font-size: 8rem" class="text-primary">Q</span>uiz
      </h1>
      <h1 style="font-size: 8rem" class="ms-5">
        <span style="font-size: 8rem" class="font-pink">W</span>eb
      </h1>
    </div>
    <!-- button-group -->
    <div
      class=""
      style="
        position: fixed;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -70%);
      "
    >
      <BaseButton
        class="btn-success btn-lg"
        :message="'퀴즈'"
        @click="router.push({ name: 'QuizView' })"
      />
    </div>
  </div>
</template>

<style scoped></style>
