<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseLabel from "@/components/base/BaseLabel.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTextarea from "@/components/base/BaseTextarea.vue";
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";

import { useRouter } from "vue-router";

import notice from "@/data/notice";
import { onMounted, reactive, ref } from "vue";

import { useKakaoStore } from "@/stores/kakao.js";

const kakao = useKakaoStore();

const { access_token, account_email, profile_nickname } = kakao;

const router = useRouter();

const goNoticeView = () => {
  console.log("[goNoticeView]");
  router.push({ name: "NoticeView" });
};

const savedList = reactive({
  article: null,
  articleType: "",
  title: null,
  content: null,
  author: null,
  hits: "23.01.12",
  dateCreate: null,
});

const isNonArticleType = ref(false);
const isNonContents = ref(false);
const isAllowed = ref(false);

// options value
const common = ref(null);
const request = ref(null);

const saveData = () => {
  console.log("[saveData]");

  if (savedList.articleType === "") {
    onAlertArticleType();
  } else if (!savedList.title) {
    onAlertContents();
  } else if (!savedList.content) {
    onAlertContents();
  } else if (
    savedList.articleType !== "" &&
    savedList.title &&
    savedList.content
  ) {
    savedList.articleType === common.value.value ? "common" : "request";
    savedList.article = savedList.articleType === "common" ? "잡담" : "요청";
    savedList.author = profile_nickname;
    notice.unshift(savedList);
    isAllowed.value = true;
    console.log(notice, "notice");
    setTimeout(function () {
      isAllowed.value = false;
      goNoticeView();
    }, 1500);
  }
};

const onAlertArticleType = () => {
  console.log("[onAlert]");
  isNonArticleType.value = true;
  setTimeout(function () {
    isNonArticleType.value = false;
  }, 1500);
};

const onAlertContents = () => {
  console.log("[onAlertContents]");
  isNonContents.value = true;
  setTimeout(function () {
    isNonContents.value = false;
  }, 1500);
};

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeWriteView" class="user-select-none py-4">
    <h1 class="text-center mb-5">글쓰기</h1>

    <Teleport to="#alert">
      <BaseAlert
        class="user-select-none"
        :isShow="isNonArticleType"
        :classType="'alert-warning'"
        :message="'글 분류를 선택해주세요. 😅'"
      />
      <BaseAlert
        class="user-select-none"
        :isShow="isNonContents"
        :classType="'alert-dark'"
        :message="'제목과 내용을 입력해주세요. 😐'"
      />
      <BaseAlert
        class="user-select-none"
        :isShow="isAllowed"
        :classType="'alert-primary'"
        :message="'글 등록이 완료되었습니다. 😀'"
      />
    </Teleport>

    <form>
      <BaseDropdown v-model:selectValue="savedList.articleType">
        <template #options>
          <option value="">글 분류 선택</option>
          <option v-if="profile_nickname === '운영자'" value="announcement">
            공지
          </option>
          <option ref="common" value="common">잡담</option>
          <option ref="request" value="request">요청</option>
        </template>
      </BaseDropdown>
      <div class="mb-3">
        <BaseLabel
          class="text-center"
          :labelFor="'title'"
          :labelMessage="'글 제목'"
        />
        <BaseInput
          class=""
          :id="'title'"
          maxlength="30"
          :value="savedList.title"
          v-model:inputValue="savedList.title"
        />
      </div>
      <div class="mb-3">
        <BaseLabel class="" :labelFor="'content'" :labelMessage="'글 내용'" />
        <BaseTextarea
          :id="'content'"
          maxlength="150"
          :value="savedList.content"
          v-model:inputValue="savedList.content"
        />
      </div>
    </form>

    <div class="d-flex justify-content-end mb-4">
      <BaseButton
        class="btn-outline-dark me-3"
        :message="'뒤로가기'"
        @click="goNoticeView"
      />
      <BaseButton class="btn-primary" :message="'작성'" @click="saveData" />
    </div>
  </div>
</template>
