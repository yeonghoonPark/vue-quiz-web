import { defineStore } from "pinia";
import { ref } from "vue";

export const useRecordStore = defineStore("record", () => {
  //#region state
  const startingPoint = ref(null);
  const minute = ref("00");
  const second = ref("00");
  const millisecond = ref("00");
  const timerInterval = ref(null);

  const alignedRankList = ref(null);

  const correctAnswerNumber = ref(0);

  const timeTaken = ref(null);
  //#endregion state

  //#region function
  /**
   * 매개변수가 10보다 작을 경우 앞자리에 "0"을 추가하여 두자리를 만드는 함수
   * @param {number} number
   * @returns {string}
   */
  const addZero = (number) => (number < 10 ? "0" + number : "" + number);

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

  const startTimeAttack = () => {
    console.log("[startTimeAttack]");
    startingPoint.value = startingPoint.value ?? Date.now();
    startTimerInterval();
  };

  const stopTimeAttack = () => {
    console.log("[stopTimeAttack]");
    clearInterval(timerInterval.value);
  };

  const resetTimer = () => {
    console.log("[resetTimer]");
    startingPoint.value = null;
    minute.value = "00";
    second.value = "00";
    millisecond.value = "00";
    correctAnswerNumber.value = 0;
    timeTaken.value = null;
  };

  const getTimeTaken = () => {
    console.log("[getTimeTaken]");
    timeTaken.value = `${minute.value}:${second.value}.${millisecond.value}`;
  };
  //#endregion function

  return {
    startingPoint,
    minute,
    second,
    millisecond,
    correctAnswerNumber,
    timeTaken,
    alignedRankList,
    startTimeAttack,
    stopTimeAttack,
    resetTimer,
    getTimeTaken,
  };
});
