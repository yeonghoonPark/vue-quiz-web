<script setup></script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink to="/">
          <img src="@/assets/images/logo.png" alt="logo" style="width: 120px" />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
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
            <button class="btn btn-outline-light" type="button" @click="">
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

<style scoped></style>
