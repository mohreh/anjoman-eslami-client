import axios from "axios";

export const news = {
  namespace: true,

  state: {
    news: {},
    singleNews: {},
    loading: true,
    succuess: false,
    error: "",
  },

  mutations: {
    setNews(state, { data, page, pagination }) {
      state.news[page] = { data, pagination };
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setSuccess(state, success) {
      state.success = success;
    },

    setSingleNews(state, { id, data }) {
      state.singleNews[id] = data;
    },
  },

  actions: {
    async fetchNews(ctx, options) {
      let { page, limit } = options;

      if (!page) page = 1;
      if (!limit) limit = 9;

      if (!ctx.state.news[page]) {
        ctx.commit("setNews", {
          data: [],
          page,
          pagination: {},
        });
      }

      if (ctx.state.news[page].data.length >= limit) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.get(
        `https://api-anjoman-eslami.onrender.com/api/v1/news?select=title,titleImage.url,titleImage.thumbnailUrl,createdAt&limit=${limit}&page=${page}&sort=-createdAt`,
      );

      const data = res.data;

      console.log("news");

      ctx.commit("setNews", {
        data: data.data,
        page,
        pagination: data.pagination,
      });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async fetchSingleNews(ctx, id) {
      if (ctx.state.singleNews[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.get(
        `https://api-anjoman-eslami.onrender.com/api/v1/news/${id}`,
      );

      const data = res.data;
      ctx.commit("setSingleNews", { data: data.data, id });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async updateNews(ctx, { id, title, body, createdAt }) {
      const allNews = ctx.state.singleNews;

      if (!title || !body || !id) return;

      if (!allNews[id]) {
        return;
      }

      if (!createdAt) createdAt = new Date(Date.now());

      ctx.commit("setLoading", true);

      const res = await axios.put(
        `https://api-anjoman-eslami.onrender.com/api/v1/news/${id}`,
        {
          title,
          body,
          createdAt,
        },
        {
          withCredentials: true,
        },
      );

      ctx.commit("setSingleNews", { data: res.data.data, id });
      ctx.commit("setLoading", false);
    },

    async deleteNews(ctx, id) {
      const allNews = ctx.state.singleNews;

      if (!allNews[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.delete(
        `https://api-anjoman-eslami.onrender.com/api/v1/news/${id}`,
        {
          withCredentials: true,
        },
      );

      console.log(res);

      delete allNews[id];
      ctx.commit("setLoading", false);
    },

    async uploadPhotoForNews(ctx, { id, fileData }) {
      const news = ctx.state.singleNews;
      if (!news[id]) {
        return;
      }

      if (!fileData || !id) {
        return;
      }

      ctx.commit("setLoading", true);

      const data = new FormData();
      data.append("file", fileData);

      const res = await axios.put(
        `https://api-anjoman-eslami.onrender.com/api/v1/news/${id}/photo`,
        data,
        {
          withCredentials: true,
          header: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      ctx.commit("setLoading", false);
      news[id].titleImage = res.data.data;
      ctx.commit("setSingleNews", { id, data: news[id] });
    },

    async addNews(ctx, { title, body, createdAt }) {
      if (!createdAt) createdAt = Date.now();

      if (!body || !title) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.post(
        `https://api-anjoman-eslami.onrender.com/api/v1/news`,
        { title, body, createdAt },
        { withCredentials: true },
      );

      ctx.commit("setLoading", false);
    },
  },
};
