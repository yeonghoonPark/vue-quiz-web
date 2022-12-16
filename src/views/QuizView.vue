<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { ref } from "vue";

let stTime = 0;
let timerStart;

let min;
let sec;
let milisec;

const addZero = (number) => {
  return number < 10 ? "0" + number : "" + number;
};

const testStart = () => {
  console.log("[testStart]");

  if (!stTime) {
    stTime = Date.now();
    console.log(stTime);
  }

  timerStart = setInterval(function () {
    let nowTime = new Date(Date.now() - stTime);

    min = addZero(nowTime.getMinutes());
    sec = addZero(nowTime.getSeconds());
    milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10));

    document.getElementById("postTestMin").innerText = min;
    document.getElementById("postTestSec").innerText = sec;
    document.getElementById("postTestMilisec").innerText = milisec;
  }, 1);
};

const testStop = () => {
  console.log("[testStop]");
  clearInterval(timerStart);
};

const testReset = () => {
  console.log("[testReset]");
  stTime = 0;
  min = 0;
  sec = 0;
  milisec = 0;
  document.getElementById("postTestMin").innerText = "00";
  document.getElementById("postTestSec").innerText = "00";
  document.getElementById("postTestMilisec").innerText = "00";
};
</script>

<template>
  <div id="QuizView">
    <BaseButton class="btn-primary btn-lg" :message="'Quiz'" @click="" />

    <hr />
    <span id="postTestMin">00</span>
    <span>:</span>
    <span id="postTestSec">00</span>
    <span>.</span>
    <span id="postTestMilisec">00</span>
    <hr />

    <button class="btn btn-primary btn-sm me-2" @click="testStart">
      Start
    </button>
    <button class="btn btn-primary btn-sm me-2" @click="testStop">Stop</button>
    <button class="btn btn-primary btn-sm" @click="testReset">Reset</button>
  </div>
</template>
