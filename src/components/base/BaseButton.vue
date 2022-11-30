<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <button class="btn" type="button">{{ message }}</button>
</template>

<style scoped></style>
