<template>
  <div class="main separate-line">
    <h3>مواضع و بیانیه‌ها</h3>
    <div class="wrapper" v-if="statements">
      <div class="statement" v-for="statement in statements.data.slice(0, limit)">
        <p class="text-date">
          {{
            new Date(statement.createdAt).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
        <router-link :to="`/statements/${statement._id}`" class="title text-hover">{{
          statement.title
        }}</router-link>
      </div>
    </div>
    <router-link to="/statements" class="archive">بایگانی بیانیه‌ها</router-link>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    limit: {
      type: Number,
      default: 9,
    },
  },
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.statements.loading);
    const statements = computed(() => store.state.statements.statements[1]);

    return {
      statements,
      loading,
    };
  },
};
</script>

<style scoped>
.main {
  position: relative;
}

.wrapper {
  display: grid;
  width: 100%;
  justify-content: space-around;
}

.main > h3 {
  font-size: 1.9rem;
  width: 100%;
  padding-bottom: 2rem;
}

a.title {
  text-align: right;
  font-weight: bold;
}

::-webkit-scrollbar {
  display: none;
}

@media only screen and (max-width: 600px) {
  .wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    max-width: 100%;
    width: auto;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  h3 {
    font-size: 1.7rem;
    margin-right: 1rem;
  }

  .statement {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    display: flex;
    white-space: normal;
    width: 15rem;
    padding: 3rem 2rem;
    flex-direction: column;
    flex: 0 0 auto;
    text-align: justify;
    margin: 1rem 0.5rem 1rem 1.5rem;

    height: auto;
    overflow-y: none;
  }

  .wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .statement:last-child {
    width: 16rem;
    padding-left: 3rem;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 2rem;
  }
}

@media only screen and (min-width: 600px) {
  .wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    max-width: 100%;
    width: auto;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  h3 {
    font-size: 1.7rem;
    margin-right: 1rem;
  }

  .statement {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    display: flex;
    white-space: normal;
    width: 15rem;
    padding: 3rem 2rem;
    flex-direction: column;
    flex: 0 0 auto;
    text-align: justify;
    margin: 1rem 0.5rem 1rem 1.5rem;

    height: auto;
    overflow-y: none;
  }

  .wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .statement:last-child {
    width: 16rem;
    padding-left: 3rem;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 2rem;
  }
}

@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 992px) {
  .main > h3 {
    font-size: 1.6rem;
    padding-bottom: 1rem;
  }

  .statement {
    width: 100%;
    box-shadow: none;
    padding: 0;
    margin: 0;
  }

  .statement:last-child {
    width: 100%;
  }

  a.title {
    font-size: 1.4rem;
    padding-top: 0rem;
    line-height: 1.9rem;
  }

  .wrapper {
    display: grid;
    grid-gap: 2rem;
    display: grid;
    width: 100%;
    justify-content: space-around;
  }

  .wrapper {
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  .statement:last-child {
    padding-left: 0;
  }

  .archive {
    font-size: 1.3rem;
    margin-left: 0;
  }
}

@media only screen and (min-width: 1050px) {
  .main > h3 {
    font-size: 1.7rem;
    padding-bottom: 1.5rem;
  }

  a.title {
    font-size: 1.5rem;
    padding-top: 0rem;
    line-height: 2rem;
  }

  .wrapper {
    grid-gap: 2rem;
  }

  .wrapper {
    grid-gap: 1.5rem;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  .wrapper:nth-child(9) {
    display: none;
  }
}

@media only screen and (min-width: 1220px) {
  .main > h3 {
    font-size: 1.9rem;
    padding-bottom: 2rem;
  }

  a.title {
    font-size: 1.6rem;
    padding-top: 0.5rem;
    line-height: 2.1rem;
  }

  .wrapper {
    grid-gap: 2.6rem;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1440) {
  .main > h3 {
    font-size: 1.9rem;
    padding-bottom: 2rem;
  }

  a.title {
    font-size: 1.5rem;
    padding-top: 0.5rem;
    line-height: 1.8rem;
  }

  .wrapper {
    grid-gap: 2.8rem;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
