<template>
  <div
    class="container"
    dir="rtl"
    ref="container"
    v-if="route.path == '/statements'"
  >
    <header-content />

    <div class="main">
      <h3>مواضع و بیانیه‌ها</h3>
      <div class="wrapper">
        <div
          class="statement"
          v-for="statement in statements.data.slice(0, 12)"
          v-if="statements"
        >
          <div class="crumbs">
            <p class="text-date">
              {{
                new Date(statement.createdAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
            <p
              class="new text-date"
              v-if="new Date(statement.createdAt) > recent"
            >
              جدید
            </p>
          </div>
          <router-link
            :to="`/statements/${statement._id}`"
            class="title text-hover"
            >{{ statement.title }}</router-link
          >
        </div>
      </div>

      <pagination
        @pageChange="pageChange"
        loadFunc="fetchStatements"
        :limit="12"
        model="statements"
      />

      <create-statement v-if="role === 'admin'" />
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import { computed, ref, watch, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {
    Pagination: defineAsyncComponent(() => import("./Pagination.vue")),
    HeaderContent: defineAsyncComponent(() => import("./HeaderContent.vue")),
    CreateStatement: defineAsyncComponent(() =>
      import("./CreateStatement.vue")
    ),
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const page = ref(1);
    const container = ref("container");

    watch(
      () => route.path,
      (newPath) => {
        if (newPath == "/") return;

        page.value = 1;
      },
      {
        immediate: true,
      }
    );

    const statements = computed(
      () => store.state.statements.statements[page.value]
    );

    const pageChange = (val) => {
      page.value = val;
      container.value.scrollTop = 0;
    };

    const now = new Date(Date.now());
    now.setMonth(now.getMonth() - 3);

    const recent = ref(now);

    const role = computed(() => store.state.auth.userRole);

    return {
      statements,
      recent,
      route,
      container,
      pageChange,
      role,
    };
  },
};
</script>

<style scoped>
.container {
  overflow-y: auto;
  height: auto;
  font-size: 1.7rem;
  line-height: 2.5rem;
  scroll-behavior: smooth;
}

.main {
  padding: 1rem 6rem 0 6rem;
  position: relative;
}

.crumbs {
  display: flex;
  flex-direction: row;
}

.wrapper {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-bottom: 1rem;
}

.new {
  color: #fcf8f3;
  background: #214252;
  opacity: 0.5;
  padding: 0 0.5rem;
  margin-right: 2rem;
  font-size: 1.2rem;
  border-radius: 10px;
}

.main > h3 {
  font-size: 2rem;
  padding-bottom: 4rem;
}

.title {
  text-align: right;
  font-weight: bold;
  padding-top: 0.5rem;
  font-size: 1.6rem;
  line-height: 2.2rem;
}

@media only screen and (max-width: 600px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media only screen and (min-width: 600px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media only screen and (min-width: 768px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 992px) {
  .wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1200px) {
  .wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
