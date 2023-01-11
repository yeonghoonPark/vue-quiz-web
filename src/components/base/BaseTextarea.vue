<script setup>
const props = defineProps({
  formControl: {
    type: String,
    default: "form-control",
    required: false,
  },
  ariaLabel: {
    type: String,
    required: false,
  },
  rowsType: {
    type: String,
    default: "5",
    required: false,
  },
});

const emits = defineEmits(["update:inputValue"]);
</script>

<template>
  <textarea
    :class="formControl"
    :id="ariaLabel"
    :rows="rowsType"
    @input="$emit('update:inputValue', $event.target.value)"
  />
</template>
