<script setup></script>

<template>
  <main
    id="main"
    class="px-4 pt-3"
    style="color: var(--color-font); margin-top: 68px"
  >
    <div class="container-xxl">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
#main {
  /* width: auto; */
  /* height: calc(100vh - 68px); */
  /* background: url(@/assets/images/test04.png); */
}
</style>
