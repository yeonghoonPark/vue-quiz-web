<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import NoticeTable from "@/components/notice/noticeTable.vue";

import BaseInput from "@/components/base/BaseInput.vue";

import { onMounted, reactive, ref, watch } from "vue";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";

import notice from "@/data/notice";

const router = useRouter();

const goNoticeWriteView = () => {
  console.log("[goNoticeWriteView]");
  router.push({ name: "NoticeWriteView" });
};

const noticeList = ref([]);
noticeList.value = notice;

const pagenationState = reactive({ pageNumber: 0, pageLimit: 5 });

const pageCount = computed(() => {
  let length = noticeList.value.length;
  let limit = pagenationState.pageLimit;
  let page = Math.floor(noticeList.value.length / pagenationState.pageLimit);
  if (length % limit > 0) page += 1;
  return page;
});

const dividedList = computed(() => {
  const start = pagenationState.pageNumber * pagenationState.pageLimit;
  const end = start + pagenationState.pageLimit;
  return noticeList.value.slice(start, end);
});

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeView" class="user-select-none">
    <h1>게시판페이지</h1>

    <div class="py-4">
      <NoticeTable :items="dividedList" />
      <div class="d-flex justify-content-center">
        <BasePagination
          :pageTotalCount="pageCount"
          :pageCurrentNumber="pagenationState.pageNumber"
          @page="(page) => (pagenationState.pageNumber = page)"
        />
      </div>
    </div>

    <BaseButton
      class="btn-primary"
      :message="'Write'"
      @click="goNoticeWriteView"
    />

    <BaseInput></BaseInput>
  </div>
</template>

<style></style>
