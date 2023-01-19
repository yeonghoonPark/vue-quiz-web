import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "./alert";

export const useLoginStore = defineStore("login", () => {
  const router = useRouter();
  const alertStore = useAlertStore();
  const { onAlertContents } = alertStore;

  const access_token = ref(null);
  const account_email = ref(null);
  const profile_nickname = ref(null);

  const isLoginKakaoSuccess = ref(false);
  const isLogoutSuccess = ref(false);
  const isLoginSuccess = ref(false);
  const isBlock = ref(false);

  const userId = ref(null);
  const userPassword = ref(null);
  const userNickname = ref(null);

  // 임시 profile_nickname
  // profile_nickname.value = "임시회원임시회원임시회원임시회원";

  const resetUserInfo = () => {
    access_token.value = null;
    account_email.value = null;
    profile_nickname.value = null;
  };

  const getUserInfoWithKakao = () => {
    console.log("[getUserInfoWithKakao]");
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        console.log(response, "response");
        isLoginKakaoSuccess.value = true;
        setTimeout(function () {
          router.push({ name: "HomeView" });
          isLoginKakaoSuccess.value = false;

          account_email.value = response.kakao_account.email;
          console.log(response.kakao_account.email, "@@이메일");
          profile_nickname.value = response.properties?.nickname;
          console.log(response.properties.nickname, "@@닉네임");
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
        console.log(auth);
        console.log(auth.access_token, "auth.access_token");

        Kakao.Auth.setAccessToken(auth.access_token);
        console.log("setAccessToken", "setAccessToken");

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
        console.log("Not logged in.");
        return;
      }

      isLogoutSuccess.value = true;
      setTimeout(function () {
        Kakao.Auth.logout(function () {
          isLogoutSuccess.value = false;
          resetUserInfo();
          console.log(
            `logout ok\nAccessToken = ${Kakao.Auth.getAccessToken()}`,
          );
        });
      }, 1000);
    } else {
      isLogoutSuccess.value = true;
      setTimeout(function () {
        isLogoutSuccess.value = false;
        resetUserInfo();
      }, 1000);
    }
  };

  const onLogin = () => {
    console.log("[onLogin]");

    if (!userId.value || !userPassword.value || !userNickname.value) {
      isBlock.value = true;
      setTimeout(function () {
        isBlock.value = false;
      }, 1000);
      onAlertContents();
    } else {
      isBlock.value = true;
      isLoginSuccess.value = true;
      setTimeout(function () {
        account_email.value = userId.value;
        profile_nickname.value = userNickname.value;
        isBlock.value = false;
        isLoginSuccess.value = false;
        router.push({ name: "HomeView" });
        userId.value = null;
        userPassword.value = null;
        userNickname.value = null;
      }, 1000);
    }
  };

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
    isBlock,
    onLogin,
    onLoginWithKakao,
    onLogoutWithKakao,
  };
});
