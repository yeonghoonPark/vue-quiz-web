<script setup>
const props = defineProps({
  // row || col
  scopeStyle: {
    type: String,
    required: false,
  },
  message: {
    type: [String, Number],
    required: false,
  },
});
</script>

<template>
  <th :scope="scopeStyle">
    {{ message }}
    <template v-if="$slots.span">
      <slot name="span" />
    </template>
  </th>
</template>
