import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "./alert";

export const useLoginStore = defineStore("login", () => {
  //#region state
  const router = useRouter();
  const alertStore = useAlertStore();
  const { onAlertContents } = alertStore;

  const access_token = ref(null);
  const account_email = ref(null);
  const profile_nickname = ref(null);

  const isLoginKakaoSuccess = ref(false);
  const isLogoutSuccess = ref(false);
  const isLoginSuccess = ref(false);

  const userId = ref(null);
  const userPassword = ref(null);
  const userNickname = ref(null);
  //#endregion state

  //#region function
  const resetUserInfo = () => {
    console.log("[resetUserInfo]");
    access_token.value = null;
    account_email.value = null;
    profile_nickname.value = null;
  };

  const getUserInfoWithKakao = () => {
    console.log("[getUserInfoWithKakao]");
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        // console.log(response, "response");
        isLoginKakaoSuccess.value = true;
        setTimeout(function () {
          router.push({ name: "HomeView" });
          isLoginKakaoSuccess.value = false;
          account_email.value = response.kakao_account.email;
          profile_nickname.value = response.properties?.nickname;
        }, 1000);
      },
      fail: function (error) {
        alert(
          `카카로 로그인에 실패했습니다. 관리자에게 문의하세요.
              ${JSON.stringify(error)}`,
        );
      },
    });
  };

  const onLoginWithKakao = () => {
    console.log("[onLoginWithKakao]");
    Kakao.Auth.loginForm({
      scope: "account_email profile_nickname",
      success: function (auth) {
        Kakao.Auth.setAccessToken(auth.access_token);
        access_token.value = auth.access_token;
        getUserInfoWithKakao();
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  const onLogoutWithKakao = () => {
    console.log("[onLogoutWithKakao]");
    if (access_token.value) {
      if (!Kakao.Auth.getAccessToken()) {
        return;
      }
      isLogoutSuccess.value = true;
      setTimeout(function () {
        Kakao.Auth.logout(function () {
          isLogoutSuccess.value = false;
          resetUserInfo();
        });
      }, 1000);
    } else {
      isLogoutSuccess.value = true;
      setTimeout(function () {
        isLogoutSuccess.value = false;
        resetUserInfo();
        router.push({ name: "HomeView" });
      }, 1000);
    }
  };

  const onLogin = () => {
    console.log("[onLogin]");
    if (!userId.value || !userPassword.value || !userNickname.value) {
      setTimeout(function () {}, 1000);
      onAlertContents();
    } else {
      isLoginSuccess.value = true;
      setTimeout(function () {
        account_email.value = userId.value;
        profile_nickname.value = userNickname.value;

        isLoginSuccess.value = false;
        router.go(-1);
        userId.value = null;
        userPassword.value = null;
        userNickname.value = null;
      }, 1000);
    }
  };
  //#endregion function

  return {
    access_token,
    account_email,
    profile_nickname,
    userId,
    userPassword,
    userNickname,
    isLoginSuccess,
    isLoginKakaoSuccess,
    isLogoutSuccess,
    onLogin,
    onLoginWithKakao,
    onLogoutWithKakao,
  };
});
