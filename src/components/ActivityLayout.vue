<template>
  <div class="main" dir="rtl">
    <header-content />

    <div class="wrapper">
      <news-field id="news" :limit="10" />

      <div class="side">
        <statement-field id="statements" />
        <talks-field id="talks" />
      </div>
    </div>

    <events-field id="events" />

    <div class="free-space"></div>
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    HeaderContent: defineAsyncComponent(() => import("./HeaderContent.vue")),
    NewsField: defineAsyncComponent(() => import("./NewsField.vue")),
    StatementField: defineAsyncComponent(() => import("./StatementField.vue")),
    TalksField: defineAsyncComponent(() => import("./TalksField.vue")),
    EventsField: defineAsyncComponent(() => import("./EventsField.vue")),
  },
};
</script>

<style scoped>
.main {
  overflow-y: scroll;
  font-size: 1.6rem;
  line-height: 2.5rem;
  overflow: auto;
  overflow-x: none;
}

.wrapper {
  flex-basis: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  text-align: justify;
  margin-top: 2rem;
}

#events {
  padding: 0 2rem;
}

#talks {
  height: auto;
}

.side {
  height: 100%;
}

.free-space {
  content: " ";
  flex-basis: 100%;
  margin: 1rem;
}

@media only screen and (max-width: 600px) {
  .wrapper {
    padding-right: 1rem;
  }

  .wrapper,
  .side {
    display: flex;
    flex-direction: column;
  }

  #news {
    width: 100%;
    margin-right: 0;
  }
}

@media only screen and (min-width: 600px) {
  .wrapper {
    padding-right: 1rem;
  }

  .wrapper,
  .side {
    display: flex;
    flex-direction: column;
  }

  #news {
    width: 100%;
    margin-right: 0;
  }
}

@media only screen and (min-width: 768px) {
  .wrapper {
    padding-right: 1rem;
  }

  .wrapper,
  .side {
    display: flex;
    flex-direction: column;
  }

  #news {
    width: 100%;
    margin-right: 0;
  }
}

@media only screen and (min-width: 992px) {
  .wrapper {
    display: flex;
    flex-direction: row;

    margin-right: 2rem;
  }

  .side {
    display: flex;
    flex-direction: column;
  }

  #news {
    margin-right: 2rem;
    width: 19rem;
  }

  .side {
    width: calc(98% - 22rem);
    padding-left: 1.5rem;
  }
}

@media only screen and (min-width: 1220px) {
  #news {
    width: 21rem;
  }

  .side {
    width: calc(97% - 24rem);
    padding-left: 2rem;
  }
}
</style>
