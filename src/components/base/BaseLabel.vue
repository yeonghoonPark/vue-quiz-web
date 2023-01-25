<script setup>
const props = defineProps({
  labelFor: {
    type: String,
    required: true,
  },
  labelMessage: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <label :for="labelFor" class="col-form-label">
    {{ labelMessage }}
  </label>
</template>
