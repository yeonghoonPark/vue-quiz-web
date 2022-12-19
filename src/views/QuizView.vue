<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { ref } from "vue";

import quizzes from "@/data/quizzes";

console.log(quizzes[0]);

const startingPoint = ref(null);
const minute = ref("00");
const second = ref("00");
const millisecond = ref("00");
const timerInterval = ref(null);

/**
 * 매개변수가 10보다 작을 경우 앞자리에 "0"을 추가하여 두자리를 만드는 함수
 *
 * @param {number} number
 *
 * @returns {string}
 */
const addZero = (number) => (number < 10 ? "0" + number : "" + number);

// 밀리세컨즈 인터벌 함수
const startTimerInterval = () => {
  console.log("[startTimerInterval]");
  timerInterval.value = setInterval(function () {
    let currentPoint = new Date(Date.now() - startingPoint.value);
    minute.value = addZero(currentPoint.getMinutes());
    second.value = addZero(currentPoint.getSeconds());
    millisecond.value = addZero(
      Math.floor(currentPoint.getMilliseconds() / 10),
    );
  }, 1);
};

// 스타트버튼 함수
const startTimeAttack = () => {
  console.log("[startTimeAttack]");
  startingPoint.value = startingPoint.value ?? Date.now();
  startTimerInterval();
};

// 스탑버튼 함수
const stopTimeAttack = () => {
  console.log("[stopTimeAttack]");
  clearInterval(timerInterval.value);
};

// 리셋버튼 함수
const resetTimer = () => {
  console.log("[resetTimer]");
  startingPoint.value = null;
  minute.value = "00";
  second.value = "00";
  millisecond.value = "00";
};
</script>

<template>
  <div id="QuizView">
    <BaseButton class="btn-primary btn-lg" :message="'Quiz'" @click="" />

    <hr />
    <span id="postTestMin">{{ minute }}</span>
    <span>:</span>
    <span id="postTestSec">{{ second }}</span>
    <span>.</span>
    <span id="postTestMilisec">{{ millisecond }}</span>
    <hr />

    <button class="btn btn-primary btn-sm me-2" @click="startTimeAttack">
      Start
    </button>
    <button class="btn btn-primary btn-sm me-2" @click="stopTimeAttack">
      Stop
    </button>
    <button class="btn btn-primary btn-sm" @click="resetTimer">Reset</button>

    <hr />
    <div>
      <template v-if="startingPoint">
        <div>
          <h2>문제.</h2>
          <h3>{{ quizzes[19].question }}</h3>
          <ol>
            <li>{{ quizzes[19].example1 }}</li>
            <li>{{ quizzes[19].example2 }}</li>
            <li>{{ quizzes[19].example3 }}</li>
          </ol>
        </div>
      </template>
      <template v-else>
        <div>
          <span>Are You Ready?</span>
        </div>
      </template>
    </div>
  </div>
</template>
