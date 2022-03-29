<template>
  <div class="container" dir="rtl" ref="container" v-if="route.path == '/events'">
    <header-content />
    <h3>رویدادها</h3>

    <div class="main" v-if="events">
      <div class="event separate-line" v-for="event in events.data.slice(0, 9)">
        <router-link :to="`/events/${event._id}`">
          <p class="text-date" v-if="event.status == 'inprograss'">در دست پیگیری</p>
          <p class="text-date" v-if="event.status == 'canceled'">لغو شده</p>
          <p class="text-date" v-if="event.status == 'terminated'">به اتمام رسیده</p>

          <div class="text-hover">
            <h4 class="title">{{ event.title }}</h4>
            <img v-if="event.titleImage" :src="event.titleImage.url" />
          </div>
        </router-link>
      </div>
    </div>
    <pagination
      @pageChange="pageChange"
      loadFunc="fetchEvents"
      :limit="9"
      model="events"
    />

    <create-event v-if="role === 'admin'" />
  </div>
  <router-view v-else></router-view>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, computed, watch, defineAsyncComponent } from "vue";

export default {
  components: {
    Pagination: defineAsyncComponent(() => import("./Pagination.vue")),
    HeaderContent: defineAsyncComponent(() => import("./HeaderContent.vue")),
    CreateEvent: defineAsyncComponent(() => import("./CreateEvent.vue")),
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

    const events = computed(() => store.state.events.events[page.value]);

    const pageChange = (val) => {
      page.value = val;
      container.value.scrollTop = 0;
    };

    const role = computed(() => store.state.auth.userRole);

    return { events, pageChange, route, role };
  },
};
</script>

<style scoped>
.container {
  overflow-y: auto;
  height: auto;
  padding-bottom: 2rem;
  font-size: 1.7rem;
  line-height: 2.5rem;
  scroll-behavior: smooth;
}

.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

h3 {
  font-size: 2.4rem;
  margin-bottom: 2rem;
  padding: 1rem 6rem 0 6rem;
}

.title {
  text-align: right;
  padding: 0.7rem 0 1.9rem 0;
  line-height: 2.3rem;
}

.main {
  padding: 1rem 6rem 0 6rem;
  margin: 0 auto;
  position: relative;
  height: auto;
  max-width: 100%;
  -webkit-column-count: 3; /* Chrome, Safari, Opera */
  -moz-column-count: 3; /* Firefox */
  column-count: 3;
  columns: 3;
  -webkit-column-gap: 2em;
  -moz-column-gap: 2em;
  column-gap: 2rem;
  column-fill: balance;
}

.event {
  width: 100%;
  position: relative;
  padding: 0;
  margin-bottom: 3rem;
}

.separate-line::after {
  width: 80%;
  left: 10%;
}

.text-hover img {
  object-fit: contain;
  width: 100%;
  padding-bottom: 2rem;
}

.date-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media only screen and (max-width: 600px) {
  .main {
    padding: 1rem 3rem 0 3rem;
    -webkit-column-count: 1; /* Chrome, Safari, Opera */
    -moz-column-count: 1; /* Firefox */
    column-count: 1;
    columns: 1;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.6rem;
    padding: 0.7rem 0 1.5rem 0;
  }
}

@media only screen and (min-width: 600px) {
  .main {
    -webkit-column-count: 1; /* Chrome, Safari, Opera */
    -moz-column-count: 1; /* Firefox */
    column-count: 1;
    columns: 1;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.6rem;
    padding: 0.7rem 0 1.5rem 0;
  }
}

@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 992px) {
  .main {
    -webkit-column-count: 2; /* Chrome, Safari, Opera */
    -moz-column-count: 2; /* Firefox */
    column-count: 2;
    columns: 2;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.6rem;
    padding: 0.7rem 0 1.5rem 0;
  }
}

@media only screen and (min-width: 1220px) {
  .main {
    -webkit-column-count: 3; /* Chrome, Safari, Opera */
    -moz-column-count: 3; /* Firefox */
    column-count: 3;
    columns: 3;
  }

  h3 {
    font-size: 2.1rem;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.7rem;
    padding: 0.7rem 0 1.9rem 0;
  }
}
</style>
