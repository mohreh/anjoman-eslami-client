<template>
  <div class="wrapper">
    <div class="sidebar" @touchstart="whatHappen" @touchend="handleMenu">
      <slot name="title" />
    </div>

    <div class="main" v-if="page === 'about'">
      <about-layout />
    </div>

    <div class="main" v-if="page === 'activity'">
      <activity-layout v-if="route.path == '/'" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

// import AboutLayout from "./AboutLayout.vue";
// import ActivityLayout from "./ActivityLayout.vue";
// const ActivityLayout = defineAsyncComponent(() => import("./ActivityLayout.vue"));

export default {
  props: {
    page: {
      type: String,
    },
  },

  components: {
    ActivityLayout: defineAsyncComponent(() => import("./ActivityLayout.vue")),
    AboutLayout: defineAsyncComponent(() => import("./AboutLayout.vue")),
  },

  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    let clientX = 0,
      clientY = 0;

    const whatHappen = (e) => {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    };

    const handleMenu = (e) => {
      let deltaX, deltaY;

      deltaX = e.changedTouches[0].clientX - clientX;
      deltaY = e.changedTouches[0].clientY - clientY;

      if (deltaY < 0) {
        emit("closeMenu", props.page);
      } else if (deltaY > 0) {
        emit("openMenu", props.page);
      }
    };

    return {
      page: props.page,
      route,
      handleMenu,
      whatHappen,
    };
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  position: relative;
  flex-basis: 100%;
}

.main {
  height: 100%;
  width: 100%;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

@media only screen and (max-width: 600px) {
  .sidebar {
    flex-basis: 2rem;
    padding: 1rem 0.8rem;
    height: 4.5rem;
    flex-basis: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  }
}

@media only screen and (min-width: 600px) {
  .sidebar {
    flex-basis: 2rem;
    padding: 1rem 0.8rem;
    height: 4.5rem;
    flex-basis: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  }
}

@media only screen and (min-width: 768px) {
  .wrapper {
    display: flex;
    position: relative;
    flex-basis: 100%;
    padding-right: 7rem;
  }

  .main {
    padding-right: 3rem;
  }

  .sidebar {
    flex-basis: 2rem;
    padding: 3rem 0.8rem;
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  }
}

@media only screen and (min-width: 992px) {
  .main {
    padding-right: 0;
  }

  .sidebar {
    flex-basis: 2rem;
    padding: 3rem 0.8rem;
  }
}

@media only screen and (min-width: 1200px) {
  .sidebar {
    flex-basis: 4.5rem;
    padding: 3rem 1.1rem;
  }
}
</style>
