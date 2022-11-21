<script setup></script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Quiz</a>
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
                >Home</RouterLink
              >
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            </li>
            <li class="nav-item">
              <RouterLink
                to="/about"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >About</RouterLink
              >
              <!-- <a class="nav-link" href="#">About</a> -->
            </li>
            <li class="nav-item">
              <RouterLink
                to="/posts"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Post</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                to="/nested"
                class="nav-link"
                active-class="active"
                aria-current="page"
                >Nested</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <button
              class="btn btn-outline-light"
              type="button"
              @click="goPagePostsCreate"
            >
              Write
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
