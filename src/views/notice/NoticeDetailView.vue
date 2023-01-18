<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useKakaoStore } from "@/stores/kakao.js";
import { useAlertStore } from "@/stores/alert.js";
import { storeToRefs } from "pinia";
import notice from "@/data/notice";

const kakaoStore = useKakaoStore();
const { access_token, account_email, profile_nickname } =
  storeToRefs(kakaoStore);

const alertStore = useAlertStore();
const { isDeleteSuccess, isEditMismatch, isDeleteMismatch } =
  storeToRefs(alertStore);

const route = useRoute();
const router = useRouter();

const selectedItem = ref(null);
const id = parseInt(route.params.id);

const isBlock = ref(false);
const isDeleteCard = ref(false);

notice.forEach((item) => {
  if (item.id === id) selectedItem.value = item;
});

const goNoticeView = () => {
  console.log("[goNoticeView]");
  router.push({ name: "NoticeView" });
};

const goNoticeEditView = (id) => {
  console.log("[goNoticeEditView]");
  router.push({
    name: "NoticeEditView",
    params: { id },
  });
};

const onEditButtonClick = () => {
  console.log("[onEditButtonClick]");
  if (profile_nickname.value === selectedItem.value.author) {
    goNoticeEditView(id);
  } else {
    isBlock.value = true;
    isEditMismatch.value = true;
    setTimeout(function () {
      isBlock.value = false;
      isEditMismatch.value = false;
    }, 1500);
  }
};

const showDeleteCard = () => {
  console.log("[showDeleteCard]");
  if (profile_nickname.value === selectedItem.value.author) {
    isBlock.value = true;
    isDeleteCard.value = true;
  } else {
    isBlock.value = true;
    isDeleteMismatch.value = true;
    setTimeout(function () {
      isBlock.value = false;
      isDeleteMismatch.value = false;
    }, 1500);
  }
};

const deleteSelectedItem = () => {
  console.log("[deleteSelectedItem]");
  notice.forEach((item) => {
    if (item.id === id) {
      isDeleteCard.value = false;
      isDeleteSuccess.value = true;
      notice.splice(item, 1);
      setTimeout(function () {
        isDeleteSuccess.value = false;
        goNoticeView();
      }, 1500);
    }
  });
};

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeDetailView" class="py-4">
    <!-- anti-click overlayers -->
    <div
      v-if="isBlock"
      class="position-fixed top-0 start-0 w-100 h-100 user-select-none"
      style="z-index: 1"
    />

    <!-- alert -->
    <Teleport to="#alert">
      <BaseAlert
        class="user-select-none text-center"
        :isShow="isDeleteSuccess"
        :classType="'alert-info'"
        :message="'글 삭제가 완료되었습니다. 😀'"
      />
      <BaseAlert
        class="user-select-none text-center"
        :isShow="isEditMismatch"
        :classType="'alert-warning'"
        :message="'작성자만 수정 가능합니다. 😅'"
      />
      <BaseAlert
        class="user-select-none text-center"
        :isShow="isDeleteMismatch"
        :classType="'alert-warning'"
        :message="'작성자만 삭제 가능합니다. 😅'"
      />
    </Teleport>

    <!-- card -->
    <Teleport to="#card">
      <div
        v-if="isDeleteCard"
        class="position-fixed top-50 start-50 translate-middle"
        style="z-index: 2"
      >
        <BaseCard class="text-center">
          <template #header>
            <h5 class="">알림</h5>
          </template>
          <h6 class="card-title p-2 mb-3">
            한번 삭제한 자료는 복구할 방법이 없습니다.
            <br />
            <br />
            정말로 삭제하시겠습니까?
          </h6>
          <BaseButton
            class="btn-outline-primary me-3"
            :message="'확인'"
            @click="deleteSelectedItem"
          />
          <BaseButton
            class="btn-outline-danger"
            :message="'취소'"
            @click="(isDeleteCard = false), (isBlock = false)"
          />
        </BaseCard>
      </div>
    </Teleport>

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
        @click="onEditButtonClick"
      />
      <BaseButton
        class="btn-outline-danger"
        :message="'삭제'"
        @click="showDeleteCard"
      />
    </div>
  </div>
</template>
