import { defineStore } from "pinia";

export const useKakaoStore = defineStore("kakao", {
  // ref
  state: () => ({
    access_token: null,
    account_email: null,
    gender: null,
    profile_nickname: null,
  }),

  // computed
  getters: {},

  // method
  actions: {
    getUserInfo: function () {
      console.log("[getUserInfo]");
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (response) {
          console.log(response, "response");
        },
        fail: function (error) {
          alert(
            `카카로 로그인에 실패했습니다. 관리자에게 문의하세요.
            ${JSON.stringify(error)}`,
          );
        },
      });
    },

    loginWithKakao: function () {
      console.log("[loginWithKakao]");
      Kakao.Auth.loginForm({
        scope: "account_email gender profile_nickname",
        success: function (auth) {
          console.log(auth, "@@auth");
          console.log(auth.access_token, "@@auth.access_token");

          Kakao.Auth.setAccessToken(auth.access_token);

          this.access_token = auth.access_token;
          console.log(this.access_token, "@@this.ACCESS_TOKEN");

          Kakao.API.request({
            url: "/v2/user/me",
            success: function (response) {
              console.log(response, "response");
            },
            fail: function (error) {
              alert(
                `카카로 로그인에 실패했습니다. 관리자에게 문의하세요.
                ${JSON.stringify(error)}`,
              );
            },
          });
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },

    logoutWithKakao: function () {
      console.log("[logoutWithKakao]");

      if (!Kakao.Auth.getAccessToken()) {
        console.log("Not logged in.");
        return;
      }

      Kakao.Auth.logout(function () {
        // this.ACCESS_TOKEN = null;
        console.log(`logout ok\nAccessToken = ${Kakao.Auth.getAccessToken()}`);
      });
    },
  },
});
