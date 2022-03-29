<template>
  <div class="news">
    <h3>اخبار دانشگاه و انجمن</h3>
    <div class="news-wrapper" v-if="news">
      <div
        v-for="n in news.data.slice(0, limit)"
        class="text-hover"
        @click="goToNews(n._id)"
      >
        <div>
          <p class="text-date">
            {{
              new Date(n.createdAt).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </p>
          <p>{{ n.title }}</p>
        </div>

        <div
          class="image"
          :alt="n.title"
          v-if="n.titleImage"
          :style="`background-image: url('${n.titleImage.thumbnailUrl}')`"
        ></div>
      </div>
    </div>
    <router-link class="archive" to="/news">بایگانی اخبار</router-link>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: {
    limit: {
      type: Number,
      default: 6,
    },
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();

    const news = computed(() => store.state.news.news[1]);

    const goToNews = (id) => {
      router.replace(`/news/${id}`);
    };

    return {
      news,
      goToNews,
      limit: props.limit,
    };
  },
};
</script>

<style scoped>
.news {
  background: #e8e8e8;
  width: 100%;
  padding-bottom: 0.7rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.news > h3 {
  padding: 0rem 1rem 2rem 1rem;
}

.text-date {
  padding-bottom: 0.5rem;
}

.news-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
}

.news-wrapper > div {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.news-wrapper > div p {
  text-align: right;
}

.news-wrapper > div > .image {
  display: inline-block;
  background-color: #fff;
}

@media only screen and (max-width: 600px) {
  .news {
    width: 100%;
    background: inherit;
  }

  .news > h3 {
    padding: 0 0 2rem 1rem;
  }

  .news-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    max-width: 100%;
    width: auto;
    height: auto;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  .news-wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .news-wrapper > div {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    border-radius: 5px;
    display: flex;
    padding: 3rem;
    padding-bottom: 1rem;
    width: 19rem;
    white-space: normal;
    flex-direction: column;
    flex: 0 0 auto;
    justify-content: flex-start;
    text-align: justify;
    margin: 1rem 0.5rem 1rem 1.5rem;
    height: auto;
    overflow-y: none;
    position: relative;
  }

  .news-wrapper > div > .image {
    margin-top: 1rem;
    position: relative;
    bottom: 0;
    width: 120px;
    height: 120px;
    min-width: 63px;
    min-height: 63px;
  }

  .news > h3 {
    display: inline;
    margin-right: 1rem;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 2rem;
  }
}

@media only screen and (min-width: 600px) {
  .news {
    width: 100%;
    background: inherit;
  }

  .news > h3 {
    padding: 0 0 2rem 1rem;
  }

  .news-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    max-width: 100%;
    width: auto;
    height: auto;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  .news-wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .news-wrapper > div {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    border-radius: 5px;
    display: flex;
    padding: 3rem;
    padding-bottom: 1rem;
    width: 19rem;
    white-space: normal;
    flex-direction: column;
    flex: 0 0 auto;
    justify-content: flex-start;
    text-align: justify;
    margin: 1rem 0.5rem 1rem 1.5rem;
    height: auto;
    overflow-y: none;
    position: relative;
  }

  .news-wrapper > div > .image {
    margin-top: 1rem;
    position: relative;
    bottom: 0;
    width: 120px;
    height: 120px;
    min-width: 63px;
    min-height: 63px;
  }

  .news > h3 {
    display: inline;
    margin-right: 1rem;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 2rem;
  }
}

@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 992px) {
  .news {
    background: #e8e8e8;
  }

  .news-wrapper {
    scroll-behavior: smooth;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
  }

  .news {
    font-size: 1.3rem;
    line-height: 1.6rem;
    padding: 1.7rem 1.5rem;
  }

  .news-wrapper > div p {
    padding-left: 10px;
  }

  .news-wrapper > div {
    margin: 0;
    margin-bottom: 0.95rem;
    box-shadow: none;
    background: inherit;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .news-wrapper > div > .image {
    width: 63px;
    height: 63px;
    min-width: 63px;
    min-height: 63px;
  }

  .news-wrapper > div:last-child {
    padding-bottom: 0;
    width: 100%;
    padding-left: 0;
  }

  .archive {
    font-size: 1.2rem;
    margin-left: 0;
  }
}

@media only screen and (min-width: 1220px) {
  .news {
    font-size: 1.4rem;
    line-height: 1.8rem;
    padding: 2rem 1.7rem;
  }

  .news-wrapper > div p {
    padding-left: 20px;
  }
  .news-wrapper > div > .image {
    width: 75px;
    height: 75px;
    min-width: 75px;
    min-height: 75px;
  }

  .news-wrapper > div:last-child {
    padding-bottom: 0;
    display: none;
  }
}
</style>
