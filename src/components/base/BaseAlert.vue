<script setup>
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  header: {
    type: String,
    default: "card-header",
  },
  title: {
    type: String,
    default: "card-body-title",
  },
  content: {
    type: String,
    default: "card-body-content",
  },
});

const emits = defineEmits(["buttonClick", "keydownEsc"]);
</script>

<template>
  <div class="position-fixed top-50 start-50 translate-middle">
    <div class="card text-center" style="max-width: 26rem">
      <div class="card-header">{{ header }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ content }}
        </p>
        <BaseButton
          class="btn btn-primary btn-sm"
          :message="'확인'"
          @click="$emit('buttonClick')"
          @keydown.esc="$emit('keydownEsc')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
