<script setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  pageTotalCount: {
    type: Number,
    required: true,
  },
  pageCurrentNumber: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["page"]);

const isPreviousPage = computed(() => {
  return { disabled: !(props.pageCurrentNumber > 0) };
});

const isNextPage = computed(() => {
  return { disabled: !(props.pageCurrentNumber < props.pageTotalCount - 1) };
});
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="isPreviousPage">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('page', pageCurrentNumber - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item disabled" aria-current="page">
        <a class="page-link" href="#">
          <span class="text-primary">{{ pageCurrentNumber + 1 }}</span> /
          {{ pageTotalCount }}
        </a>
      </li>

      <li class="page-item" :class="isNextPage">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('page', pageCurrentNumber + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
