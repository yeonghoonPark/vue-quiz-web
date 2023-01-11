<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BasePagination from "@/components/base/BasePagination.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseLabel from "@/components/base/BaseLabel.vue";
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import NoticeTable from "@/components/notice/noticeTable.vue";

import { onMounted, reactive, ref } from "vue";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";

import notice from "@/data/notice";

const router = useRouter();

const noticeList = ref([]);

const pagenationState = reactive({ pageNumber: 0, pageLimit: 5 });

const checkedValue = ref("total");
const inputValue = ref(null);
const selectValue = ref("title");

noticeList.value = notice;

const goNoticeWriteView = () => {
  console.log("[goNoticeWriteView]");
  router.push({ name: "NoticeWriteView" });
};

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

const onClickMenu = (value, articleValue) => {
  console.log("[onClickMenu]");
  noticeList.value = [];
  checkedValue.value = value;
  notice.forEach((item) => {
    if (item.article === articleValue) {
      item.articleType = item.articleType ?? value;
      noticeList.value.push(item);
    }

    if (checkedValue.value === "total") {
      noticeList.value = notice;
    }

    pagenationState.pageNumber = 0;
    inputValue.value = "";
    selectValue.value = "title";
  });
};

const findItemByNotice = () => {
  console.log("[findItemByNotice]");
  const newNoticeList = [];

  if (selectValue.value === "title") {
    notice.forEach((item) => {
      if (item?.title?.indexOf(inputValue.value) !== -1) {
        if (checkedValue.value === item?.articleType) {
          newNoticeList.push(item);
        } else if (checkedValue.value === "total") {
          newNoticeList.push(item);
        }
      }
    });
  } else if (selectValue.value === "author") {
    notice.forEach((item) => {
      if (item?.author.indexOf(inputValue.value) !== -1) {
        if (checkedValue.value === item?.articleType) {
          newNoticeList.push(item);
        } else if (checkedValue.value === "total") {
          newNoticeList.push(item);
        }
      }
    });
  }
  noticeList.value = [];
  noticeList.value = newNoticeList;
  pagenationState.pageNumber = 0;
};

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeView" class="user-select-none py-4">
    <h1 class="text-center mb-5">게시판</h1>

    <!-- 탭 메뉴 -->
    <div
      class="btn-group w-100 mb-4"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <BaseInput
        :type="'radio'"
        class="btn-check"
        name="btnradio"
        :id="'btnradio1'"
        autocomplete="off"
        :checked="checkedValue === 'total'"
        @click="onClickMenu('total', '전체')"
      />
      <BaseLabel
        class="btn btn-outline-dark py-2 fs-5"
        :labelFor="'btnradio1'"
        :labelMessage="'전체'"
      />

      <BaseInput
        :type="'radio'"
        class="btn-check"
        name="btnradio"
        :id="'btnradio2'"
        autocomplete="off"
        :checked="checkedValue === 'announcement'"
        @click="onClickMenu('announcement', '공지')"
      />
      <BaseLabel
        class="btn btn-outline-dark py-2 fs-5"
        :labelFor="'btnradio2'"
        :labelMessage="'공지'"
      />

      <BaseInput
        :type="'radio'"
        class="btn-check"
        name="btnradio"
        :id="'btnradio3'"
        autocomplete="off"
        :checked="checkedValue === 'request'"
        @click="onClickMenu('request', '요청')"
      />
      <BaseLabel
        class="btn btn-outline-dark py-2 fs-5"
        :labelFor="'btnradio3'"
        :labelMessage="'요청'"
      />

      <BaseInput
        :type="'radio'"
        class="btn-check"
        name="btnradio"
        :id="'btnradio4'"
        autocomplete="off"
        :checked="checkedValue === 'common'"
        @click="onClickMenu('common', '잡담')"
      />
      <BaseLabel
        class="btn btn-outline-dark py-2 fs-5"
        :labelFor="'btnradio4'"
        :labelMessage="'잡담'"
      />
    </div>

    <!-- 테이블 -->
    <NoticeTable :items="dividedList" class="mb-4" />

    <!-- 인풋 그룹 -->
    <div class="d-flex justify-content-end mb-4">
      <div class="me-3">
        <BaseDropdown v-model:selectValue="selectValue">
          <template #options>
            <option value="title">제목</option>
            <option value="author">작성자</option>
          </template>
        </BaseDropdown>
      </div>
      <div class="me-3">
        <BaseInput
          style="width: 138px"
          :ariaLabel="'검색'"
          @keyup.enter="findItemByNotice"
          :value="inputValue"
          v-model:inputValue="inputValue"
        />
      </div>
      <div class="">
        <BaseButton
          class="btn-primary"
          :message="'검색'"
          @click="findItemByNotice"
        />
      </div>
    </div>

    <!-- 글쓰기 -->
    <div class="d-flex justify-content-end mb-4">
      <BaseButton
        class="btn-primary"
        :message="'글쓰기'"
        @click="goNoticeWriteView"
      />
    </div>

    <!-- 페이지네이션 -->
    <div class="d-flex justify-content-center">
      <BasePagination
        :pageTotalCount="pageCount"
        :pageCurrentNumber="pagenationState.pageNumber"
        @page="(page) => (pagenationState.pageNumber = page)"
      />
    </div>
  </div>
</template>

<style></style>
