import axios from "axios";

export const aboutFields = {
  namespace: true,

  state: {
    fields: [],
    loading: false,
    succuess: false,
    errors: {},
  },

  mutations: {
    setFields(state, data) {
      state.fields = data;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setSuccess(state, success) {
      state.success = success;
    },

    setError(state, { key, err }) {
      state.errors[key] = err;
    },
  },

  actions: {
    async fetchDataForAbout(ctx) {
      if (ctx.state.fields.length) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.get(
        "http://localhost:5000/api/v1/about?sort=-index",
        {
          withCredentials: true,
        }
      );
      const data = res.data;

      console.log("news");

      ctx.commit("setFields", data.data);
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async deleteAboutField(ctx, id) {
      const fields = ctx.state.fields;
      const field = fields.find((field) => field._id == id);

      if (!field) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.delete(
        `http://localhost:5000/api/v1/about/${id}`,
        { withCredentials: true }
      );

      const updatedFields = fields.filter((x) => x !== field);
      ctx.commit("setFields", updatedFields);

      ctx.commit("setLoading", false);
    },

    async updateAboutField(ctx, { id, title, body, index }) {
      if (!index) index = 1;

      if (!body || !title || !id) {
        return { errors: [""] };
      }

      ctx.commit("setLoading", true);

      const res = await axios.put(
        `http://localhost:5000/api/v1/about/${id}`,
        { title, body, index },
        {
          withCredentials: true,
        }
      );

      const fields = ctx.state.fields;
      const field = fields.find((field) => field._id == id);

      fields[fields.indexOf(field)] = res.data.data;
      ctx.commit("setFields", fields);
      ctx.commit("setLoading", false);
    },

    async addAboutField(ctx, { title, body, index }) {
      if (!index) index = 1;

      if (!body || !title) {
        return { errors: [""] };
      }

      ctx.commit("setLoading", true);

      const res = await axios.post(
        `http://localhost:5000/api/v1/about`,
        { title, body, index },
        {
          withCredentials: true,
        }
      );

      const fields = ctx.state.fields;
      fields.push(res.data.data);

      fields.sort((a, b) => -(a.index - b.index));
      ctx.commit("setFields", fields);

      ctx.commit("setLoading", false);
    },
  },
};
