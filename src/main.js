import { createApp, createSSRApp } from "vue";
import cors from "cors";
import App from "./App.vue";
import { store } from "./store/store";
import { VueCookieNext } from "vue-cookie-next";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { router } from "./router/router";
import "./index.css";

const app = createSSRApp(App);

app.use(cors);
app.use(VueCookieNext);
app.use(CKEditor);
app.use(store);
app.use(router);

app.mount("#app");
