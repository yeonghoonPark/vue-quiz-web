<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseLabel from "@/components/base/BaseLabel.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTextarea from "@/components/base/BaseTextarea.vue";
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useLoginStore } from "@/stores/login.js";
import { useAlertStore } from "@/stores/alert.js";
import { storeToRefs } from "pinia";
import notice from "@/data/notice";
import dayjs from "dayjs";

//#region state
const loginStore = useLoginStore();
const { profile_nickname } = storeToRefs(loginStore);

const alertStore = useAlertStore();
const { isNonArticleType, isNonContents, isWrightSuccess, chitchat, request } =
  storeToRefs(alertStore);
const { onAlertArticleType, onAlertContents } = alertStore;

const route = useRoute();
const router = useRouter();

const editedItem = ref(null);
const id = parseInt(route.params.id);
//#endregion state

//#region function
notice.forEach((item) => {
  if (item.id === id) {
    editedItem.value = item;
    console.log(editedItem.value, "에딧티드");
  }
});

const goNoticeDetailView = (id) => {
  console.log("[goNoticeDetailView]");
  router.push({
    name: "NoticeDetailView",
    params: { id },
  });
};

const editData = () => {
  console.log("[editData]");
  if (editedItem.value?.articleType === "") {
    setTimeout(function () {}, 1000);
    onAlertArticleType();
  } else if (!editedItem.value.title) {
    setTimeout(function () {}, 1000);
    onAlertContents();
  } else if (!editedItem.value.content) {
    setTimeout(function () {}, 1000);
    onAlertContents();
  } else if (
    editedItem.value?.articleType !== "" &&
    editedItem.value.title &&
    editedItem.value.content
  ) {
    isWrightSuccess.value = true;
    editedItem.value.article =
      editedItem.value?.articleType === "chitchat" ? "잡담" : "요청";
    editedItem.value?.articleType === chitchat.value.value
      ? "chitchat"
      : "request";
    editedItem.value.editedDate = dayjs().format("YY.MM.DD HH:mm:ss");

    setTimeout(function () {
      isWrightSuccess.value = false;
      goNoticeDetailView(id);
    }, 1000);
  }
};
//#endregion function

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeEditView" class="user-select-none py-4">
    <!-- alert -->
    <Teleport to="#alert">
      <BaseAlert
        :isShow="isNonArticleType"
        :classType="'alert-dark'"
        :message="'글 분류를 선택해주세요.'"
      />
      <BaseAlert
        :isShow="isNonContents"
        :classType="'alert-dark'"
        :message="'제목과 내용을 입력해주세요.'"
      />
      <BaseAlert
        :isShow="isWrightSuccess"
        :classType="'alert-info'"
        :message="'글 수정이 완료되었습니다.'"
      />
    </Teleport>

    <!-- title -->
    <h1 class="text-center mb-5">글 수정</h1>

    <!-- form -->
    <form class="container mb-4">
      <div class="row align-items-center py-2">
        <div class="col-3 text-center">
          <span>작성자</span>
        </div>
        <div class="col-9">
          <span>{{ editedItem?.author }}</span>
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
            v-model:selectValue="editedItem.articleType"
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
            :value="editedItem.title"
            v-model:inputValue="editedItem.title"
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
            :value="editedItem.content"
            v-model:inputValue="editedItem.content"
          />
        </div>
      </div>
    </form>

    <!-- button-group -->
    <div class="container d-flex justify-content-end">
      <BaseButton
        class="btn-outline-dark me-3"
        :message="'목록'"
        @click="router.push({ name: 'NoticeView' })"
      />

      <BaseButton class="btn-info" :message="'글 수정완료'" @click="editData" />
    </div>
  </div>
</template>
