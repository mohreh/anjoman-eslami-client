<template>
  <div class="main">
    <h3>گفتگو</h3>
    <div class="wrapper" v-if="talks">
      <div v-for="talk in talks.data.slice(0, limit)" class="text-hover">
        <router-link :to="`/talks/${talk._id}`">
          <div
            class="image"
            v-if="talk.persons[0].image"
            :style="`background-image: url('${talk.persons[0].image.url}')`"
          ></div>
          <h4 class="title">{{ talk.title }}</h4>
        </router-link>
      </div>
    </div>
    <router-link to="/talks" class="archive">بایگانی گفتگوها</router-link>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: {
    limit: {
      type: Number,
      default: 3,
    },
  },

  setup() {
    const store = useStore();

    const loading = computed(() => store.state.statements.loading);
    const talks = computed(() => store.state.talks.talks[1]);

    return {
      talks,
      loading,
    };
  },
};
</script>

<style scoped>
h3 {
  padding: 1.5rem 0 1rem 0;
}

.wrapper {
  display: flex;
  flex-direction: row;
  overflow: none;
  height: 100%;
}

.wrapper > div {
  height: 100%;
  width: 100%;
  max-width: 35%;
}

a {
  height: auto;
  width: 100%;
}

.title {
  text-align: right;
  padding-top: 1rem;
}

.image {
  height: 150px;
}

.archive {
  padding-top: 1rem;
}

@media only screen and (max-width: 600px) {
  .wrapper {
    flex-wrap: nowrap;
    position: relative;
    width: auto;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
    height: auto;
  }

  .wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .wrapper > div {
    border-radius: 5px;
    margin: 1rem 0.5rem 1rem 1.5rem;
    display: flex;
    white-space: normal;
    width: 18rem;
    max-width: 18rem;
    flex-direction: column;
    flex: 0 0 auto;
    margin-left: 1rem;
    text-align: justify;
    height: auto;
    overflow-y: none;
  }

  .wrapper > div:last-child {
    width: 21rem;
    padding-left: 3rem;
    max-width: 21rem;
  }

  h3 {
    margin-right: 1rem;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 2rem;
  }

  .image {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    height: 180px;
  }
}

@media only screen and (min-width: 600px) {
  .wrapper {
    flex-wrap: nowrap;
    position: relative;
    width: auto;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
    height: auto;
  }

  .wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  h3 {
    margin-right: 1rem;
  }

  .wrapper > div {
    border-radius: 5px;
    margin: 1rem 0.5rem 1rem 1.5rem;
    display: flex;
    white-space: normal;
    width: 18rem;
    max-width: 18rem;
    flex-direction: column;
    flex: 0 0 auto;
    margin-left: 1rem;
    text-align: justify;
    height: auto;
    overflow-y: none;
  }

  .wrapper > div:last-child {
    width: 21rem;
    padding-left: 3rem;
    max-width: 21rem;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 2rem;
  }

  .image {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    height: 180px;
  }
}

@media only screen and (min-width: 768px) {
  .wrapper {
    flex-wrap: nowrap;
    position: relative;
    width: auto;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  .wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .wrapper > div {
    border-radius: 5px;
    margin: 1rem 0.5rem 1rem 1.5rem;
    display: flex;
    white-space: normal;
    width: 18rem;
    max-width: 18rem;
    flex-direction: column;
    flex: 0 0 auto;
    margin-left: 1rem;
    text-align: justify;
    height: auto;
    overflow-y: none;
  }

  .wrapper > div:last-child {
    width: 21rem;
    padding-left: 3rem;
    max-width: 21rem;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 2rem;
  }

  .image {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    height: 180px;
  }
}

@media only screen and (min-width: 992px) {
  h3 {
    font-size: 1.5rem;
    padding-bottom: 1.8rem;
  }

  .image {
    height: 100px;
  }

  .wrapper {
    grid-gap: 1.2rem;
    justify-content: none;
    height: auto;
  }

  .title {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }

  .wrapper > div {
    width: 100%;
    max-width: 45%;
    flex: auto;
    margin-left: 0;
    margin: 0;
    padding: 0;
  }

  .archive {
    margin-left: 0;
  }

  .wrapper > div:last-child {
    display: none;
    width: 100%;
    padding-left: 0;
    max-width: 100%;
  }
}

@media only screen and (min-width: 1050px) {
  h3 {
    font-size: 1.6rem;
    padding: 1rem 0;
  }

  .image {
    height: 110px;
  }

  .title {
    font-size: 1.5rem;
    padding-top: 0.5rem;
    line-height: 2rem;
  }

  .wrapper {
    grid-gap: 2rem;
    width: 100%;
    max-width: 100%;
  }

  .wrapper > div {
    width: 100%;
    max-width: 33%;
    margin: 0;
    padding: 0;
  }

  .wrapper > div:last-child {
    display: block;
  }
}

@media only screen and (min-width: 1200) {
  h3 {
    font-size: 1.7rem;
    padding: 1rem 0;
  }
  .image {
    height: 120px;
  }

  .wrapper {
    grid-gap: 1.5rem;
  }

  .wrapper > div {
    margin: 0;
    padding: 0;
  }

  .title {
    font-size: 1.7rem;
    line-height: 2.1rem;
  }
}

@media only screen and (min-width: 1290px) {
  h3 {
    font-size: 2rem;
    padding: 2rem 0;
  }

  .image {
    height: 130px;
  }

  .wrapper {
    grid-gap: 1.6rem;
  }

  .wrapper > div {
    margin: 0;
    padding: 0;
  }

  .title {
    font-size: 1.7rem;
    line-height: 2.1rem;
  }
}
</style>
