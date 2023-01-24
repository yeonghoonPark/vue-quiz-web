<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseLabel from "@/components/base/BaseLabel.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseAlert from "@/components/base/BaseAlert.vue";
import { onMounted } from "vue";
import { useLoginStore } from "@/stores/login.js";
import { useAlertStore } from "@/stores/alert.js";
import { storeToRefs } from "pinia";

//#region state
const loginStore = useLoginStore();
const {
  userId,
  userPassword,
  userNickname,
  isLoginSuccess,
  isLoginKakaoSuccess,
} = storeToRefs(loginStore);
const { onLogin, onLoginWithKakao } = loginStore;

const alertStore = useAlertStore();
const { isNonContents } = storeToRefs(alertStore);
//#endregion state

onMounted(() => {
  console.log("[onMounted]");
  const userIdInput = document.getElementById("userId");
  userIdInput.focus();
});
</script>

<template>
  <div id="LoginView" class="py-4">
    <!-- alert -->
    <Teleport to="#alert">
      <BaseAlert
        :isShow="isNonContents"
        :classType="'alert-dark'"
        :message="'빈칸 없이 입력해주세요.'"
      />
      <BaseAlert
        :isShow="isLoginSuccess"
        :classType="'alert-primary'"
        :message="`로그인에 성공하였습니다.`"
      />
      <BaseAlert
        :isShow="isLoginKakaoSuccess"
        :classType="'alert-warning'"
        :message="`카카오로그인에 성공하였습니다.`"
      />
    </Teleport>

    <!-- title -->
    <h1 class="text-center mb-5">로그인</h1>

    <!-- form -->
    <form class="container mb-5 pt-5">
      <div class="row align-items-center py-2 mb-1">
        <div class="col-3 text-center">
          <BaseLabel class="" :labelFor="'userId'" :labelMessage="'아이디'" />
        </div>
        <div class="col-9 w-50">
          <BaseInput
            class=""
            :type="'email'"
            :id="'userId'"
            maxlength="35"
            placeholder="이메일 또는 아이디를 입력해주세요"
            :value="userId"
            v-model:inputValue="userId"
          />
        </div>
      </div>
      <hr />
      <div class="row align-items-center py-2 mb-1">
        <div class="col-3 text-center">
          <BaseLabel
            class=""
            :labelFor="'userPassword'"
            :labelMessage="'비밀번호'"
          />
        </div>
        <div class="col-9 w-50">
          <BaseInput
            class=""
            :type="'password'"
            :id="'userPassword'"
            placeholder="비밀번호를 입력해주세요"
            :value="userPassword"
            v-model:inputValue="userPassword"
          />
        </div>
      </div>
      <hr />
      <div class="row align-items-center py-2 mb-1">
        <div class="col-3 text-center">
          <BaseLabel
            class=""
            :labelFor="'userNickname'"
            :labelMessage="'닉네임'"
          />
        </div>
        <div class="col-9 w-50">
          <BaseInput
            class=""
            :id="'userNickname'"
            maxlength="16"
            placeholder="닉네임을 입력해주세요"
            :value="userNickname"
            v-model:inputValue="userNickname"
          />
        </div>
      </div>
    </form>

    <!-- button-group -->
    <div class="container d-flex flex-column align-items-center">
      <BaseButton
        style="width: 30%"
        class="btn-primary mb-3"
        :message="'로그인'"
        @click="onLogin"
      />
      <BaseButton
        style="width: 30%"
        class="kakao mb-3"
        :message="'카카오'"
        @click="onLoginWithKakao"
      />
    </div>
  </div>
</template>
