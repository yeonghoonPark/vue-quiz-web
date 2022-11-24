<script setup></script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink
          to="/"
          class="navbar-brand"
          active-class="active"
          aria-current="page"
          >임시로고</RouterLink
        >
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
                to="/"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Quiz</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/about"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Ranking</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/posts"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Notice</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/nested"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Help</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <button class="btn btn-outline-light" type="button" @click="">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
