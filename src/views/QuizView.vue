<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { ref } from "vue";

const startingPoint = ref(0);
const minute = ref("00");
const second = ref("00");
const milisecond = ref("00");
const timerStart2 = ref();

let stTime = 0;
let timerStart;

let min;
let sec;
let milisec;

const addZero = (number) => {
  return number < 10 ? "0" + number : "" + number;
};

const testStart2 = () => {
  console.log("[testStart2]");
  if (startingPoint.value === 0) {
    startingPoint.value = Date.now();
    console.log(startingPoint.value, "[startPoint.value]");
  } else {
    console.log(startingPoint.value, "[startPoint.value] is not zero");
  }

  timerStart2.value = setInterval(function () {
    let currentPoint = new Date(Date.now() - startingPoint.value);
    minute.value = addZero(currentPoint.getMinutes());
    second.value = addZero(currentPoint.getSeconds());
    milisecond.value = addZero(Math.floor(currentPoint.getMilliseconds() / 10));
  }, 1);
};

const testStop2 = () => {
  console.log("[testStop2]");
  clearInterval(timerStart2.value);
};

const testReset2 = () => {
  console.log("[testReset2]");
  startingPoint.value = 0;
  minute.value = "00";
  second.value = "00";
  milisecond.value = "00";
};

// const testStart = () => {
//   console.log("[testStart]");

//   if (!stTime) {
//     stTime = Date.now();
//     console.log(stTime);
//   }

//   timerStart = setInterval(function () {
//     let nowTime = new Date(Date.now() - stTime);

//     min = addZero(nowTime.getMinutes());
//     sec = addZero(nowTime.getSeconds());
//     milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10));

//     document.getElementById("postTestMin").innerText = min;
//     document.getElementById("postTestSec").innerText = sec;
//     document.getElementById("postTestMilisec").innerText = milisec;
//   }, 1);
// };

// const testStop = () => {
//   console.log("[testStop]");
//   clearInterval(timerStart);
// };

// const testReset = () => {
//   console.log("[testReset]");
//   stTime = 0;
//   min = 0;
//   sec = 0;
//   milisec = 0;
//   document.getElementById("postTestMin").innerText = "00";
//   document.getElementById("postTestSec").innerText = "00";
//   document.getElementById("postTestMilisec").innerText = "00";
// };
</script>

<template>
  <div id="QuizView">
    <BaseButton class="btn-primary btn-lg" :message="'Quiz'" @click="" />

    <hr />
    <span id="postTestMin">{{ minute }}</span>
    <span>:</span>
    <span id="postTestSec">{{ second }}</span>
    <span>.</span>
    <span id="postTestMilisec">{{ milisecond }}</span>
    <hr />

    <button class="btn btn-primary btn-sm me-2" @click="testStart2">
      Start
    </button>
    <button class="btn btn-primary btn-sm me-2" @click="testStop2">Stop</button>
    <button class="btn btn-primary btn-sm" @click="testReset2">Reset</button>
  </div>
</template>
