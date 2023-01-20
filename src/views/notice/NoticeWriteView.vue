<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseLabel from "@/components/base/BaseLabel.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTextarea from "@/components/base/BaseTextarea.vue";
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useLoginStore } from "@/stores/login.js";
import { useAlertStore } from "@/stores/alert.js";
import { storeToRefs } from "pinia";
import notice from "@/data/notice";
import dayjs from "dayjs";

const loginStore = useLoginStore();
const { access_token, account_email, profile_nickname } = loginStore;

const alertStore = useAlertStore();
const { isNonArticleType, isNonContents, isWrightSuccess, chitchat, request } =
  storeToRefs(alertStore);
const { onAlertArticleType, onAlertContents } = alertStore;

const router = useRouter();

const goNoticeView = () => {
  console.log("[goNoticeView]");
  router.push({ name: "NoticeView" });
};

const savedItem = reactive({
  id: null,
  article: null,
  articleType: "",
  title: null,
  content: null,
  author: null,
  hits: "",
  createdDate: null,
  editedDate: null,
});

const saveData = () => {
  console.log("[saveData]");

  if (savedItem.articleType === "") {
    // isBlock.value = true;
    setTimeout(function () {
      // isBlock.value = false;
    }, 1000);
    onAlertArticleType();
  } else if (!savedItem.title) {
    // isBlock.value = true;
    setTimeout(function () {
      // isBlock.value = false;
    }, 1000);
    onAlertContents();
  } else if (!savedItem.content) {
    // isBlock.value = true;
    setTimeout(function () {
      // isBlock.value = false;
    }, 1000);
    onAlertContents();
  } else if (
    savedItem.articleType !== "" &&
    savedItem.title &&
    savedItem.content
  ) {
    isWrightSuccess.value = true;
    savedItem.id = notice.length + 1;
    savedItem.article = savedItem.articleType === "chitchat" ? "잡담" : "요청";
    savedItem.articleType === chitchat.value.value ? "chitchat" : "request";
    savedItem.author = profile_nickname;
    savedItem.createdDate = dayjs().format("YY.MM.DD");
    savedItem.createdDetailDate = dayjs().format("YY.MM.DD HH:mm:ss");
    // savedItem.editedDate = dayjs().format("YY.MM.DD HH:mm:ss");

    notice.unshift(savedItem);

    // isBlock.value = true;
    setTimeout(function () {
      // isBlock.value = false;
      isWrightSuccess.value = false;
      goNoticeView();
    }, 1000);
  }
};

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeWriteView" class="user-select-none py-4">
    <!-- alert -->
    <Teleport to="#alert">
      <BaseAlert
        :isShow="isNonArticleType"
        :classType="'alert-dark'"
        :message="'글 분류를 선택해주세요. 😅'"
      />
      <BaseAlert
        :isShow="isNonContents"
        :classType="'alert-dark'"
        :message="'제목과 내용을 입력해주세요. 😐'"
      />
      <BaseAlert
        :isShow="isWrightSuccess"
        :classType="'alert-primary'"
        :message="'글 등록이 완료되었습니다. 😀'"
      />
    </Teleport>

    <!-- title -->
    <h1 class="text-center mb-5">글 작성</h1>

    <!-- form -->
    <form class="container mb-4">
      <div class="row align-items-center py-2">
        <div class="col-3 text-center">
          <span>작성자</span>
        </div>
        <div class="col-9">
          <span>{{ profile_nickname }}</span>
        </div>
      </div>

      <hr />

      <div class="row align-items-center py-2">
        <div class="col-3 text-center">
          <span>글 분류</span>
        </div>
        <div class="col-9">
          <BaseDropdown
            class=""
            style="width: 6rem"
            v-model:selectValue="savedItem.articleType"
          >
            <template #options>
              <option value="">선택</option>
              <option v-if="profile_nickname === '운영자'" value="announcement">
                공지
              </option>
              <option ref="chitchat" value="chitchat">잡담</option>
              <option ref="request" value="request">요청</option>
            </template>
          </BaseDropdown>
        </div>
      </div>

      <hr />

      <div class="row align-items-center py-2">
        <div class="col-3 text-center">
          <BaseLabel class="" :labelFor="'title'" :labelMessage="'글 제목'" />
        </div>
        <div class="col-9">
          <BaseInput
            class=""
            :id="'title'"
            maxlength="30"
            :value="savedItem.title"
            v-model:inputValue="savedItem.title"
          />
        </div>
      </div>
      <hr />

      <div class="row align-items-start py-2 mb-4">
        <div class="col-3 text-center">
          <BaseLabel class="" :labelFor="'content'" :labelMessage="'글 내용'" />
        </div>
        <div class="col-9">
          <BaseTextarea
            :id="'content'"
            :rowsType="'9'"
            maxlength="500"
            :value="savedItem.content"
            v-model:inputValue="savedItem.content"
          />
        </div>
      </div>
    </form>

    <!-- button-group -->
    <div class="container d-flex justify-content-end">
      <BaseButton
        class="btn-outline-dark me-3"
        :message="'목록'"
        @click="goNoticeView"
      />
      <BaseButton
        class="btn-outline-primary"
        :message="'글 작성완료'"
        @click="saveData"
      />
    </div>
  </div>
</template>
