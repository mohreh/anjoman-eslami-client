<template>
  <div class="container" dir="rtl" @scroll="fixSide">
    <header-content />
    <div class="main" ref="main" v-if="statement && statements">
      <div class="content">
        <h1 class="title">{{ statement.title }}</h1>
        <div
          class="text"
          ref="text"
          v-html="statement.body"
          v-show="statement"
        ></div>
        <access-statement-data v-if="role === 'admin'" :data="statement" />
      </div>

      <div id="statements-field" ref="side">
        <h4>بیانیه‌های اخیر</h4>
        <div v-for="statement in statements.data.slice(0, 5)" class="statement">
          <div v-if="statement._id !== route.params.id">
            <p class="text-date">
              {{
                new Date(statement.createdAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
            <router-link
              :to="`/statements/${statement._id}`"
              class="text-hover"
              >{{ statement.title }}</router-link
            >
          </div>
        </div>
      </div>

      {{ setTopOfSide() }}
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import HeaderContent from "./HeaderContent.vue";

export default {
  components: {
    HeaderContent,
    AccessStatementData: defineAsyncComponent(() =>
      import("./AccessStatementData.vue")
    ),
    // AdminstorPostData: defineAsyncComponent(() =>
    //  import("./AdminstorPostData.vue")
    // ),
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const main = ref("main");
    const side = ref("side");

    watch(
      () => route.params.id,
      (id) => {
        if (id) store.dispatch("fetchStatement", id);
      },
      {
        immediate: true,
      }
    );

    watch(
      () => route.path,
      () => {
        main.value.parentNode.scrollTop = 0;
      }
    );

    store.dispatch("fetchStatements", { limit: 5 });

    const statement = computed(
      () => store.state.statements.singleStatements[route.params.id]
    );
    const statements = computed(() => store.state.statements.statements[1]);

    const setTopOfSide = (image) => {
      if (main.value == "main" || side.value == "side") return;
      if (!statement.value || !statements.value) return;

      setTimeout(() => {
        side.value.style.top = `calc(${
          main.value.querySelector(".text p").getBoundingClientRect().y
        }px - 10rem)`;
        side.value.style.marginTop = "0px";
      }, 10);
    };

    let i = 0;
    const fixSide = () => {
      if (main.value === "main" || side.value === "side") return;

      let width;
      if (!i) {
        i = 1;
        width = side.value.getBoundingClientRect().width;
      }

      if (!main.value) {
        return;
      }

      if (main.value.parentNode.scrollTop > 225) {
        if (!main.value) {
          return;
        }

        side.value.style.marginTop = `calc(${main.value.parentNode.scrollTop}px - 14rem)`;
      }
    };

    const role = computed(() => store.state.auth.userRole);

    return {
      role,
      side,
      main,
      statement,
      statements,
      setTopOfSide,
      fixSide,
      route,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  line-height: 2.5rem;
}

.main {
  display: flex;
  flex-direction: row;
  position: relative;
}

#statements-field {
  position: absolute;
  left: 0;
  width: 20%;
  transition: marginTop 0.5s;
}

.title {
  font-size: 2.1rem;
  text-align: right;
  padding: 0 6rem 2rem 6rem;
  text-align: center;
}

.text-date {
  padding-bottom: 0.6rem;
  font-size: 1.3rem;
}

#statements-field > h4 {
  padding-bottom: 2rem;
}

.statement > div {
  margin: 0 0 1.5rem 0;
}

.statement a,
#statements-field h4 {
  font-size: 1.58rem !important;
  line-height: 1.7rem;
  font-weight: bold;
}

#statements-field > h4 {
  font-size: 1.75rem;
}

.text {
  padding-top: 1.5rem;
  font-size: 1.6rem;
  text-align: justify;
  line-height: 2.7rem;
}

.text::v-deep(*) {
  margin-bottom: 2rem;
}

@media only screen and (max-width: 600px) {
  .main {
    margin: 1rem 1rem;
  }

  .title {
    font-size: 1.9rem;
  }

  .title {
    font-size: 1.9rem;
    text-align: right;
    padding: 0 2rem 2rem 2rem;
    text-align: center;
  }

  .content {
    width: 100%;
    padding-right: 0;
    padding-bottom: 4rem;
  }

  #statements-field {
    display: none;
  }
}

@media only screen and (min-width: 600px) {
  .main {
    margin: 1rem 1rem;
  }

  #statements-field {
    display: none;
  }

  .title {
    font-size: 2rem;
    text-align: right;
    padding: 0 4rem 2rem 4rem;
    text-align: center;
  }

  .content {
    width: 90%;
    margin: auto;
    padding-bottom: 4rem;
  }
}

@media only screen and (min-width: 768px) {
  .main {
    margin: 2rem;
  }

  .content {
    width: 100%;
    padding-right: 0;
    padding-left: 2rem;
  }

  #statements-field {
    display: none;
  }

  .title {
    font-size: 1.9rem;
  }
}

@media only screen and (min-width: 992px) {
  .main {
    margin: 2rem;
  }

  .content {
    width: 90%;
    padding-right: 3rem;
  }
}

@media only screen and (min-width: 1200px) {
  .main {
    margin: 2rem 4rem;
    margin-right: 0;
  }

  .content {
    width: 72%;
    margin: 0;
    padding-right: 7rem;
  }

  #statements-field {
    display: block;
  }

  .title {
    font-size: 2rem;
  }
}
</style>
