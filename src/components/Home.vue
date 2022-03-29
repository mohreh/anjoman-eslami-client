<template>
  <box-layout
    class="box is-shown"
    ref="about"
    page="about"
    @closeMenu="closeMenu"
    @openMenu="openMenu"
  >
    <template v-slot:title>
      <h4 @click="changeView">معرفی و درباره انجمن</h4>
    </template>
  </box-layout>

  <box-layout
    class="box next-shown"
    ref="activity"
    page="activity"
    @closeMenu="closeMenu"
    @openMenu="openMenu"
  >
    <template v-slot:title>
      <h4 @click="changeView">اخبار مواضع و بیانیه‌ها</h4>
    </template>
  </box-layout>

  <box-layout
    class="box last-shown"
    ref="onMembers"
    page="notes"
    @closeMenu="closeMenu"
    @openMenu="openMenu"
  >
    <template v-slot:title>
      <h4 @click="changeView">یادداشت‌ها و مقالات دانشجویی</h4>
    </template>
  </box-layout>

  <div class="bottom"></div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted, defineAsyncComponent } from "vue";

import BoxLayout from "./BoxLayout.vue";

export default {
  components: {
    BoxLayout,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const about = ref("about");
    const activity = ref("activity");
    const onMembers = ref("onMembers");

    const pageContent = [about, activity, onMembers];
    const shownOdds = ["is-shown", "next-shown", "last-shown"];

    const changeView = ($evt) => {
      if (route.path !== "/") {
        router.replace("/");
      }

      const shownCnt = findShownCtn();
      if ($evt.target.parentNode.parentNode == shownCnt.value.$el) {
        loadCtn(shownCnt);
        return;
      } else {
        // Find Clicked Ctn
        const clickedCtn = pageContent.find((ctn) => {
          return ctn.value.$el === $evt.target.parentNode.parentNode;
        });

        const ctnShownVal = shownOdds.find((odd) =>
          clickedCtn.value.$el.classList.contains(odd)
        );

        shownCnt.value.$el.classList.replace("is-shown", ctnShownVal);

        if (window.innerWidth < 768) {
          if (ctnShownVal == "next-shown") {
            shownCnt.value.$el.style.top = "64px";
          } else if (ctnShownVal == "last-shown") {
            shownCnt.value.$el.style.top = "8px";
          }
          clickedCtn.value.$el.style.top = "120px";
        }

        clickedCtn.value.$el.classList.replace(ctnShownVal, "is-shown");

        loadCtn(clickedCtn);
      }
    };

    const findShownCtn = () => {
      return pageContent.find((cnt) => cnt.value.$el.classList.contains("is-shown"));
    };

    const loadCtn = (ctn, childRoute) => {
      if (ctn == about) {
        store.dispatch("fetchDataForAbout");
      } else if (ctn == activity) {
        if (childRoute) {
          return;
        }

        store.dispatch("fetchNews", { limit: 9 });
        store.dispatch("fetchStatements", {});
        store.dispatch("fetchTalks", { limit: 3 });
        store.dispatch("fetchEvents", { limit: 4 });
      }
    };

    const aboutField = computed(() => store.state.aboutFields.fields);

    onMounted(() => {
      if (route.path === "/") {
        loadCtn(findShownCtn());
      } else if (
        route.path.includes("/news") ||
        route.path.includes("/statements") ||
        route.path.includes("/talks") ||
        route.path.includes("/events")
      ) {
        about.value.$el.classList.replace("is-shown", "next-shown");
        activity.value.$el.classList.replace("next-shown", "is-shown");
      }
    });

    const openMenu = (ev) => {
      if (findShownCtn().value.page == ev && window.innerWidth < 768) {
        findShownCtn().value.$el.style.top = "120px";
        findShownCtn().value.$el.style.borderRadius = "20px 20px 0 0";
      }
    };

    const closeMenu = (ev) => {
      console.log(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        findShownCtn().value.$el.style.top = 0;
        findShownCtn().value.$el.style.borderRadius = 0;
      }
    };

    return {
      changeView,
      about,
      activity,
      onMembers,
      openMenu,
      closeMenu,
    };
  },
};
</script>

<style scoped>
.box {
  position: absolute;
  bottom: 0;
  right: 0;
  transition: 0.4s ease-in-out;
  z-index: 1;
}

.is-shown {
  z-index: 15;
}

.next-shown {
  z-index: 10;
  -webkit-filter: brightness(90%) contrast(90%) grayscale(10%);
  filter: brightness(90%) contrast(90%) grayscale(10%);
}

.last-shown {
  z-index: 5;
  -webkit-filter: brightness(80%) contrast(80%) grayscale(20%);
  filter: brightness(80%) contrast(80%) grayscale(20%);
}

.box h4:hover {
  opacity: 1;
}

.next-shown h4 {
  opacity: 0.7;
}

.last-shown h4 {
  opacity: 0.6;
}

.bottom {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  opacity: 0.6;
  -webkit-filter: brightness(50%) contrast(50%) grayscale(40%);
  filter: brightness(50%) contrast(50%) grayscale(40%);
}

@media only screen and (max-width: 600px) {
  .box {
    max-width: 100%;
  }

  .is-shown {
    top: 7.5rem;
    left: 0.5;
    right: 0.5;
    min-width: 100%;
  }

  .box {
    border-radius: 20px 20px 0 0;
  }

  .box h4 {
    font-family: iran-marker;
    font-weight: normal;
    font-size: 1.2rem;
    float: right;
    margin-right: 2rem;
    line-height: 2rem;
    text-align: right;
    cursor: pointer;
    transition: 0.2s;
  }

  .next-shown {
    top: 4rem;
    left: 1.5rem;
    right: 1.5rem;
  }

  .last-shown {
    top: 0.5rem;
    left: 3rem;
    right: 3rem;
  }
}

@media only screen and (min-width: 600px) {
  .is-shown {
    top: 7.5rem;
    left: 0.5;
    right: 0.5;
    min-width: 100%;
  }

  .next-shown {
    top: 4rem;
    left: 1.5rem;
    right: 1.5rem;
  }

  .last-shown {
    top: 0.5rem;
    left: 3rem;
    right: 3rem;
  }

  .box {
    border-radius: 20px 20px 0 0;
  }

  .box h4 {
    font-family: iran-marker;
    font-weight: normal;
    font-size: 1.2rem;
    float: right;
    margin-right: 5rem;
    line-height: 2rem;
    cursor: pointer;
    transition: 0.2s;
  }
}

@media only screen and (min-width: 768px) {
  .is-shown {
    top: 0.5rem;
    left: 7.5rem;
  }

  .next-shown {
    top: 3rem;
    left: 4rem;
  }

  .last-shown {
    top: 5.5rem;
    left: 0.5rem;
  }

  .box {
    border-radius: 30px 0 0 0;
  }

  .box h4 {
    writing-mode: vertical-rl;
    text-orientation: sideways-right;
    transform: rotate(180deg);
    font-family: iran-marker;
    font-weight: normal;
    font-size: 1.2rem;
    margin-right: 0;
    line-height: 2.1rem;
    cursor: pointer;
    transition: 0.2s;
  }
}

@media only screen and (min-width: 992px) {
  .is-shown {
    top: 0.5rem;
    left: 7.5rem;
  }

  .next-shown {
    top: 3rem;
    left: 4rem;
  }

  .last-shown {
    top: 5.5rem;
    left: 0.5rem;
  }

  .box h4 {
    writing-mode: vertical-rl;
    text-orientation: sideways-right;
    transform: rotate(180deg);
    font-family: iran-marker;
    font-weight: normal;
    font-size: 1.2rem;
    line-height: 2.1rem;
    cursor: pointer;
    transition: 0.2s;
  }
}

@media only screen and (min-width: 1200px) {
  .is-shown {
    top: 0.5rem;
    left: 8.5rem;
  }

  .next-shown {
    top: 3.5rem;
    left: 4.5rem;
  }

  .last-shown {
    top: 6.5rem;
    left: 0.5rem;
  }

  .box h4 {
    writing-mode: vertical-rl;
    text-orientation: sideways-right;
    transform: rotate(180deg);
    font-family: iran-marker;
    font-weight: normal;
    font-size: 1.35rem;
    line-height: 2.4rem;
    cursor: pointer;
    transition: 0.2s;
  }
}
</style>
