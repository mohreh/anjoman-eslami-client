import axios from "axios";

export const talks = {
  namespace: true,

  state: {
    talks: {},
    singleTalks: {},
    loading: true,
    success: true,
    error: "",
  },

  mutations: {
    setTalks(state, { data, page, pagination }) {
      state.talks[page] = { data, pagination };
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSuccess(state, success) {
      state.success = success;
    },
    setSingleTalk(state, { id, data }) {
      state.singleTalks[id] = data;
    },
  },

  actions: {
    async fetchTalks(ctx, options) {
      console.log("talks");

      let { page, limit } = options;

      if (!page) page = 1;
      if (!limit) limit = 10;

      if (!ctx.state.talks[page]) {
        ctx.commit("setTalks", {
          data: [],
          page,
          pagination: {},
        });
      }

      if (ctx.state.talks[page].data.length >= limit) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.get(
        `https://api-anjoman-eslami.runflare.run/api/v1/talks?limit=${limit}&page=${page}&sort=-createdAt&select=title,persons.image.url`
      );
      const data = res.data;

      console.log(data.data);

      ctx.commit("setTalks", {
        data: data.data,
        page,
        pagination: data.pagination,
      });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async fetchTalk(ctx, id) {
      if (ctx.state.singleTalks[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.get(
        `https://api-anjoman-eslami.runflare.run/api/v1/talks/${id}`
      );

      const data = res.data;
      ctx.commit("setSingleTalk", { data: data.data, id });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async updateTalk(
      ctx,
      { id, body, title, description, persons, createdAt }
    ) {
      const talk = ctx.state.singleTalks;

      if (!talk[id]) {
        return;
      }

      console.log(id);

      if (!createdAt) createdAt = new Date(Date.now());

      ctx.commit("setLoading", true);

      const res = await axios.put(
        `https://api-anjoman-eslami.runflare.run/api/v1/talks/${id}`,
        {
          title,
          description,
          persons,
          body,
          createdAt,
        },
        {
          withCredentials: true,
        }
      );

      talks[id] = res.data.data;
      ctx.commit("setSingleTalk", { data: talks[id], id });
      ctx.commit("setLoading", false);
    },

    async addTalk(ctx, { body, title, description, persons, createdAt }) {
      if (!createdAt) createdAt = new Date(Date.now());

      if (!body || !title || !description || !persons || !createdAt) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.post(
        `https://api-anjoman-eslami.runflare.run/api/v1/talks`,
        {
          title,
          description,
          persons,
          body,
          createdAt,
        },
        {
          withCredentials: true,
        }
      );

      ctx.commit("setSingleTalk", {
        data: res.data.data,
        id: res.data.data._id,
      });
      ctx.commit("setLoading", false);
    },

    async uploadPhotoForTalk(ctx, { fileData, index, id }) {
      const talks = ctx.state.singleTalks;
      if (!talks[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const data = new FormData();
      data.append("file", fileData);
      data.append("index", index);

      const res = await axios.put(
        `https://api-anjoman-eslami.runflare.run/api/v1/talks/${id}/photo`,
        data,
        {
          withCredentials: true,
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      ctx.commit("setLoading", false);
    },

    async deleteTalk(ctx, id) {
      const talks = ctx.state.singleTalks;
      if (!talks[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.delete(
        `https://api-anjoman-eslami.runflare.run/api/v1/talks/${id}`,
        {
          withCredentials: true,
        }
      );

      ctx.commit("setLoading", false);
      delete talks[id];
    },
  },
};
