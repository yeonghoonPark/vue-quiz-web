import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";

import "../public/assets/css/common.css";
import "../public/assets/css/reset.css";
import dayjs from "dayjs";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(dayjs);

app.mount("#app");
