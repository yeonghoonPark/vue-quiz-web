<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import { onMounted, ref } from "vue";
import quizzes from "@/data/quizzes";

const startingPoint = ref(null);
const minute = ref("00");
const second = ref("00");
const millisecond = ref("00");
const timerInterval = ref(null);

// 퀴즈 담는 어레이
const quizArray = ref([]);

// 나중에 pinia 에서 선언
const correctNumber = ref(0);

// 문제 끝나고 기록이 나오는 알럿
const isRecord = ref(false);

const newQuizChildBoxes = ref([]);

/**
 * 매개변수가 10보다 작을 경우 앞자리에 "0"을 추가하여 두자리를 만드는 함수
 * @param {number} number
 * @returns {string}
 */
const addZero = (number) => (number < 10 ? "0" + number : "" + number);

/**
 * 스타트타이머인터벌
 */
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

/**
 * 스타트타임어택
 */
const startTimeAttack = () => {
  console.log("[startTimeAttack]");
  startingPoint.value = startingPoint.value ?? Date.now();
  startTimerInterval();
};

/**
 * 스탑타임어택, 타이머인터벌을 클리어인터벌하는 역할
 */
const stopTimeAttack = () => {
  console.log("[stopTimeAttack]");
  clearInterval(timerInterval.value);
};

/**
 * 타이머를 리셋하는 역할
 */
const resetTimer = () => {
  console.log("[resetTimer]");
  startingPoint.value = null;
  minute.value = "00";
  second.value = "00";
  millisecond.value = "00";

  // 정답갯수, 나중에 pinia 부분으로 옮길 것
  correctNumber.value = 0;
};

/**
 * 태그를 삭제하고 다음형제의 클래스네임 "hidden"을 제거하여 디스플레이를 조정해주는 함수
 * @param {any} element
 */
const removeElement = (element) => {
  console.log("[removeElement]");
  const nextSibling = element.nextSibling;
  element.remove();
  nextSibling?.classList.remove("hidden");
  if (!nextSibling) {
    stopTimeAttack();
    isRecord.value = true;
  }
};

/**
 * 클릭시에 클릭된 보기와 정답이 동일한지 확인하는 함수
 * @param {any} clickedView
 * @param {any} correct
 */
const countCorrectAnswers = (clickedView, correct) => {
  console.log("[countCorrectAnswers]");
  console.log(`선택 = ${clickedView}\n정답 = ${correct}`);
  clickedView === correct
    ? console.log("*정답입니다.")
    : console.log("*틀렸습니다.");
  if (clickedView === correct) correctNumber.value++;
};

/**
 * 배열요소의 순서를 랜덤하게 섞어주고 섞은 배열을 변수에 담는 함수
 * @param {array} array
 */
const mixArrayRandomly = (array) => {
  console.log("[mixArrayRandomly]");
  array.sort(() => Math.random() - 0.5);
  quizArray.value = array;
};

const displayItems = () => {
  console.log("[displayItems]");
  mixArrayRandomly(quizzes);
  const quizBox = document.getElementById("quizBox");
  for (let index = 0; index < 10; index++) {
    const quizChildBox = document.createElement("div");
    quizBox.append(quizChildBox);
    quizChildBox.classList.add("quizChildBox");
    quizChildBox.innerHTML = createHTMLString(quizArray.value[index], index);
  }
  const quizChildBoxes = document.querySelectorAll(".quizChildBox");
  newQuizChildBoxes.value = quizChildBoxes;
  newQuizChildBoxes.value.forEach((item, index) => {
    if (index !== 0) {
      item.classList.add("hidden");
    }
  });
  onClickMultipleChoiceView();
};

const onClickMultipleChoiceView = () => {
  console.log("[onClickMultipleChoiceView]");
  const view1 = document.querySelectorAll(".multiple_choice_view1");
  const view2 = document.querySelectorAll(".multiple_choice_view2");
  const view3 = document.querySelectorAll(".multiple_choice_view3");
  view1.forEach((item, index) =>
    item.addEventListener("click", () => {
      countCorrectAnswers(
        quizArray.value[index]?.multiple_choice_view1,
        quizArray.value[index]?.correct,
      );
      removeElement(newQuizChildBoxes.value[index]);
    }),
  );
  view2.forEach((item, index) =>
    item.addEventListener("click", () => {
      countCorrectAnswers(
        quizArray.value[index]?.multiple_choice_view2,
        quizArray.value[index]?.correct,
      );
      removeElement(newQuizChildBoxes.value[index]);
    }),
  );
  view3.forEach((item, index) =>
    item.addEventListener("click", () => {
      countCorrectAnswers(
        quizArray.value[index]?.multiple_choice_view3,
        quizArray.value[index]?.correct,
      );
      removeElement(newQuizChildBoxes.value[index]);
    }),
  );
};

const createHTMLString = (itemList, index) => {
  console.log("[createHTMLString]");
  return `
  <h3 class="user-select-none">${index + 1}.  ${itemList?.question}</h3>
    <ol>
      <li>
        <span class="multiple_choice_view1 px-2 pointer">
          ${itemList?.multiple_choice_view1}
        </span>
      </li>
      <li>
        <span class="multiple_choice_view2 px-2 pointer">
          ${itemList.multiple_choice_view2}
        </span>
      </li>
      <li>
        <span class="multiple_choice_view3 px-2 pointer">
          ${itemList.multiple_choice_view3}
        </span>
      </li>
    </ol>
  `;
};

// 원본
// const createHTMLString = () => {
//   mixArrayRandomly(quizzes);
//   const quizBox = document.getElementById("quizBox");
//   for (let index = 0; index < 10; index++) {
//     const quizChildBox = document.createElement("div");
//     quizBox.append(quizChildBox);
//     quizChildBox.classList.add("quizChildBox");
//     quizChildBox.innerHTML = `
//     <h3 class="user-select-none">${index + 1}.  ${
//       quizArray.value[index].question
//     }</h3>
//     <ol>
//       <li>
//         <span class="multiple_choice_view1 px-2 pointer">
//           ${quizArray.value[index].multiple_choice_view1}
//         </span>
//       </li>
//       <li>
//         <span class="multiple_choice_view2 px-2 pointer">
//           ${quizArray.value[index].multiple_choice_view2}
//         </span>
//       </li>
//       <li>
//         <span class="multiple_choice_view3 px-2 pointer">
//           ${quizArray.value[index].multiple_choice_view3}
//         </span>
//       </li>
//     </ol>
//     `;
//   }

//   const quizChildBoxes = document.querySelectorAll(".quizChildBox");
//   newQuizChildBoxes.value = quizChildBoxes;
//   newQuizChildBoxes.value.forEach((item, index) => {
//     if (index !== 0) {
//       item.classList.add("hidden");
//     }
//   });

//   const view1 = document.querySelectorAll(".multiple_choice_view1");
//   const view2 = document.querySelectorAll(".multiple_choice_view2");
//   const view3 = document.querySelectorAll(".multiple_choice_view3");

//   view1.forEach((item, index) =>
//     item.addEventListener("click", () => {
//       onClickMultipleChoiceView(
//         quizArray.value[index]?.multiple_choice_view1,
//         quizArray.value[index]?.correct,
//       );
//       removeElement(newQuizChildBoxes.value[index]);
//     }),
//   );
//   view2.forEach((item, index) =>
//     item.addEventListener("click", () => {
//       onClickMultipleChoiceView(
//         quizArray.value[index]?.multiple_choice_view2,
//         quizArray.value[index]?.correct,
//       );
//       removeElement(newQuizChildBoxes.value[index]);
//     }),
//   );
//   view3.forEach((item, index) =>
//     item.addEventListener("click", () => {
//       onClickMultipleChoiceView(
//         quizArray.value[index]?.multiple_choice_view3,
//         quizArray.value[index]?.correct,
//       );
//       removeElement(newQuizChildBoxes.value[index]);
//     }),
//   );
// };

const closeAlert = () => {
  console.log("[closeAlert]");
  isRecord.value = false;
};

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="QuizView">
    <!-- alert부분 텔레포트 적용할 예정 -->
    <BaseAlert v-if="isRecord" @buttonClick="closeAlert" />
    <BaseButton class="btn-primary btn-lg" :message="'Quiz'" @click="" />

    <hr />
    <span id="postTestMin">{{ minute }}</span>
    <span>:</span>
    <span id="postTestSec">{{ second }}</span>
    <span>.</span>
    <span id="postTestMilisec" class="me-4">{{ millisecond }}</span>

    <span>맞춘 갯수 : {{ correctNumber }}</span>
    <hr />
    <button
      class="btn btn-primary btn-sm me-2"
      @click="displayItems(), startTimeAttack()"
    >
      Start
    </button>
    <button class="btn btn-primary btn-sm me-2" @click="stopTimeAttack">
      Stop
    </button>
    <button class="btn btn-primary btn-sm" @click="resetTimer">Reset</button>

    <hr />

    <div id="quizBox">
      <template v-if="startingPoint"></template>
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
  background-color: bisque;
}

.hidden {
  /* color: rgb(177, 174, 174); */
  display: none;
}

.px-2:hover {
  /* background-color: bisque; */
}
</style>
