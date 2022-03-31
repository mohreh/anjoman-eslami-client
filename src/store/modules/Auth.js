import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";

export const auth = {
  namespace: true,

  state: {
    token: localStorage.getItem("token"),
    currentUser: localStorage.getItem("currentUser"),
    userRole: localStorage.getItem("userRole"),
    loading: false,
  },

  mutations: {
    setAuthVal(state, { key, value }) {
      const now = new Date();

      const item = {
        value: value,
        expiry: now.getTime() + 2592000000,
      };

      console.log(item);

      localStorage.setItem(key, JSON.stringify(item));
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setRole(state, val) {
      localStorage.setItem("userRole", val);
    },
  },

  getters: {
    getAuthVal(ctx, key) {
      const itemStr = localStorage.getItem(key);

      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    },
  },

  actions: {
    async login(ctx, credential) {
      const { email, password } = credential;
      ctx.commit("setLoading", true);

      const tokenRes = await axios.post(
        "https://api-anjoman-eslami.runflare.run/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      const currentUserRes = await axios.get(
        "https://api-anjoman-eslami.runflare.run/api/v1/auth/me",
        { withCredentials: true }
      );

      ctx.commit("setAuthVal", { key: "token", value: tokenRes.data.token });
      ctx.commit("setAuthVal", {
        key: "currentUser",
        value: currentUserRes.data.data,
      });
      ctx.commit("setLoading", false);

      ctx.commit("setRole", currentUserRes.data.data.role);
    },

    async logout(ctx) {
      ctx.commit("setLoading", true);

      await axios.get(
        "https://api-anjoman-eslami.runflare.run/api/v1/auth/logout",
        {
          withCredentials: true,
        }
      );

      localStorage.clear();

      ctx.commit("setLoading", false);
    },
  },
};
