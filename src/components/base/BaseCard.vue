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
  footer: {
    type: String,
    default: "card-footer",
  },
});

const emits = defineEmits(["buttonClick", "keydownEsc"]);
</script>

<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
