import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";

const requireData = (to, from, next) => {
  next();
};

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "root",
      path: "/",
      component: Home,
      children: [
        {
          name: "news",
          path: "/news",
          component: () =>
            import(
              /* webpackChunkName: "allNews" */ "../components/NewsPage.vue"
            ),
          children: [
            {
              name: "singleNews",
              path: ":id",
              component: () =>
                import(
                  /* webpackChunkName: "news" */ "../components/SingleNews.vue"
                ),
            },
          ],
        },

        {
          name: "statements",
          path: "/statements",
          component: () =>
            import(
              /* webpackChunkName: "statments" */ "../components/StatementsPage.vue"
            ),
          children: [
            {
              name: "statement",
              path: ":id",
              component: () =>
                import(
                  /* webpackChunkName: "statment" */ "../components/StatementPage.vue"
                ),
            },
          ],
        },

        {
          name: "talks",
          path: "/talks",
          component: () =>
            import(
              /* webpackChunkName: "talks" */ "../components/TalksPage.vue"
            ),
          children: [
            {
              name: "talk",
              path: ":id",
              component: () =>
                import(
                  /* webpackChunkName: "talk" */ "../components/TalkPage.vue"
                ),
            },
          ],
        },

        {
          name: "events",
          path: "/events",
          component: () =>
            import(
              /* webpackChunkName: "events" */ "../components/EventsPage.vue"
            ),
          children: [
            {
              name: "event",
              path: ":id",
              component: () =>
                import(
                  /* webpackChunkName: "event" */ "../components/EventPage.vue"
                ),
            },
          ],
        },
      ],
    },

    {
      name: "login",
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../components/Login.vue"),
      beforeEnter: requireData,
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});
