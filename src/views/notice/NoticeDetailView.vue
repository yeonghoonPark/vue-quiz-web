<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import notice from "@/data/notice";

const route = useRoute();
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

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="NoticeDetailView" class="user-select-none">
    <h1>게시판 글세부목록</h1>
    <p>{{ selectedItem.title }}</p>
    <p>{{ selectedItem.content }}</p>
    <p>{{ selectedItem.createdDate }}</p>
  </div>
</template>
