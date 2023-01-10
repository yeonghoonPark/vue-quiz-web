<script setup>
const props = defineProps({
  selectValue: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:selectValue"]);
</script>

<template>
  <select
    :value="selectValue"
    @input="$emit('update:selectValue', $event.target.value)"
    class="form-select"
  >
    <template v-if="$slots.options">
      <slot name="options"></slot>
    </template>
  </select>
</template>
