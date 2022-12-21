<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { onMounted, ref } from "vue";

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
  a === b ? console.log("*정답, 같다") : console.log("*오답, 다르다");

  if (a === b) testCount.value++;
};

const testCopy = () => {
  console.log(document.getElementById("test"));
  const testDiv = document.getElementById("test");

  for (let i = 0; i < 10; i++) {
    const testCreat = document.createElement("div");
    testDiv.append(testCreat);
    testCreat.innerHTML = `
    <h2>${quizzes[i].count}. 문제  </h2>
    <h3>${quizzes[i].question}</h3>
    <ol>
      <li>
        <span class="example1 px-2">
          ${quizzes[i].example1}
        </span>
      </li>
      <li>
        <span class="example2 px-2">
          ${quizzes[i].example2}
        </span>
      </li>
      <li>
        <span class="example3 px-2">
          ${quizzes[i].example3}
        </span>
      </li>
    </ol>
    `;
  }

  const example1 = document.querySelectorAll(".example1");
  const example2 = document.querySelectorAll(".example2");
  const example3 = document.querySelectorAll(".example3");

  // console.log(example1.length, "렝스");
  example1.forEach((item, index) =>
    item.addEventListener("click", () =>
      testAnswer(quizzes[index]?.example1, quizzes[index]?.correct),
    ),
  );
  example2.forEach((item, index) =>
    item.addEventListener("click", () =>
      testAnswer(quizzes[index]?.example2, quizzes[index]?.correct),
    ),
  );
  example3.forEach((item, index) =>
    item.addEventListener("click", () =>
      testAnswer(quizzes[index]?.example3, quizzes[index]?.correct),
    ),
  );
};

onMounted(() => {
  console.log("[onMounted]");
});
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
    <button
      class="btn btn-primary btn-sm me-2"
      @click="testCopy(), startTimeAttack()"
    >
      Start
    </button>
    <button class="btn btn-primary btn-sm me-2" @click="stopTimeAttack">
      Stop
    </button>
    <button class="btn btn-primary btn-sm" @click="resetTimer">Reset</button>

    <hr />
    <!-- <div id="test">
      <button @click="testCopy(), startTimeAttack()">버튼</button>
    </div> -->
    <div id="test">
      <template v-if="startingPoint">
        <!-- <div>
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
        </div> -->
      </template>
      <template v-else>
        <div>
          <span>Are You Ready?</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
li {
  margin-bottom: 12px;
  transition: var(--base-transition);
}

span:hover {
  cursor: pointer;
  background-color: bisque;
}

.px-2:hover {
  /* background-color: bisque; */
}
</style>
