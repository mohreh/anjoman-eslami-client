<template>
  <div class="container" dir="rtl">
    <header-content />
    <div class="main" ref="main">
      <div class="content" v-if="event">
        <h1 class="title">{{ event.title }}</h1>
        <p class="text-date" v-if="event.status == 'inprograss'">در دست پیگیری</p>
        <p class="text-date" v-if="event.status == 'canceled'">لغو شده</p>
        <p class="text-date" v-if="event.status == 'terminated'">به اتمام رسیده</p>
        <div class="date-container">
          <p class="text-date">
            آغاز :
            {{
              new Date(event.startDate).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </p>
          <p class="text-date">
            پایان :
            {{
              new Date(event.endDate).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </p>
        </div>
        <img v-if="event.titleImage" :src="event.titleImage.url" :alt="event.title" />
        <div class="text" ref="text" v-html="event.body" v-show="event"></div>
        <upload-photo-event v-if="role === 'admin'" :data="event" />
        <access-event-data :data="event" v-if="role === 'admin'" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import HeaderContent from "./HeaderContent.vue";

export default {
  components: {
    HeaderContent,
    AccessEventData: defineAsyncComponent(() => import("./AccessEventData.vue")),
    UploadPhotoEvent: defineAsyncComponent(() => import("./UploadPhotoEvent.vue")),
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const main = ref("main");

    watch(
      () => route.params.id,
      (id) => {
        if (id) store.dispatch("fetchEvent", id);
      },
      {
        immediate: true,
      }
    );

    store.dispatch("fetchNews", { limit: 4 });

    const event = computed(() => store.state.events.singleEvent[route.params.id]);

    watch(
      () => route.path,
      () => {
        main.value.parentNode.scrollTop = 0;
      }
    );

    const role = computed(() => store.state.auth.userRole);

    return {
      event,
      role,
      main,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  line-height: 2.5rem;
  font-size: 1.7rem;
  overflow-y: auto;
}

.main {
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  position: relative;
}

.text-date {
  font-size: 1.7;
  line-height: 2.5rem;
}

.content {
  width: 64%;
  margin: 0 auto;
}

.title {
  font-size: 2.1rem;
  line-height: 3rem;
  text-align: center;
  padding: 2rem 6rem 4rem 6rem;
}

.text {
  font-size: 1.7rem;
  text-align: justify;
  line-height: 2.7rem;
}

img {
  width: 100%;
  min-height: 200px;
  object-fit: contain;
  margin: 1rem 0;
  background-color: #e8e8e8;
}

.text::v-deep(*) {
  margin-bottom: 2rem;
}

@media only screen and (max-width: 600px) {
  .title {
    font-size: 1.9rem;
    line-height: 2.1rem;
    padding: 2rem 0 4rem 0;
  }

  .content {
    width: 90%;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 600px) {
  .title {
    font-size: 1.9rem;
    line-height: 2.1rem;
    padding: 2rem 3rem 4rem 3rem;
  }

  .content {
    width: 90%;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 768px) {
  .title {
    font-size: 2.1rem;
    line-height: 3rem;
    padding: 2rem 6rem 4rem 6rem;
  }

  .date-container {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .content {
    width: 80%;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 992px) {
  .date-container {
    width: 50%;
  }

  .content {
    width: 70%;
  }
}

@media only screen and (min-width: 1200px) {
  .content {
    width: 64%;
  }
}
</style>
