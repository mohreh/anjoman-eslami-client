<template>
  <div class="container" dir="rtl" @scroll="fixSide">
    <header-content />
    <div class="main" ref="main">
      <div class="content" v-if="news">
        <h1 class="title">{{ news.title }}</h1>
        <p class="text-date">
          {{
            new Date(news.createdAt).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <div class="text" ref="text" v-html="news.body" v-show="news"></div>
        <div v-if="news.titleImage" v-show="false">
          {{ addImage(news.titleImage) }}
        </div>
        <upload-photo-news v-if="role === 'admin'" :data="news" />
        <access-news-data v-if="role === 'admin'" :data="news" />
      </div>
      <news-field id="news-field" :limit="5" ref="side" />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    HeaderContent: defineAsyncComponent(() => import("./HeaderContent.vue")),
    NewsField: defineAsyncComponent(() => import("./NewsField.vue")),
    AccessNewsData: defineAsyncComponent(() => import("./AccessNewsData.vue")),
    UploadPhotoNews: defineAsyncComponent(() => import("./UploadPhotoNews.vue")),
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const firstTime = ref(true);
    const main = ref("main");
    const side = ref("side");

    watch(
      () => route.params.id,
      (id) => {
        firstTime.value = true;
        if (id) store.dispatch("fetchSingleNews", id);
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

    store.dispatch("fetchNews", { limit: 5 });

    const news = computed(() => store.state.news.singleNews[route.params.id]);

    const addImage = (image) => {
      if (main.value == "main") return;

      if (!firstTime.value) {
        return;
      }

      if (!news.value) return;
      firstTime.value = false;
      const div = document.createElement("div");
      div.style.backgroundImage = `url('${image.url}')`;
      div.className = "image";

      setTimeout(() => {
        const width = parseInt(
          getComputedStyle(main.value.querySelector(".content")).width
        );
        div.style.height = (width * image.height) / image.width + "px";
        const firstP = main.value.querySelector(".text p");
        main.value.querySelector(".text").insertBefore(div, firstP.nextSibling);

        side.value.$el.style.top = `calc(${
          main.value.querySelector(".text p").getBoundingClientRect().y
        }px - 10rem - 60px)`;
        side.value.$el.style.marginTop = "0px";
      }, 10);
    };

    let i = 0;
    const fixSide = () => {
      if (main.value === "main" || side.value === "side") return;

      let width;
      if (!i) {
        i = 1;
        width = side.value.$el.getBoundingClientRect().width;
      }

      if (!main.value) {
        return;
      }

      if (main.value.parentNode.scrollTop > 180) {
        if (!main.value) {
          return;
        }

        side.value.$el.style.marginTop = `calc(${main.value.parentNode.scrollTop}px - 10rem - 20px)`;
      }
    };

    const role = computed(() => store.state.auth.userRole);

    return {
      news,
      main,
      side,
      fixSide,
      addImage,
      role,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  line-height: 2.7rem;
  font-size: 1.6rem;
  overflow-y: auto;
  height: 100%;
}

#news-field {
  width: 34%;
  position: absolute;
  left: 0;
  transition: top 0.5s;
}

.main {
  display: flex;
  flex-direction: row;
  position: relative;
}

.content {
  width: 60%;
}

.title {
  font-size: 2.1rem;
  text-align: right;
  padding-bottom: 2rem;
}

.text {
  padding-top: 1rem;
  font-size: 1.6rem;
  text-align: justify;
  line-height: 2.7rem;
}

.text::v-deep(*) {
  margin-bottom: 2rem;
}

.image {
  width: 100% !important;
  display: block;
}

@media only screen and (max-width: 600px) {
  .main {
    margin: 1rem 1rem;
  }

  .title {
    font-size: 1.9rem;
  }

  .content {
    width: 100%;
    padding-right: 0;
    padding-bottom: 4rem;
  }

  #news-field {
    display: none;
  }

  .content {
    width: 90%;
    margin: auto;
  }
}

@media only screen and (min-width: 600px) {
  .main {
    margin: 1rem 1rem;
  }

  .content {
    width: 100%;
    padding-right: 0;
    padding-bottom: 4rem;
  }

  #news-field {
    display: none;
  }

  .content {
    width: 90%;
    margin: auto;
  }
}

@media only screen and (min-width: 768px) {
  .main {
    margin: 1rem 1rem;
  }

  .content {
    width: 100%;
    padding-right: 0;
  }

  #news-field {
    display: none;
  }

  .content {
    width: 90%;
    margin: auto;
  }
}

@media only screen and (min-width: 992px) {
  .main {
    margin: 1rem 2rem;
  }

  .content {
    width: 75%;
  }
}

@media only screen and (min-width: 1200px) {
  .main {
    margin: 2rem 4rem;
  }

  #news-field {
    display: block;
  }

  .content {
    width: 60%;
    margin: 0;
  }
}
</style>
