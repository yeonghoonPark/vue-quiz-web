<script setup></script>

<template>
  <div class="test">
    <main class="px-4 pt-3" style="margin-top: 68px">
      <div class="container-xxl">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.test {
  width: auto;
  height: calc(100vh - 68px);
  /* background: url(@/assets/images/test04.png); */
}
</style>
