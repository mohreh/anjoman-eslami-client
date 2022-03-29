<template>
  <div class="container" dir="rtl">
    <header-content />
    <div class="main separate-line" ref="main" v-if="talk">
      <div class="content">
        <h1 class="title">{{ talk.title }}</h1>
        <p class="text-date">
          {{
            new Date(talk.createdAt).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <div class="description" ref="text" v-html="talk.description"></div>
        <div class="text" v-html="talk.body" v-show="talk"></div>
      </div>

      <div id="persons-field" ref="side">
        <div v-for="person in talk.persons" class="person">
          <div
            class="image"
            v-if="person.image"
            :style="`background-image: url('${person.image.url}')`"
          ></div>
          <h4>معرفی ‌{{ person.name }}</h4>
          <div class="text" v-html="person.introduce"></div>
        </div>
      </div>

      {{ setTopOfSide() }}

      <upload-photo-talk :persons="talk.persons" :id="talk._id" v-if="role === 'admin'" />

      <access-talk-data :data="talk" v-if="role === 'admin'" />
    </div>
    <talks-field id="talks-field" v-if="talk" :limit="4" />
  </div>
</template>

<script>
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    HeaderContent: defineAsyncComponent(() => import("./HeaderContent.vue")),
    TalksField: defineAsyncComponent(() => import("./TalksField.vue")),
    AccessTalkData: defineAsyncComponent(() => import("./AccessTalkData.vue")),
    UploadPhotoTalk: defineAsyncComponent(() => import("./UploadPhotoTalk.vue")),
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const main = ref("main");
    const side = ref("side");

    watch(
      () => route.params.id,
      (id) => {
        if (id) store.dispatch("fetchTalk", id);
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

    store.dispatch("fetchTalks", { limit: 4 });

    const talk = computed(() => store.state.talks.singleTalks[route.params.id]);

    const setTopOfSide = (image) => {
      if (main.value == "main" || side.value == "side") return;
      if (!talk.value) return;

      setTimeout(() => {
        side.value.style.top = `calc(${
          main.value.querySelector(".description").getBoundingClientRect().y
        }px - 10rem)`;

        side.value.style.marginTop = "0px";
      }, 10);
    };

    const role = computed(() => store.state.auth.userRole);

    return {
      role,
      side,
      main,
      talk,
      setTopOfSide,
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
  line-height: 2.7rem;
}

.separate-line::after {
  width: 90%;
  left: 5%;
}

.content {
  width: 65%;
  padding-right: 2rem;
}

.title {
  font-size: 2.1rem;
  text-align: right;
  padding: 0 0 3rem 0;
  text-align: right;
}

.text-date {
  padding-bottom: 0.6rem;
  font-size: 1.3rem;
}

.image {
  height: 200px;
}

.person .text {
  padding-top: 1rem;
  font-size: 1.5rem;
  text-align: justify;
  line-height: 2rem;
}

.person h4 {
  padding-top: 1rem;
  font-size: 1.7rem;
}

.person .text::v-deep(*) {
  margin-bottom: 0.7rem;
}

.description {
  margin-top: 1rem;
  padding: 2rem;
  font-size: 1.5rem;
  background: #e8e8e8;
  text-align: justify;
  border-radius: 10px;
  line-height: 2.1rem;
}

.text {
  padding-top: 1.5rem;
  text-align: justify;
  font-size: 1.6rem;
  line-height: 2.7rem;
}

.text::v-deep(p) {
  margin-bottom: 0.7rem;
}

.text::v-deep(h4) {
  margin-top: 2.5rem;
  margin-bottom: 0.7rem;
}

@media only screen and (max-width: 600px) {
  .main {
    margin-top: 1rem;
    margin-left: 2rem;
    padding-bottom: 4rem;
  }

  .content {
    width: 100%;
    padding-right: 2rem;
  }

  #talks-field {
    display: none;
  }

  #persons-field {
    margin: 0;
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
  }

  #persons-field > div {
    background: #eaeaea;
    padding: 3rem;
    border-radius: 10px;
  }

  #persons-field > div > .image {
    width: 100%;
    height: 100px;
  }
}

@media only screen and (min-width: 600px) {
  .main {
    margin-top: 1rem;
    margin-left: 1rem;
    padding-bottom: 4rem;
  }

  .content {
    width: 100%;
    padding-right: 2rem;
  }

  #talks-field {
    display: none;
  }

  #persons-field {
    margin: 2rem;
    display: flex;
    flex-direction: column;
  }

  #persons-field > div {
    background: #eaeaea;
    padding: 3rem;
    border-radius: 10px;
  }

  #persons-field > div > .image {
    width: 100%;
    height: 360px;
  }
}

@media only screen and (min-width: 768px) {
  .content {
    width: 90%;
    margin: auto;
  }

  #persons-field {
    margin: 2rem;
    display: flex;
    flex-direction: column;
  }

  #persons-field > div {
    background: #eaeaea;
    padding: 3rem;
    border-radius: 10px;
  }

  #persons-field > div > .image {
    width: 100%;
    height: 360px;
  }
}

@media only screen and (min-width: 992px) {
  .main {
    margin: 2rem 3rem 1rem 3rem;
    padding-bottom: 2rem;

    position: relative;
  }

  .content {
    width: 80%;
    margin: auto;
  }

  #talks-field {
    margin: 0 10rem 2rem 10rem;
    padding-bottom: 2rem;
  }

  #talks-field::v-deep(a.archive) {
    display: none;
  }
}

@media only screen and (min-width: 1200px) {
  .content {
    width: 65%;
    padding-right: 2rem;
    margin: 0;
  }

  #persons-field > div {
    background: inherit;
    padding: 0;
    border-radius: 0;
  }

  #persons-field {
    position: absolute;
    left: 0;
    width: 28%;
    transition: top 0.5s;
  }

  #persons-field > div > .image {
    width: 100%;
    height: 200px;
  }
}
</style>
