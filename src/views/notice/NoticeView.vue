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

    <div class="table-responsive">
      <table class="table table-striped table-hover text-center">
        <thead>
          <tr class="">
            <th scope="col" class="col-2">분류</th>
            <th scope="col" class="col-6">제목</th>
            <th scope="col" class="col-2">작성자</th>
            <th scope="col" class="col-2 col-sm-none">조회수</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr class="">
            <th scope="row"><span class="box py-1 px-3">공지</span></th>
            <td class="text-start">Tooltips rr for positioning.</td>
            <td>Otto</td>

            <td>234</td>
          </tr>
          <tr>
            <th scope="row"><span class="box py-1 px-3">일반</span></th>
            <td class="text-start">Jacob</td>
            <td>Thornton</td>

            <td>59</td>
          </tr>
          <tr>
            <th scope="row"><span class="box py-1 px-3">공지</span></th>
            <td class="text-start">Jacob</td>
            <td>Larry the Bird</td>

            <td>34</td>
          </tr>
          <tr>
            <th scope="row"><span class="box py-1 px-3">질문</span></th>
            <td class="text-start">Jacob</td>
            <td>Larry the Bird</td>

            <td>167</td>
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
.test {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.table-responsive {
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
}

.분류 {
  width: 10%;
}
.제목 {
  width: ;
}
.작성자 {
  width: 10%;
}
.조회수 {
  width: 10%;
}
</style>
