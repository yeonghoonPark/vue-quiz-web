<script setup>
import BaseTh from "@/components/base/BaseTh.vue";
import BaseTd from "@/components/base/BaseTh.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useRouter } from "vue-router";
import { useRecordStore } from "@/stores/record";
import { storeToRefs } from "pinia";
import ranking from "@/data/ranking";

const recordStore = useRecordStore();
const { alignedRankList } = storeToRefs(recordStore);

const router = useRouter();

alignedRankList.value = ranking.sort(function (a, b) {
  let aTimeTaken = a.minute + a.second + a.millisecond;
  let bTimeTaken = b.minute + b.second + b.millisecond;
  if (a.correctAnswerNumber === b.correctAnswerNumber) {
    return aTimeTaken - bTimeTaken;
  } else {
    return b.correctAnswerNumber - a.correctAnswerNumber;
  }
});
[...new Set(alignedRankList.value)];

const setBackgoundType = (rank) => {
  if (rank === 0) {
    return "bg-gold";
  } else if (rank === 1) {
    return "bg-silver";
  } else if (rank === 2) {
    return "bg-bronze";
  }
};
</script>

<template>
  <div id="RankingView" class="py-4">
    <!-- title -->
    <h1 class="text-center mb-5">순위</h1>

    <div class="overflow-auto mb-4 user-select-none" style="height: 500px">
      <table class="table align-middle text-center">
        <thead class="sticky-top box-bg">
          <tr>
            <BaseTh class="col-1" :scopeStyle="'col'" :message="'순위'" />
            <BaseTh class="col-4" :scopeStyle="'col'" :message="'닉네임'" />
            <BaseTh class="col-3" :scopeStyle="'col'" :message="'맞춘 갯수'" />
            <BaseTh
              class="col-3 d-sm-hidden d-md-hidden"
              :scopeStyle="'col'"
              :message="'소요 시간'"
            />
            <BaseTh class="d-none" :scopeStyle="'col'" :message="'id'" />
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr
            v-for="(item, index) in ranking"
            :key="index"
            :class="setBackgoundType(index)"
            style="height: 65px"
          >
            <BaseTh :scopeStyle="'row'">
              <template #span>
                <span v-if="index === 0">👑</span>
                <span v-else-if="index === 1" class="fs-5">♛</span>
                <span v-else-if="index === 2" class="fs-5">♕</span>
                <span v-else>{{ index + 1 }}</span>
              </template>
            </BaseTh>

            <BaseTd class="" :message="item?.nickname" />
            <BaseTd class="" :message="item?.correctAnswerNumber" />
            <BaseTd
              class="d-sm-hidden d-md-hidden"
              :message="`${item?.minute}:${item?.second}:${item?.millisecond}`"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <!-- button-group -->
    <div class="d-flex justify-content-end">
      <BaseButton
        class="btn-primary"
        :message="'도전'"
        @click="router.push({ name: 'QuizView' })"
      />
    </div>
  </div>
</template>
