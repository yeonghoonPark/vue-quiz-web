<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { ref } from "vue";

import quizzes from "@/data/quizzes";

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

  // 나중에 pinia 부분으로 옮길 것
  testCount.value = 0;
};

// 나중에 pinia 에서 선언
const testCount = ref(0);
// 정답 클릭 테스트
const testAnswer = (a, b) => {
  console.log(`a = ${a} , b = ${b}`);
  a === b ? console.log("같다") : console.log("다르다");

  if (a === b) testCount.value++;
};

const testCopy = () => {
  console.log(document.getElementById("test"));
  const testDiv = document.getElementById("test");

  // testDiv.innerHTML = `<h1>안녕하세요</h1>`;

  for (let i = 0; i < 10; i++) {
    const testCreat = document.createElement("div");
    testDiv.append(testCreat);
    testCreat.innerHTML = `
    <h3>${quizzes[i].count}. 문제  </h3>
    <h3>${quizzes[i].question}</h3>
    `;
  }
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
    <span id="postTestMilisec" class="me-4">{{ millisecond }}</span>

    <span>맞춘 갯수 : {{ testCount }}</span>
    <hr />

    <button class="btn btn-primary btn-sm me-2" @click="startTimeAttack">
      Start
    </button>
    <button class="btn btn-primary btn-sm me-2" @click="stopTimeAttack">
      Stop
    </button>
    <button class="btn btn-primary btn-sm" @click="resetTimer">Reset</button>

    <hr />
    <div id="test">
      <button @click="testCopy">버튼</button>
    </div>
    <div>
      <template v-if="startingPoint">
        <div>
          <h2>문제.</h2>
          <div>
            <h3>{{ quizzes[19].question }}</h3>
            <ol>
              <li>
                <span
                  class="px-2"
                  @click="
                    testAnswer(quizzes[19]?.example1, quizzes[19]?.correct)
                  "
                  >{{ quizzes[19].example1 }}</span
                >
              </li>
              <li>
                <span
                  class="px-2"
                  @click="
                    testAnswer(quizzes[19]?.example2, quizzes[19]?.correct)
                  "
                  >{{ quizzes[19].example2 }}</span
                >
              </li>
              <li>
                <span
                  class="px-2"
                  @click="
                    testAnswer(quizzes[19]?.example3, quizzes[19]?.correct)
                  "
                  >{{ quizzes[19].example3 }}</span
                >
              </li>
            </ol>
          </div>
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

<style scoped>
li {
  cursor: pointer;
  margin-bottom: 12px;
  transition: var(--base-transition);
}

span:hover {
  background-color: bisque;
}
</style>
