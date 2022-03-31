import axios from "axios";

export const events = {
  namespace: true,

  state: {
    events: {},
    singleEvent: {},
    loading: true,
    success: true,
    error: "",
  },

  mutations: {
    setEvents(state, { data, page, pagination }) {
      state.events[page] = { data, pagination };
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSuccess(state, success) {
      state.success = success;
    },

    setSingleEvent(state, { id, data }) {
      state.singleEvent[id] = data;
    },
  },

  actions: {
    async fetchEvents(ctx, options) {
      let { page, limit } = options;

      if (!page) page = 1;
      if (!limit) limit = 9;

      if (!ctx.state.events[page]) {
        ctx.commit("setEvents", {
          data: [],
          page,
          pagination: {},
        });
      }

      ctx.commit("setLoading", true);

      if (ctx.state.events[page].data.length === limit) {
        return;
      }

      const res = await axios.get(
        `https://api-anjoman-eslami.runflare.run/api/v1/events?limit=${limit}&page=${page}&sort=-createdAt&select=title,titleImage,createdAt,startDate,endDate,status`
      );
      const data = res.data;

      console.log("news");

      ctx.commit("setEvents", {
        data: data.data,
        page,
        pagination: data.pagination,
      });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async fetchEvent(ctx, id) {
      if (ctx.state.singleEvent[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.get(
        `https://api-anjoman-eslami.runflare.run/api/v1/events/${id}`
      );
      const data = res.data;

      ctx.commit("setSingleEvent", {
        data: data.data,
        id,
      });
      ctx.commit("setLoading", false);
      ctx.commit("setSuccess", true);
    },

    async updateEvent(
      ctx,
      { id, createdAt, title, body, startDate, endDate, status }
    ) {
      const events = ctx.state.singleEvent;

      if (!events[id]) {
        return;
      }

      if (!status) status = "inprograss";

      if (!createdAt) createdAt = Date.now();

      if (!title || !body || !startDate || !endDate || !id) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.put(
        `https://api-anjoman-eslami.runflare.run/api/v1/events/${id}`,
        {
          title,
          body,
          startDate,
          endDate,
          createdAt,
          status,
        },
        { withCredentials: true }
      );

      ctx.commit("setLoading", false);
      ctx.commit("setSingleEvent", { id, data: res.data.data });
    },

    async deleteEvent(ctx, id) {
      const events = ctx.state.singleEvent;
      if (!events[id]) {
        return;
      }

      ctx.commit("setLoading", true);

      const res = await axios.delete(
        `https://api-anjoman-eslami.runflare.run/api/v1/events/${id}`,
        { withCredentials: true }
      );

      delete events[id];
      ctx.commit("setEvents", events);
      ctx.commit("setLoading", false);
    },

    async uploadPhotoForEvent(ctx, { fileData, id }) {
      const events = ctx.state.singleEvent;
      if (!events[id]) {
        return;
      }

      if (!fileData || !id) {
        return;
      }

      ctx.commit("setLoading", true);

      const data = new FormData();
      data.append("file", fileData);

      const res = await axios.put(
        `https://api-anjoman-eslami.runflare.run/api/v1/events/${id}/photo`,
        data,
        {
          withCredentials: true,
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      ctx.commit("setLoading", false);
      events[id].titleImage = res.data.data;
      ctx.commit("setSingleEvent", { id, data: events[id] });
    },

    async addEvent(
      ctx,
      { title, body, createdAt, startDate, endDate, status }
    ) {
      if (!status) status = "inprograss";
      if (!createdAt) createdAt = new Date(Date.now());

      if (!title || !body || !startDate || !endDate) {
        console.log("bye");

        return;
      }

      console.log("hiii");

      ctx.commit("setLoading", true);

      const res = await axios.post(
        `https://api-anjoman-eslami.runflare.run/api/v1/events`,
        {
          title,
          body,
          startDate,
          endDate,
          createdAt,
          status,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res);
      ctx.commit("setLoading", false);
      ctx.commit("setSingleEvent", {
        id: res.data.data._id,
        data: res.data.data,
      });
    },
  },
};
