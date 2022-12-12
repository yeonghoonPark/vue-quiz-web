import { defineStore } from "pinia";
import { ref } from "vue";

export const useKakaoStore = defineStore("kakao", () => {
  const access_token = ref(null);
  const account_email = ref(null);
  const profile_nickname = ref(null);

  const resetUserInfo = () => {
    access_token.value = null;
    account_email.value = null;
    profile_nickname.value = null;
  };

  const getUserInfo = () => {
    console.log("[getUserInfo]");
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        console.log(response, "response");

        account_email.value = response.kakao_account.email;
        console.log(response.kakao_account.email, "@@이메일");

        profile_nickname.value = response.properties?.nickname;
        console.log(response.properties.nickname, "@@닉네임");

        // 임시 로그인 alert
        alert(`${profile_nickname.value}님 로그인에 성공하였습니다.`);
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
      scope: "account_email profile_nickname",
      success: function (auth) {
        console.log(auth);
        console.log(auth.access_token, "auth.access_token");

        Kakao.Auth.setAccessToken(auth.access_token);
        console.log("setAccessToken", "setAccessToken");

        access_token.value = auth.access_token;

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
      resetUserInfo();
      console.log(`logout ok\nAccessToken = ${Kakao.Auth.getAccessToken()}`);

      // 임시 로그아웃 alert
      alert("로그아웃 되었습니다.");
    });
  };

  return {
    access_token,
    account_email,
    profile_nickname,
    loginWithKakao,
    logoutWithKakao,
  };
});
