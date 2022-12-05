import { defineStore } from "pinia";
import { ref } from "vue";
Kakao.init("2a420577808d1110c6e68c1149d212af");

export const useKakaoStore = defineStore("kakao", () => {
  const access_token = ref(null);
  const account_email = ref(null);
  const gender = ref(null);
  const profile_nickname = ref(null);

  const getUserInfo = () => {
    console.log("[getUserInfo]");
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        console.log(response, "response");

        account_email.value = response.kakao_account.email;
        console.log(response.kakao_account.email, "@@이메일");
      },
      fail: function (error) {
        alert(
          `카카로 로그인에 실패했습니다. 관리자에게 문의하세요.
              ${JSON.stringify(error)}`,
        );
      },
    });
  };

  const loginWithKakao = () => {
    console.log("[loginWithKakao]");

    Kakao.Auth.loginForm({
      scope: "account_email gender profile_nickname",
      success: function (auth) {
        console.log(auth);
        console.log(auth.access_token, "auth.access_token");

        Kakao.Auth.setAccessToken(auth.access_token);
        console.log("setAccessToken", "setAccessToken");

        access_token.value = auth.access_token;
        // ACCESS_TOKEN.value = auth.access_token;
        // console.log(ACCESS_TOKEN.value, "ACCESS_TOKEN.value");

        getUserInfo();
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  const logoutWithKakao = () => {
    console.log("[logoutWithKakao]");

    if (!Kakao.Auth.getAccessToken()) {
      console.log("Not logged in.");
      return;
    }

    Kakao.Auth.logout(function () {
      access_token.value = null;
      console.log(`logout ok\nAccessToken = ${Kakao.Auth.getAccessToken()}`);
    });
  };

  return {
    access_token,
    account_email,
    gender,
    profile_nickname,
    loginWithKakao,
    logoutWithKakao,
  };

  // /* ref */
  // state: () => ({
  //   access_token: null,
  //   account_email: null,
  //   gender: null,
  //   profile_nickname: null,
  // }),

  // /* computed */
  // getters: {},

  // /* method */
  // actions: {
  //   getUserInfo: function () {
  //     console.log("[getUserInfo]");
  //     Kakao.API.request({
  //       url: "/v2/user/me",
  //       success: function (response) {
  //         console.log(response, "response");
  //       },
  //       fail: function (error) {
  //         alert(
  //           `카카로 로그인에 실패했습니다. 관리자에게 문의하세요.
  //           ${JSON.stringify(error)}`,
  //         );
  //       },
  //     });
  //   },

  //   loginWithKakao: function () {
  //     console.log("[loginWithKakao]");
  //     Kakao.Auth.loginForm({
  //       scope: "account_email gender profile_nickname",
  //       success: function (auth) {
  //         console.log(auth, "@@auth");
  //         console.log(auth.access_token, "@@auth.access_token");

  //         Kakao.Auth.setAccessToken(auth.access_token);

  //         this.access_token = auth.access_token;
  //         console.log(this.access_token, "@@this.ACCESS_TOKEN");

  //         Kakao.API.request({
  //           url: "/v2/user/me",
  //           success: function (response) {
  //             console.log(response, "response");
  //             console.log(access_token.value, "디스");
  //           },
  //           fail: function (error) {
  //             alert(
  //               `카카로 로그인에 실패했습니다. 관리자에게 문의하세요.
  //               ${JSON.stringify(error)}`,
  //             );
  //           },
  //         });
  //       },
  //       fail: function (error) {
  //         console.log(error);
  //       },
  //     });
  //   },

  //   logoutWithKakao: function () {
  //     console.log("[logoutWithKakao]");

  //     if (!Kakao.Auth.getAccessToken()) {
  //       console.log("Not logged in.");
  //       return;
  //     }

  //     Kakao.Auth.logout(function () {
  //       // this.ACCESS_TOKEN = null;
  //       console.log(`logout ok\nAccessToken = ${Kakao.Auth.getAccessToken()}`);
  //     });
  //   },
  // },
});
