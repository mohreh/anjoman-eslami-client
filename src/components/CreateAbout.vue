<template>
  <div class="wrapper">
    <button class="add" @click="add">افزودن</button>

    <form @submit.prevent="addData" ref="form">
      <p>
        <input id="title" type="text" name="title" v-model="title" />
      </p>

      <p>
        <input id="index" type="text" name="index" v-model="index" />
      </p>

      <ckeditor
        :editor="editor"
        :config="editorConfig"
        v-model="body"
      ></ckeditor>

      <div class="icons">
        <input type="submit" value="افزودن" />
        <loading-icon v-if="loading" />
      </div>
    </form>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    LoadingIcon: defineAsyncComponent(() => import("./LoadingIcon.vue")),
  },
  data() {
    return {
      title: "تیتر",
      body: "",
      index: 1,
      formOpened: false,
      editor: ClassicEditor,
      editorConfig: {
        language: "fa",
      },
    };
  },

  computed: {
    loading() {
      return this.$store.state.aboutFields.loading;
    },
  },

  methods: {
    add() {
      this.formOpened
        ? (() => {
            this.$refs["form"].style.display = "none";
            this.formOpened = false;
          })()
        : (() => {
            this.$refs["form"].style.display = "block";
            this.formOpened = true;
          })();
    },

    async addData() {
      const res = await this.$store.dispatch("addAboutField", {
        title: this.title,
        body: this.body,
        index: this.index,
      });
    },
  },
};
</script>

<style scoped>
.icons {
  height: auto;
  position: relative;
  display: flex;
  flex-direction: row;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: auto;
}

button {
  padding: 0.4rem 1rem;
  font-size: 1.3rem;
  width: 6rem;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-left: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

form {
  display: none;
  height: auto;
}

input {
  height: 3rem;
  padding: 1rem;
  width: 40%;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2rem;
  text-align: right;
  font-family: adobe-arabic, sans-serif;
  border: 1px solid #999;
  outline: none;
  border-radius: 4px;
  margin: 2rem 0;
  display: block;
  cursor: pointer;
}

input[type="submit"] {
  padding: 0.4rem 4rem;
  font-size: 1.3rem;
  width: auto;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-left: 1rem;
  cursor: pointer;
  transition: 0.2s;
  background: #8db596;
}
</style>
