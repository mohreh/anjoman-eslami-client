import axios from "axios";

export const statements = {
  namespace: true,

  state: {
    statements: {},
    singleStatements: {},
    loading: true,
    success: true,
    error: "",
  },

  mutations: {
    setStatements(state, { data, page, pagination }) {
      state.statements[page] = { data: data, pagination: pagination };
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSuccess(state, success) {
      state.success = success;
    },
    setSingleStatement(state, { data, id }) {
      state.singleStatements[id] = data;
    },
  },

  actions: {
    async fetchStatements(ctx, options) {
      let { page, limit } = options;

      ctx.commit("setLoading", true);

      if (!page) page = 1;
      if (!limit) limit = 9;

      if (!ctx.state.statements[page]) {
        ctx.commit("setStatements", {
          data: [],
          page,
          pagination: {},
        });
      }

      if (ctx.state.statements[page].data.length >= limit) {
        return;
      }

      const res = await axios.get(
        `https://api-anjoman-eslami.runflare.run/api/v1/statements?limit=${limit}&page=${page}&sort=-createdAt&select=createdAt,title`
      );
      const data = res.data;

      ctx.commit("setStatements", {
        data: data.data,
        pagination: data.pagination,
        page,
      });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async fetchStatement(ctx, id) {
      if (ctx.state.singleStatements[id]) {
        return;
      }
      ctx.commit("setLoading", true);

      const res = await axios.get(
        `https://api-anjoman-eslami.runflare.run/api/v1/statements/${id}`
      );

      const data = res.data;

      ctx.commit("setSingleStatement", { data: data.data, id });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async updateStatement(ctx, { id, title, body, createdAt }) {
      if (!createdAt) createdAt = new Date(Date.now());

      if (!body || !title) {
        return { errors: [""] };
      }

      ctx.commit("setLoading", true);

      const res = await axios.put(
        `https://api-anjoman-eslami.runflare.run/api/v1/statements/${id}`,
        { title, body, createdAt },
        {
          withCredentials: true,
        }
      );

      ctx.commit("setSingleStatement", { data: res.data.data, id });
      ctx.commit("setLoading", false);
    },

    async deleteStatement(ctx, id) {
      const statements = ctx.state.singleStatements;
      if (!statements[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.delete(
        `https://api-anjoman-eslami.runflare.run/api/v1/statements/${id}`,
        {
          withCredentials: true,
        }
      );

      delete statements[id];
      ctx.commit("setStatements", statements);
      ctx.commit("setLoading", false);
    },

    async addStatement(ctx, { title, body, createdAt }) {
      if (!createdAt) createdAt = Date.now();

      if (!title || !body) return;

      ctx.commit("setLoading", true);

      const res = await axios.post(
        `https://api-anjoman-eslami.runflare.run/api/v1/statements`,
        { title, body, createdAt },
        {
          withCredentials: true,
        }
      );

      ctx.commit("setLoading", false);
    },
  },
};
