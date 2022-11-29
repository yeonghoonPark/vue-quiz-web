<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <button class="btn btn-primary" type="button">{{ message }}</button>
</template>

<style scoped>
.btn {
  transition: var(--base-transition);
}
</style>
