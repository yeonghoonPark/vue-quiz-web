<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div id="QuizView">
    <BaseButton class="btn-primary btn-lg" :message="'Quiz'" @click="" />
    <h1>{{ count }}</h1>
  </div>
</template>
