<script setup>
import IconHamburger from "@/components/icons/IconHamburger.vue";
</script>

<template>
  <header>
    <nav
      class="navbar navbar-expand-md navbar-dark bg-dark bg-gradient px-4 py-1"
    >
      <div class="container-xxl">
        <RouterLink to="/" class="pe-3">
          <img src="@/assets/images/logo.png" alt="logo" style="width: 120px" />
        </RouterLink>
        <button
          class="navbar-toggler px-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
          aria-expanded="true"
          style="border: none"
        >
          <span class="db-navbar-toggler">
            <IconHamburger />
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink
                to="/quiz"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Quiz</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/ranking"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Ranking</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/notice"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Notice</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to=""
                class="nav-link"
                active-class="none"
                aria-current="page"
                >Help</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <button
              class="btn btn-md btn-outline-light my-2"
              type="button"
              @click=""
            >
              <RouterLink
                to="/login"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Login</RouterLink
              >
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
img {
  transition: var(--base-transition);
}
img:hover {
  transform: rotate(-5deg);
}
</style>
