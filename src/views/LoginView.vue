<script setup>
import { onMounted, ref, watch } from "vue";
import { useKakaoStore } from "@/stores/kakao";
import { storeToRefs } from "pinia";
import BaseButton from "@/components/base/BaseButton.vue";

// 토큰 state, 차후 pinia state로 변경
// const ACCESS_TOKEN = ref(null);

const store = useKakaoStore();

// store's state
const { access_token } = storeToRefs(store);

// store's method
const { loginWithKakao, logoutWithKakao } = store;

// const getUserInfo = () => {
//   console.log("[getUserInfo]");
//   Kakao.API.request({
//     url: "/v2/user/me",
//     success: function (response) {
//       console.log(response, "response");
//     },
//     fail: function (error) {
//       alert(
//         `카카로 로그인에 실패했습니다. 관리자에게 문의하세요.
//         ${JSON.stringify(error)}`,
//       );
//     },
//   });
// };

// const loginWithKakao = () => {
//   console.log("[loginWithKakao]");
//   Kakao.Auth.loginForm({
//     success: function (auth) {
//       console.log(auth);
//       console.log(auth.access_token, "auth.access_token");

//       Kakao.Auth.setAccessToken(auth.access_token);
//       console.log("setAccessToken", "setAccessToken");

//       ACCESS_TOKEN.value = auth.access_token;
//       console.log(ACCESS_TOKEN.value, "ACCESS_TOKEN.value");

//       getUserInfo();
//     },
//     fail: function (error) {
//       console.log(error);
//     },
//   });
// };

// const logoutWithKakao = () => {
//   console.log("[logoutWithKakao]");
//   if (!Kakao.Auth.getAccessToken()) {
//     console.log("Not logged in.");
//     return;
//   }
//   Kakao.Auth.logout(function () {
//     ACCESS_TOKEN.value = null;
//     console.log(`logout ok\nAccessToken = ${Kakao.Auth.getAccessToken()}`);
//   });
// };

onMounted(() => {
  console.log(access_token.value, "밸류");
});
</script>

<template>
  <div id="LoginView">
    <BaseButton
      class="btn btn-warning btn-sm"
      :message="'Kakao Login'"
      @click="loginWithKakao"
    />

    <BaseButton
      class="btn btn-primary btn-sm"
      :message="'Logout'"
      @click="logoutWithKakao"
    />
  </div>
</template>
