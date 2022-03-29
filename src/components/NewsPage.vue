<template>
  <div class="containter" dir="rtl" ref="container" v-if="route.path == '/news'">
    <header-content />
    <div class="main">
      <h2>بایگانی اخبار دانشگاه و انجمن</h2>
      <div class="wrapper">
        <div class="news" v-for="news in allNews.data" v-if="allNews">
          <router-link :to="`/news/${news._id}`">
            <div
              class="image"
              v-if="news.titleImage"
              :style="`background-image: url('${news.titleImage.url}')`"
            ></div>
            <div class="image-empty" v-else style="background: #a0a0a0"></div>

            <div class="text">
              <p class="text-date">
                {{
                  new Date(news.createdAt).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </p>
              <br />
              <h3 class="title">{{ news.title }}</h3>
            </div>
          </router-link>
        </div>
      </div>

      <pagination @pageChange="pageChange" loadFunc="fetchNews" :limit="9" model="news" />

      <create-news v-if="role === 'admin'" />
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
    CreateNews: defineAsyncComponent(() => import("./CreateNews.vue")),
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

    const allNews = computed(() => store.state.news.news[page.value]);

    const pageChange = (val) => {
      page.value = val;
      container.value.scrollTop = 0;
    };

    const role = computed(() => store.state.auth.userRole);

    return {
      route,
      role,
      allNews,
      pageChange,
      container,
    };
  },
};
</script>

<style scoped>
.containter {
  overflow-y: auto;
  height: auto;
  scroll-behavior: smooth;
}

a {
  display: block;
}

.main {
  min-height: 100%;
  font-size: 1.7rem;
  line-height: 1.9rem;
  padding: 1rem 4rem 1rem 4rem;
}

h2 {
  font-size: 2.2rem;
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

.image,
.image-empty {
  width: 100% !important;
  height: 310px !important;
  position: relative;
  transition: 0.5s;
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
  .image,
  .image-empty {
    width: 100% !important;
    height: 250px !important;
    position: relative;
    transition: 0.5s;
  }
}

@media only screen and (min-width: 992px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  h2 {
    font-size: 2rem;
    margin: 0 3rem 3rem 3rem;
  }
}

@media only screen and (min-width: 1200px) {
  .wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
