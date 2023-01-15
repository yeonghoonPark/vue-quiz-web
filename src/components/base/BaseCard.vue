<script setup>
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
