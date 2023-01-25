<script setup>
const props = defineProps({
  // form-control-lg || form-control || form-control-sm
  formControl: {
    type: String,
    default: "form-control",
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  inputType: {
    type: String,
    default: "text",
    required: false,
  },
});

const emits = defineEmits(["update:inputValue"]);
</script>

<template>
  <input
    :class="formControl"
    :type="inputType"
    :id="id"
    @input="$emit('update:inputValue', $event.target.value)"
  />
</template>
