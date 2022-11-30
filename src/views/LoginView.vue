<script setup>
import BaseButton from "../components/base/BaseButton.vue";

// 2a420577808d1110c6e68c1149d212af
window.Kakao.init("2a420577808d1110c6e68c1149d212af");

const kakaoLogin = () => {
  window.Kakao.Auth.login({
    scope: "profile_nickname, account_email, gender",
    success: function (authObj) {
      console.log(authObj, "authObj");
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account, "kakao_account");
        },
      });
    },
  });
};
</script>

<template>
  <div id="LoginView">
    <BaseButton
      class="btn btn-warning btn-sm"
      :message="'Kakao Login'"
      @click="kakaoLogin"
    />
  </div>
</template>
