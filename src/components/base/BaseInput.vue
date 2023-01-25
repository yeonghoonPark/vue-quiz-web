<script setup>
const props = defineProps({
  // form-control-lg || form-control || form-control-sm
  formControl: {
    type: String,
    default: "form-control",
    required: false,
  },
  ariaLabel: {
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
    :id="ariaLabel"
    :name="ariaLabel"
    @input="$emit('update:inputValue', $event.target.value)"
  />
</template>
