<script setup>
const props = defineProps({
  message: {
    type: [String, Number, Array],
    required: true,
  },
});
</script>

<template>
  <td>{{ message }}</td>
</template>
