<script setup>
import BaseTh from "@/components/base/BaseTh.vue";
import BaseTd from "@/components/base/BaseTd.vue";

const props = defineProps({
  items: {
    type: [Array, Object],
    required: true,
  },
});
</script>

<template>
  <table class="table align-middle table-striped table-hover text-center">
    <thead>
      <tr>
        <BaseTh class="col-2" :scopeStyle="'col'" :message="'분류'" />
        <BaseTh class="col-6" :scopeStyle="'col'" :message="'제목'" />
        <BaseTh
          class="col-2 d-sm-hidden d-md-hidden"
          :scopeStyle="'col'"
          :message="'작성자'"
        />
        <BaseTh
          class="col-2 d-sm-hidden d-md-hidden"
          :scopeStyle="'col'"
          :message="'조회수'"
        />
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr
        v-for="(item, index) in items"
        :key="index"
        class="pointer"
        style="height: 65px"
      >
        <BaseTh :scopeStyle="'row'">
          <template #span>
            <span class="box py-1 px-3">{{ item?.article }}</span>
          </template>
        </BaseTh>
        <BaseTd class="text-start" :content="item?.title" />
        <BaseTd
          class="d-sm-hidden d-md-hidden fw-light"
          :content="item?.author"
        />
        <BaseTd
          class="d-sm-hidden d-md-hidden fw-light"
          :content="item?.hits"
          style="font-size: 12px"
        />
      </tr>
    </tbody>
  </table>
</template>
