<script setup>
const props = defineProps({
  message: {
    type: [String, Number],
    default: "this is default alert message",
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  classType: {
    type: String,
    default: "alert-primary",
  },
});
</script>

<template>
  <div class="position-fixed top-50 start-50 translate-middle">
    <Transition name="slide">
      <div v-if="isShow" role="alert" class="alert fs-5" :class="classType">
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-from,
.slide-leave-to {
  transform: translate(-50%, -50%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s ease-out;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(-50%, -50%);
  opacity: 1;
}
</style>
