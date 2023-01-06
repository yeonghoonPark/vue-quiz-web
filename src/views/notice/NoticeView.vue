<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goNoticeWriteView = () => {
  console.log("[goNoticeWriteView]");
  router.push({ name: "NoticeWriteView" });
};

const isDisplay = ref(false);
const test = ref(null);
test.value = window.innerWidth;
console.log(test.value);

if (test.value > 768) {
  isDisplay.value = true;
}
</script>

<template>
  <div id="NoticeView" class="user-select-none">
    <h1>게시판페이지</h1>
    <!-- class="d-hidden" -->
    <div class="py-4">
      <table class="table align-middle table-striped table-hover text-center">
        <thead>
          <tr>
            <th scope="col" class="col-2">분류</th>
            <th scope="col" class="col-6">제목</th>
            <th scope="col" class="col-2 d-sm-hidden d-md-hidden">작성자</th>
            <th scope="col" class="col-2 d-sm-hidden d-md-hidden">조회수</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">
              <span class="box py-1 px-3">공지</span>
            </th>
            <td class="text-start test">
              가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가
            </td>
            <td class="d-sm-hidden d-md-hidden fw-light">Otto</td>
            <td
              class="d-sm-hidden d-md-hidden fw-light"
              style="font-size: 12px"
            >
              234
            </td>
          </tr>
          <tr>
            <th scope="row"><span class="box py-1 px-3">일반</span></th>
            <td class="text-start">Jacob</td>
            <td class="d-sm-hidden d-md-hidden fw-light">Thornton</td>

            <td
              class="d-sm-hidden d-md-hidden fw-light"
              style="font-size: 12px"
            >
              59
            </td>
          </tr>
          <tr>
            <th scope="row"><span class="box py-1 px-3">공지</span></th>
            <td class="text-start">
              가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가
            </td>
            <td class="d-sm-hidden d-md-hidden fw-light">
              푸푸푸푸푸푸푸푸푸푸푸푸푸푸푸
            </td>

            <td
              class="d-sm-hidden d-md-hidden fw-light"
              style="font-size: 12px"
            >
              34
            </td>
          </tr>
          <tr>
            <th scope="row"><span class="box py-1 px-3">잡담</span></th>
            <td class="text-start">Jacob</td>
            <td class="d-sm-hidden d-md-hidden fw-light">Larry the Bird</td>

            <td
              class="d-sm-hidden d-md-hidden fw-light"
              style="font-size: 12px"
            >
              167
            </td>
          </tr>
          <tr>
            <th scope="row"><span class="box py-1 px-3">질문</span></th>
            <td class="text-start">Jacob</td>
            <td class="d-sm-hidden d-md-hidden fw-light">Larry the Bird</td>

            <td
              class="d-sm-hidden d-md-hidden fw-light"
              style="font-size: 12px"
            >
              167
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <BaseButton
      class="btn-primary"
      :message="'Write'"
      @click="goNoticeWriteView"
    />
  </div>
</template>

<style>
tr {
  height: 65px;
}
</style>
