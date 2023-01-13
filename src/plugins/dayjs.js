import dayjs from "dayjs";

const dayjs = {
  install(app) {
    app.config.globalProperties.$dayjs = dayjs;
    app.provide("dayjs", dayjs);
  },
};

export { dayjs };
