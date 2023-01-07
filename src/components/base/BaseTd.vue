<script setup>
const props = defineProps({
  content: {
    type: [String, Number, Array],
    required: true,
  },
});
</script>

<template>
  <td>{{ content }}</td>
</template>
