import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alert", () => {
  // alert boolean type var
  const isRightOrWrong = ref(false);
  const isNonArticleType = ref(false);
  const isNonContents = ref(false);
  const isWrightSuccess = ref(false);
  const isDeleteSuccess = ref(false);
  const isEditMismatch = ref(false);
  const isDeleteMismatch = ref(false);

  // options value
  const chitchat = ref(null);
  const request = ref(null);

  // const onAlert = (a) => {
  //   a = true;
  //   console.log(isNonContents.value);
  //   setTimeout(function () {
  //     a = false;
  //     console.log(a);
  //     console.log(isNonContents.value);
  //   }, 1500);
  // };

  const onAlertRightOrWrong = () => {
    console.log("[onAlertRightOrWrong]");
    isRightOrWrong.value = true;
    setTimeout(function () {
      isRightOrWrong.value = false;
    }, 800);
  };

  const onAlertArticleType = () => {
    console.log("[onAlertArticleType]");
    isNonArticleType.value = true;
    setTimeout(function () {
      isNonArticleType.value = false;
    }, 1500);
  };

  const onAlertContents = () => {
    console.log("[onAlertContents]");
    isNonContents.value = true;
    setTimeout(function () {
      isNonContents.value = false;
    }, 1500);
  };

  return {
    isRightOrWrong,
    isNonArticleType,
    isNonContents,
    isWrightSuccess,
    isDeleteSuccess,
    isEditMismatch,
    isDeleteMismatch,
    chitchat,
    request,
    onAlertRightOrWrong,
    onAlertArticleType,
    onAlertContents,
  };
});
