<script setup>
const props = defineProps({
  labelFor: {
    type: String,
    required: true,
  },
  labelMessage: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <label :for="labelFor" class="col-form-label">
    {{ labelMessage }}
  </label>
</template>
