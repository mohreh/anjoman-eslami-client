<template>
  <div class="containter" dir="rtl" ref="container" v-if="route.path == '/talks'">
    <header-content />
    <div class="main">
      <h2>بایگانی اخبار دانشگاه و انجمن</h2>
      <div class="wrapper">
        <div class="news" v-for="talk in talks.data" v-if="talks">
          <router-link :to="`/talks/${talk._id}`">
            <div
              class="image"
              v-if="talk.persons[0].image"
              :style="`background-image: url('${talk.persons[0].image.url}')`"
            ></div>
            <div class="image-empty" v-else style="background: #a0a0a0"></div>

            <div class="text">
              <h3 class="title">{{ talk.title }}</h3>
            </div>
          </router-link>
        </div>
      </div>

      <pagination
        @pageChange="pageChange"
        loadFunc="fetchTalks"
        :limit="8"
        model="talks"
      />
      <create-talk v-if="role === 'admin'" />
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {
    Pagination: defineAsyncComponent(() => import("./Pagination.vue")),
    HeaderContent: defineAsyncComponent(() => import("./HeaderContent.vue")),
    CreateTalk: defineAsyncComponent(() => import("./CreateTalk.vue")),
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

    const talks = computed(() => store.state.talks.talks[page.value]);

    const role = computed(() => store.state.auth.userRole);

    const pageChange = (val) => {
      page.value = val;
      container.value.scrollTop = 0;
    };

    return {
      role,
      route,
      talks,
      pageChange,
      container,
    };
  },
};
</script>

<style scoped>
.containter {
  overflow-y: auto;
  height: 100%;
  scroll-behavior: smooth;
}

a {
  display: block;
}

.main {
  min-height: calc(100% - 10rem);
  width: 100%;
  font-size: 1.7rem;
  line-height: 1.9rem;
  padding: 1rem 4rem 1rem 4rem;
}

h2 {
  font-size: 2.4rem;
  margin: 0 3rem 3rem 3rem;
}

p,
h3 {
  display: inline !important;
  color: #fff;
}

.text {
  position: absolute;
  bottom: 0;
  padding: 1rem;
}

.date {
  margin-bottom: 5rem !important;
}

.wrapper {
  flex-basis: 100%;
  height: auto;
  display: grid;
}

.news {
  margin: 10px 10px;
  position: relative;
  display: inline-block; /* change the default display type to inline-block */
  overflow: hidden;
  cursor: pointer;
}

.news:hover .image {
  transform: scale(1.1);
}

.news:hover .image::after {
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
}

.image:after {
  position: absolute;
  content: "";
  height: 50%;
  width: 100%;
  transition: 0.3s;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 70%);
}

@media only screen and (max-width: 600px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }

  .main {
    padding: 1rem 2rem 1rem 2rem;
  }

  .image,
  .image-empty {
    width: 100% !important;
    height: 210px !important;
  }
}

@media only screen and (min-width: 600px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }

  .image,
  .image-empty {
    width: 100% !important;
    height: 300px !important;
    position: relative;
    transition: 0.5s;
  }
}

@media only screen and (min-width: 768px) {
  .image,
  .image-empty {
    height: 300px !important;
  }
}

@media only screen and (min-width: 992px) {
  .image,
  .image-empty {
    height: 450px !important;
  }
}

@media only screen and (min-width: 1200px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .image,
  .image-empty {
    height: 310px !important;
  }
}

@media only screen and (min-width: 1500px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .image,
  .image-empty {
    height: 500px !important;
  }
}
</style>
