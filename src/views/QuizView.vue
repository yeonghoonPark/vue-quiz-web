<script setup>
/* import */
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import { useRecordStore } from "@/stores/record";
import { useAlertStore } from "@/stores/alert";
import { storeToRefs } from "pinia";
import quizzes from "@/data/quizzes";
import ranking from "@/data/ranking";
import { computed } from "@vue/reactivity";

const recordStore = useRecordStore();
const loginStore = useLoginStore();
const alertStore = useAlertStore();

// loginStore's by pinia
const { access_token, account_email, profile_nickname } =
  storeToRefs(loginStore);

// recordStore's by pinia
const {
  startingPoint,
  minute,
  second,
  millisecond,
  correctAnswerNumber,
  timeTaken,
  alignedRankList,
} = storeToRefs(recordStore);
const { startTimeAttack, stopTimeAttack, resetTimer, getTimeTaken } =
  recordStore;

// alert's by pinia
const { isRightOrWrong } = storeToRefs(alertStore);
const { onAlertRightOrWrong } = alertStore;

const router = useRouter();

// 퀴즈 담는 어레이
const quizArray = ref([]);
const newQuizChildBoxes = ref([]);

// 문제 끝나고 기록이 나오는 알럿
const isRecordCard = ref(false);

// 로그인 없이 퀴즈 이용하는 경우 나오는 카드
const isLoginCard = ref(false);

// quiz시작 모달 부분관련
const isStartShow = ref(false);
const startCount = ref(3);
const countInterval = ref(null);

// alert 관련
const alertClassType = ref("");
const alertMessage = ref("");

// progress bar 관련
const progressCount = ref(0);

// ranking 관련
const newRankingItem = reactive({
  nickname: null,
  correctAnswerNumber: null,
  minute: null,
  second: null,
  millisecond: null,
});

const newRank = ref(null);

/* function */
const goLoginView = () => {
  console.log("[goLoginView]");
  router.push({ name: "LoginView" });
};

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
      pushNewRankingItem();
      computeNewRankingList();
      isRecordCard.value = true;
    }
  }, 1100);
};

const pushNewRankingItem = () => {
  console.log("[pushNewRankingItem]");
  newRankingItem.nickname = profile_nickname.value;
  newRankingItem.correctAnswerNumber = String(correctAnswerNumber.value);
  newRankingItem.minute = minute.value;
  newRankingItem.second = second.value;
  newRankingItem.millisecond = millisecond.value;
  ranking.push(newRankingItem);
};

const computeNewRankingList = () => {
  console.log("[computeNewRankingList]");
  alignedRankList.value = ranking.sort(function (a, b) {
    let aTimeTaken = a.minute + a.second + a.millisecond;
    let bTimeTaken = b.minute + b.second + b.millisecond;
    if (a.correctAnswerNumber === b.correctAnswerNumber) {
      return aTimeTaken - bTimeTaken;
    } else {
      return b.correctAnswerNumber - a.correctAnswerNumber;
    }
  });

  alignedRankList.value.forEach((item, index) => {
    if (
      item.nickname === profile_nickname.value &&
      item.correctAnswerNumber === String(correctAnswerNumber.value) &&
      item.minute === minute.value &&
      item.second === second.value &&
      item.millisecond === millisecond.value
    ) {
      newRank.value = index + 1;
    }
  });
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
    item.addEventListener(
      "click",
      () => {
        countCorrectAnswers(
          quizArray.value[index]?.multiple_choice_view1,
          quizArray.value[index]?.correct,
        );
        removeElement(newQuizChildBoxes.value[index]);
        progressCount.value++;
      },
      { once: true },
    );
    item.addEventListener("mouseup", onAlertRightOrWrong, {
      once: true,
    });
  });
  view2.forEach((item, index) => {
    item.addEventListener(
      "click",
      () => {
        countCorrectAnswers(
          quizArray.value[index]?.multiple_choice_view2,
          quizArray.value[index]?.correct,
        );
        removeElement(newQuizChildBoxes.value[index]);
        progressCount.value++;
      },
      { once: true },
    );
    item.addEventListener("mouseup", onAlertRightOrWrong, { once: true });
  });
  view3.forEach((item, index) => {
    item.addEventListener(
      "click",
      () => {
        countCorrectAnswers(
          quizArray.value[index]?.multiple_choice_view3,
          quizArray.value[index]?.correct,
        );
        removeElement(newQuizChildBoxes.value[index]);
        progressCount.value++;
      },
      { once: true },
    );
    item.addEventListener("mouseup", onAlertRightOrWrong, { once: true });
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
        <span class="
          multiple_choice_view1
          box-radius
          hover
          fs-5
          p-1
          px-2
          transition
          pointer
          user-select-none"
        >
          ① ${itemList?.multiple_choice_view1}
        </span>
      </li>
      <li class="my-2">
        <span class="
          multiple_choice_view2
          box-radius
          hover
          fs-5
          p-1
          px-2
          transition
          pointer
          user-select-none"
        >
          ② ${itemList.multiple_choice_view2}
        </span>
      </li>
      <li class="my-2">
        <span class="
          multiple_choice_view3
          box-radius
          hover
          fs-5
          p-1
          px-2
          transition
          pointer
          user-select-none"
        >
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
  if (!profile_nickname.value) {
    console.log("사용자 없음");
    isLoginCard.value = true;
  } else {
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
  }
};

const resetStates = () => {
  console.log("[resetStates]");
  isRecordCard.value = false;
  correctAnswerNumber.value = 0;
  progressCount.value = 0;
  stopTimeAttack();
  resetTimer();
};

onMounted(() => {
  console.log("[onMounted]");
});

onUnmounted(() => {
  console.log("[onUnmounted]");
  resetStates();
});
</script>

<template>
  <div id="QuizView" class="user-select-none">
    <!-- alert -->
    <Teleport to="#alert">
      <BaseAlert
        :isShow="isRightOrWrong"
        :classType="alertClassType"
        :message="alertMessage"
      />
      <div
        class="position-fixed w-100 h-100 top-50 start-50 translate-middle user-select-none"
        v-if="isStartShow"
        style="background-color: rgba(0, 0, 0, 0.3); z-index: 2000"
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

    <!-- card -->
    <Teleport to="#card">
      <!-- login-card -->
      <div
        v-if="isLoginCard"
        class="position-fixed top-0 start-0 w-100 h-100 user-select-none"
        style="z-index: 1"
      />
      <div
        v-if="isLoginCard"
        class="position-fixed top-50 start-50 translate-middle"
        style="z-index: 2"
      >
        <BaseCard class="text-center">
          <template #header>
            <h5 class="">알림</h5>
          </template>
          <h6 class="card-title p-2 mb-3">
            로그인 후 퀴즈이용이 가능합니다.
            <br />
            <br />
            로그인페이지로 이동하시겠습니까?
          </h6>
          <BaseButton
            class="btn-outline-primary me-3"
            :message="'확인'"
            @click="goLoginView"
          />
          <BaseButton
            class="btn-outline-danger"
            :message="'취소'"
            @click="isLoginCard = false"
          />
        </BaseCard>
      </div>

      <!-- record-card -->
      <div
        v-if="isRecordCard"
        class="position-fixed top-0 start-0 w-100 h-100 user-select-none"
        style="z-index: 1"
      />
      <div
        v-if="isRecordCard"
        class="position-fixed top-50 start-50 translate-middle"
        style="z-index: 2"
      >
        <BaseCard class="text-center user-select-none">
          <template #header>
            <h5 class="">
              {{ `'${profile_nickname}'님 ${returnText(correctAnswerNumber)}` }}
            </h5>
          </template>
          <h6 class="card-title p-2 mb-3">
            {{ `'${profile_nickname}'님의 결과` }}
          </h6>
          <p class="text-start">
            {{ `맞춘 갯수: ${correctAnswerNumber} 문제` }}
          </p>
          <p class="text-start">
            {{ `소요 시간: ${minute}:${second}.${millisecond}` }}
          </p>
          <p class="text-start">
            <template v-if="newRank < 11">
              {{ `순위: ${newRank}` }}
              <BaseButton
                v-if="newRank < 11"
                class="btn btn-outline-primary btn-sm"
                :message="'확인'"
                @click="router.push({ name: 'RankingView' }), resetStates()"
              />
            </template>
            <template v-else> 순위: 없음</template>
          </p>
          <BaseButton
            class="btn btn-outline-success"
            :message="'재도전'"
            @click="resetStates"
          />
        </BaseCard>
      </div>
    </Teleport>

    <!-- main -->
    <div
      id="quizBox"
      class="position-fixed top-50 start-50 translate-middle box p-4 z-0"
      style="max-width: 624px; min-width: 348px; margin: 0 auto"
    >
      <!-- v-if -->
      <template v-if="startingPoint">
        <h4 class="text-center fs-1 pb-2 mb-4">Quiz</h4>
        <div class="d-md-flex justify-content-between fs-6">
          <div class="mb-4">
            <span class="box p-2"
              >맞춘 갯수:
              <span class="font-pink">
                {{ correctAnswerNumber }}
              </span>
            </span>
          </div>
          <div class="mb-4">
            <span class="box p-2"
              >소요 시간:{{ minute }}:{{ second }}.<span class="font-pink"
                >{{ millisecond }}
              </span>
            </span>
          </div>
        </div>

        <!-- progress -->
        <div>
          <template v-if="progressCount == 0">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 0%"
              />
            </div>
          </template>
          <template v-if="progressCount == 1">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 10%"
              />
            </div>
          </template>
          <template v-if="progressCount == 2">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 20%"
              />
            </div>
          </template>
          <template v-if="progressCount == 3">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 30%"
              />
            </div>
          </template>
          <template v-if="progressCount == 4">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 40%"
              />
            </div>
          </template>
          <template v-if="progressCount == 5">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 50%"
              />
            </div>
          </template>
          <template v-if="progressCount == 6">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 60%"
              />
            </div>
          </template>
          <template v-if="progressCount == 7">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 70%"
              />
            </div>
          </template>
          <template v-if="progressCount == 8">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 80%"
              />
            </div>
          </template>
          <template v-if="progressCount == 9">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 90%"
              />
            </div>
          </template>
          <template v-if="progressCount == 10">
            <div class="progress mb-3" role="progressbar">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                style="width: 100%"
              />
            </div>
          </template>
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
