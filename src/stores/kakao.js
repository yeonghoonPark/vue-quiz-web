import { defineStore } from "pinia";

export const useKakaoStore = defineStore("kakao", {
  // ref
  state: () => ({
    test: 0,
  }),

  // computed
  getters: {},

  // method
  actions: {
    testFunction: function () {
      console.log(this.test, "testFunction by pinia");
    },
  },
});
