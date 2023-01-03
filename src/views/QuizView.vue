<script setup>
/* import */
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import quizzes from "@/data/quizzes";
import { onMounted, ref } from "vue";
import { useKakaoStore } from "@/stores/kakao";
import { useRecordStore } from "@/stores/record";
import { storeToRefs } from "pinia";

/* state */
const recordStore = useRecordStore();
const kakaoStore = useKakaoStore();

// kakaoStore's state
const { access_token, account_email, profile_nickname } =
  storeToRefs(kakaoStore);

// recordStore's state
const {
  startingPoint,
  minute,
  second,
  millisecond,
  correctAnswerNumber,
  timeTaken,
} = storeToRefs(recordStore);

// recordStore's method
const { startTimeAttack, stopTimeAttack, resetTimer, getTimeTaken } =
  recordStore;

// 퀴즈 담는 어레이
const quizArray = ref([]);
const newQuizChildBoxes = ref([]);

// 문제 끝나고 기록이 나오는 알럿
const isRecordShow = ref(false);

// quiz시작 모달 부분관련
const isStartShow = ref(false);
const startCount = ref(3);
const countInterval = ref(null);

// alert 관련
const alertClassType = ref("");
const alertMessage = ref("");
const isAlertShow = ref(false);

/* function */
/**
 * 태그를 삭제하고 다음형제의 클래스네임 "hidden"을 제거하여 디스플레이를 조정해주는 함수
 * @param {any} element
 */
const removeElement = (element) => {
  console.log("[removeElement]");
  setTimeout(function () {
    const nextSibling = element.nextSibling;
    element.remove();
    nextSibling?.classList.remove("hidden");
    if (!nextSibling) {
      stopTimeAttack();
      getTimeTaken();
      isRecordShow.value = true;
    }
  }, 1000);
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

  if (clickedView === correct) {
    correctAnswerNumber.value++;
    alertClassType.value = "alert-success";
    alertMessage.value = "정답입니다. 😊";
  } else {
    alertClassType.value = "alert-danger";
    alertMessage.value = "오답이에요. 😡";
  }
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
  view1.forEach((item, index) => {
    item.addEventListener("click", () => {
      countCorrectAnswers(
        quizArray.value[index]?.multiple_choice_view1,
        quizArray.value[index]?.correct,
      );
      removeElement(newQuizChildBoxes.value[index]);
    });
    item.addEventListener("mouseup", onAlert);
  });
  view2.forEach((item, index) => {
    item.addEventListener("click", () => {
      countCorrectAnswers(
        quizArray.value[index]?.multiple_choice_view2,
        quizArray.value[index]?.correct,
      );
      removeElement(newQuizChildBoxes.value[index]);
    });
    item.addEventListener("mouseup", onAlert);
  });
  view3.forEach((item, index) => {
    item.addEventListener("click", () => {
      countCorrectAnswers(
        quizArray.value[index]?.multiple_choice_view3,
        quizArray.value[index]?.correct,
      );
      removeElement(newQuizChildBoxes.value[index]);
    });
    item.addEventListener("mouseup", onAlert);
  });
};

const createHTMLString = (itemList, index) => {
  console.log("[createHTMLString]");
  return `
  <h4 class="box box-bg mb-4 py-3 px-2 lh-base word-break">${index + 1}. ${
    itemList?.question
  }</h4>
    <ol>
      <li class="my-2">
        <span class="box-radius hover fs-5 p-1 transition px-2 pointer user-select-none">
          ① ${itemList?.multiple_choice_view1}
        </span>
      </li>
      <li class="my-2">
        <span class="box-radius hover fs-5 p-1 transition px-2 pointer user-select-none">
          ② ${itemList.multiple_choice_view2}
        </span>
      </li>
      <li class="my-2">
        <span class="box-radius hover fs-5 p-1 transition px-2 pointer user-select-none">
          ③ ${itemList.multiple_choice_view3}
        </span>
      </li>
    </ol>
  `;
};

const returnText = (correctAnswerNumber) => {
  // 0~1문제
  if (correctAnswerNumber < 2) {
    return `...위로의 말을 전합니다. 💩`;
    // 2~5문제
  } else if (correctAnswerNumber > 1 && correctAnswerNumber < 6) {
    return `조금 더 분발해주세요 😭`;
    // 6~7문제
  } else if (correctAnswerNumber > 5 && correctAnswerNumber < 8) {
    return `상식이 뛰어나시군요? 😁`;
    // 8~9문제
  } else if (correctAnswerNumber > 7 && correctAnswerNumber < 10) {
    return `훌륭해요!! 똑똑하시군요!? 😎`;
    // 10문제
  } else {
    return `축하합니다!! 완벽해요 🤩`;
  }
};

const onQuizCount = () => {
  console.log("[onQuizCount]");
  isStartShow.value = true;
  countInterval.value = setInterval(function () {
    startCount.value--;
    if (startCount.value === 0) {
      startCount.value = "Go!!";
      clearInterval(countInterval.value);
    }
  }, 1000);
  setTimeout(function () {
    isStartShow.value = false;
    startCount.value = 3;
    displayItems(), startTimeAttack();
  }, 4000);
};

const closeRecordCard = () => {
  console.log("[closeRecordCard]");
  isRecordShow.value = false;
  correctAnswerNumber.value = 0;
  resetTimer();
};

const onAlert = () => {
  console.log("[onAlert]");
  isAlertShow.value = true;
  setTimeout(function () {
    isAlertShow.value = false;
  }, 800);
};

onMounted(() => {
  console.log("[onMounted]");
});
</script>

<template>
  <div id="QuizView" class="user-select-none">
    <!-- 정답, 오답 확인 메세지 -->
    <Teleport to="#alert">
      <BaseAlert
        class="user-select-none"
        :isShow="isAlertShow"
        :classType="alertClassType"
        :message="alertMessage"
      />
      <div
        class="position-fixed top-50 start-50 translate-middle user-select-none"
        v-if="isStartShow"
        style="
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.3);
        "
      >
        <span
          class="user-select-none"
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: 700;
            font-size: 5rem;
            color: var(--bs-gray-100);
            text-shadow: 2px 2px 12px var(--bs-gray-900);
          "
        >
          {{ startCount }}
        </span>
      </div>
    </Teleport>

    <!-- 퀴즈 끝나고 결과카드 부분 -->
    <Teleport to="#recordCard">
      <!-- v-if="isRecordShow" -->
      <div
        class="position-fixed top-50 start-50 translate-middle user-select-none"
        v-if="isRecordShow"
        style="
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.3);
        "
      >
        <BaseCard
          v-if="isRecordShow"
          style="width: 25rem"
          @buttonClick="closeRecordCard"
          :header="`'${profile_nickname}'님 ${returnText(correctAnswerNumber)}`"
          :title="`'${profile_nickname}'님의 결과`"
          :isFirst="true"
          :isSecond="true"
          :isThird="true"
          :firstContent="`맞춘 갯수: ${correctAnswerNumber} 문제`"
          :secondContent="`소요 시간: ${minute}:${second}.${millisecond}`"
          :thirdContent="`등수: 미정`"
        />
      </div>
    </Teleport>

    <div
      id="quizBox"
      class="position-fixed top-50 start-50 translate-middle box p-4"
      style="max-width: 624px; min-width: 348px; margin: 0 auto"
    >
      <!-- v-if -->
      <template v-if="startingPoint">
        <h4 class="text-center fs-1 pb-2 mb-4">Quiz</h4>
        <div class="d-md-flex justify-content-between fs-6">
          <div class="mb-4">
            <span class="box p-2"
              >맞춘 갯수:<span class="font-pink">{{
                correctAnswerNumber
              }}</span></span
            >
          </div>
          <div class="mb-4">
            <span class="box p-2"
              >소요 시간:{{ minute }}:{{ second }}.<span class="font-pink">{{
                millisecond
              }}</span></span
            >
          </div>
        </div>
      </template>
      <!-- v-else -->
      <template v-else>
        <div class="text-center">
          <h4 class="fs-1 mb-4">준비되셨나요?</h4>
          <BaseButton
            class="btn-primary btn-lg"
            :message="'Start'"
            @click="onQuizCount"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
