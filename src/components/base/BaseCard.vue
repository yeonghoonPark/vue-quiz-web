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
  isFirst: {
    type: Boolean,
    default: false,
  },
  isSecond: {
    type: Boolean,
    default: false,
  },
  isThird: {
    type: Boolean,
    default: false,
  },
  isFourth: {
    type: Boolean,
    default: false,
  },
  isFifth: {
    type: Boolean,
    default: false,
  },
  firstContent: {
    type: [String, Number],
    defualt: "first Message",
  },
  secondContent: {
    type: [String, Number],
    defualt: "second Message",
  },
  thirdContent: {
    type: [String, Number],
    defualt: "third Message",
  },
  fourthContent: {
    type: [String, Number],
    defualt: "fourth Message",
  },
  fifthContent: {
    type: [String, Number],
    defualt: "fifth Message",
  },
  isFooter: {
    type: Boolean,
    default: false,
  },
  footer: {
    type: String,
    default: "card-footer",
  },
});

const emits = defineEmits(["buttonClick", "keydownEsc"]);
</script>

<template>
  <div class="position-fixed top-50 start-50 translate-middle">
    <div class="card text-center" style="max-width: 26rem; min-width: 20rem">
      <div class="card-header">{{ header }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <template v-if="isFirst">
          <p class="card-text text-start">{{ firstContent }}</p>
        </template>
        <template v-if="isSecond">
          <p class="card-text text-start">{{ secondContent }}</p>
        </template>
        <template v-if="isThird">
          <p class="card-text text-start">{{ thirdContent }}</p>
        </template>
        <template v-if="isFourth">
          <p class="card-text text-start">{{ fourthContent }}</p>
        </template>
        <template v-if="isFifth">
          <p class="card-text text-start">{{ fifthContent }}</p>
        </template>
        <BaseButton
          class="btn btn-primary btn-sm"
          :message="'확인'"
          @click="$emit('buttonClick')"
          @keydown.esc="$emit('keydownEsc')"
        />
      </div>
      <template v-if="isFooter">
        <div class="card-footer text-muted">{{ footer }}</div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
