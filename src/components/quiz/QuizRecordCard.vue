<script setup>
import BaseCard from "@/components/base/BaseCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  header: {
    type: String,
    default: "card-header",
  },
  title: {
    type: String,
    default: "card-body-title",
  },
});

const emits = defineEmits(["buttonClick", "keydownEsc"]);
</script>

<template>
  <div class="position-fixed top-50 start-50 translate-middle">
    <BaseCard class="text-center">
      <template #header>
        {{ header }}
      </template>
      <h5 class="card-title">{{ title }}</h5>
      <template v-if="$slots.content">
        <slot name="content"></slot>
      </template>
      <BaseButton
        class="btn btn-primary btn-sm"
        :message="'확인'"
        @click="$emit('buttonClick')"
        @keydown.esc="$emit('keydownEsc')"
      />
    </BaseCard>
  </div>
</template>
