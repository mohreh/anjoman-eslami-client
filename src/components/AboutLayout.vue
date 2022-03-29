<template>
  <header-content />

  <div class="wrapper" dir="rtl">
    <div class="titles">
      <div class="title" v-for="field in fields">
        <p :id="field._id" @click="titleClicked">
          {{ field.title }}
        </p>
      </div>
    </div>

    <div class="content" ref="content">
      <create-about v-if="role === 'admin'" addFunc="addAboutField" />
      <div v-for="field in fields" :id="'A' + field._id">
        <h3>{{ field.title }}</h3>
        <div class="text" v-html="field.body"></div>
        <access-about-data v-if="role === 'admin'" :data="field" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, defineAsyncComponent } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    HeaderContent: defineAsyncComponent(() => import("./HeaderContent.vue")),
    AccessAboutData: defineAsyncComponent(() => import("./AccessAboutData.vue")),
    CreateAbout: defineAsyncComponent(() => import("./CreateAbout.vue")),
  },

  setup() {
    const store = useStore();

    const content = ref("content");

    const fields = computed(() => store.state.aboutFields.fields);

    const titleClicked = ($evt) => {
      console.log($evt.target.id);
      const div = content.value.querySelector("#A" + $evt.target.id);
      div.scrollIntoView();
    };

    const role = computed(() => store.state.auth.userRole);

    return {
      role,
      fields,
      titleClicked,
      content,
    };
  },
};
</script>

<style scoped>
.wrapper {
  flex-basis: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  font-size: 1.6rem;
  line-height: 2.5rem;
  text-align: justify;
}

.titles {
  background: #e8e8e8;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.title {
  display: block;
  width: 100%;
  white-space: nowrap;
  margin-bottom: 1rem;
  overflow: hidden;
}

.title p {
  display: inline;
  width: auto;
  cursor: pointer;
  transition: 0.2s;
}

.title p:hover {
  color: #214252;
}

.content {
  flex-wrap: wrap;
  overflow-x: none;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-bottom: 6rem;
}

.content > div {
  padding: 1rem 0;
  display: inline-block;
  margin-left: 2rem;
}

.text {
  padding-top: 0.5rem;
}

@media only screen and (max-width: 600px) {
  .titles {
    display: none;
  }

  .wrapper {
    font-size: 1.5rem;
    line-height: 2.4rem;
    max-height: calc(100% - 7rem);
  }

  .content > div {
    padding: 1rem 2rem 1rem 1rem;
  }

  .content {
    flex-basis: calc(99%);
    margin-bottom: 1rem;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 600px) {
  .titles {
    display: none;
  }

  .wrapper {
    font-size: 1.5rem;
    line-height: 2.4rem;
    max-height: calc(100% - 9rem);
  }

  .content > div {
    padding: 1rem 2rem 1rem 1rem;
  }

  .content {
    flex-basis: calc(99%);
    margin-bottom: 1rem;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 768px) {
  .titles {
    display: none;
  }

  .wrapper {
    font-size: 1.5rem;
    line-height: 2.4rem;
    max-height: calc(100% - 9rem);
  }

  .content > div {
    padding: 1rem 2rem 1rem 1rem;
  }

  .content {
    flex-basis: calc(99%);
    margin-bottom: 1rem;
    margin: 0 auto;
    padding-bottom: 2rem;
  }
}

@media only screen and (min-width: 992px) {
  .titles {
    display: block;
    margin-right: 3rem;
  }

  .wrapper {
    font-size: 1.5rem;
    line-height: 2.4rem;
    max-height: calc(100% - 9rem);
  }

  .content > div {
    padding: 1rem;
  }

  .titles {
    height: 95%;
    flex-basis: 16rem;
    padding: 1.5rem 2.5rem;
    margin-right: 2rem;
    font-size: 1.5rem;
  }

  .content {
    flex-basis: calc(95% - 19.5rem);
    margin-bottom: 1rem;
  }
}

@media only screen and (min-width: 1200px) {
  .wrapper {
    font-size: 1.6rem;
    line-height: 2.5rem;
    max-height: calc(100% - 10rem);
  }

  .titles {
    height: 95%;
    flex-basis: 21rem;
    padding: 2rem 3rem;
    margin-right: 5rem;
    font-size: 1.6rem;
  }

  .content {
    flex-basis: calc(95% - 24rem);
    margin-bottom: 1rem;
  }
}
</style>
