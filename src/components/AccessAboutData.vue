<template>
  <div class="icons">
    <button class="update" @click="update(formOpened)">تصحیح</button>
    <button class="remove" @click="remove">حذف</button>

    <loading-icon v-if="loading" />
  </div>
  <form @submit.prevent="finalizeUpdate" ref="form">
    <p>
      <input id="title" type="text" name="title" v-model="title" />
    </p>

    <p>
      <input id="index" type="text" name="index" v-model="index" />
    </p>

    <ckeditor
      :editor="editor"
      :config="editorConfig"
      v-model="updateData"
    ></ckeditor>

    <div class="icons">
      <input type="submit" value="تصحیح کنم؟" />
      <loading-icon v-if="loading" />
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { computed, defineAsyncComponent } from "vue";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    LoadingIcon: defineAsyncComponent(() => import("./LoadingIcon.vue")),
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    update() {
      this.formOpened
        ? (() => {
            this.$refs["form"].style.display = "none";
            this.formOpened = false;
          })()
        : (() => {
            this.$refs["form"].style.display = "block";
            this.formOpened = true;
          })();

      console.log(this.updateFunc);
    },

    remove() {
      console.log(this.deleteFunc);
      this.$store.dispatch("deleteAboutField", this.data._id);
    },

    finalizeUpdate() {
      this.$store.dispatch("updateAboutField", {
        id: this.data._id,
        body: this.updateData,
        title: this.title,
        index: this.index,
      });
    },
  },

  computed: {
    loading() {
      return this.$store.state.aboutFields.loading;
    },
  },

  data() {
    return {
      title: this.data.title,
      index: this.data.index || 1,
      formOpened: false,
      updateData: this.data.body,
      editor: ClassicEditor,
      editorConfig: {
        language: "fa",
      },
    };
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

button {
  padding: 0.4rem 1rem;
  font-size: 1.3rem;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-left: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

form {
  display: none;
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

.remove {
  background: #eb9788;
}

.update {
  background: #8db596;
}
</style>
