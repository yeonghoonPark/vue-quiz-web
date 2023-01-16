<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import notice from "@/data/notice";
import { useKakaoStore } from "@/stores/kakao.js";

const kakao = useKakaoStore();

const { access_token, account_email, profile_nickname } = kakao;

const route = useRoute();
const router = useRouter();

const selectedItem = ref(null);
console.log(selectedItem, "셀렉티드");
console.log(route.params.id);
console.log(notice);

notice.forEach((item) => {
  if (item.id === parseInt(route.params.id)) {
    selectedItem.value = item;
    console.log(selectedItem.value);
  }
});

const goNoticeView = () => {
  console.log("[goNoticeView]");
  router.push({ name: "NoticeView" });
};

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeDetailView" class="py-4">
    <!-- title -->
    <h1 class="text-center mb-5">{{ `'${selectedItem?.author}'` }}님의 글</h1>

    <!-- main -->
    <div class="container mb-4">
      <div class="row align-items-center py-2">
        <div class="col-3 text-center">
          <span>작성자</span>
        </div>
        <div class="col-9">
          <span>{{ selectedItem?.author }}</span>
        </div>
      </div>

      <hr />

      <div class="row align-items-center py-2">
        <div class="col-3 text-center">
          <span>글 분류</span>
        </div>
        <div class="col-9">
          <span class="box py-1 px-3">
            {{ selectedItem?.article }}
          </span>
        </div>
      </div>

      <hr />

      <div class="row align-items-center py-2">
        <div class="col-3 text-center">
          <span>글 제목</span>
        </div>
        <div class="col-9">
          <span>
            {{ selectedItem?.title }}
          </span>
        </div>
      </div>

      <hr />

      <div class="row align-items-start py-2 mb-4">
        <div class="col-3 text-center">
          <span>글 내용</span>
        </div>
        <div class="col-9 word-break py-1 overflow-auto" style="height: 230px">
          {{ selectedItem?.content }}
        </div>
      </div>

      <div class="d-flex align-items-end flex-column text-muted">
        <span class="fw-light mb-2" style="font-size: 0.8rem">
          작성일 {{ selectedItem?.createdDetailDate }}
        </span>
        <span
          v-if="selectedItem.editedDate"
          class="fw-light"
          style="font-size: 0.8rem"
        >
          수정일 {{ selectedItem?.editedDate }}
        </span>
      </div>
    </div>

    <!-- button-group -->
    <div class="container d-flex justify-content-end">
      <BaseButton
        class="btn-outline-dark me-3"
        :message="'목록'"
        @click="goNoticeView"
      />
      <BaseButton
        class="btn-outline-success me-3"
        :message="'수정'"
        @click=""
      />
      <BaseButton class="btn-outline-danger" :message="'삭제'" @click="" />
    </div>
  </div>
</template>
