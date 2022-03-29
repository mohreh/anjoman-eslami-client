<template>
  <div>
    <button class="add" @click="add">افزودن</button>
  </div>
  <form @submit.prevent="addData" ref="form">
    <p>
      <input id="title" type="text" name="title" v-model="title" />
    </p>

    <div class="date">
      <label>زمان افزودن</label>
      <date-picker
        :year-minus="datepickerConfig.yearMinus"
        :locale="datepickerConfig.locale"
        @value-changed="datepickerConfig.changeEvent"
        :disableInput="datepickerConfig.disableInput"
      />
    </div>

    <ckeditor :editor="editor" :config="editorConfig" v-model="body"></ckeditor>

    <p>
      <input type="submit" value="افزودن" />
      <loading-icon v-if="loading" />
    </p>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { computed, defineAsyncComponent } from "vue";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    DatePicker: defineAsyncComponent(() => import("vue3-datepicker-lite")),
    LoadingIcon: defineAsyncComponent(() => import("./LoadingIcon.vue")),
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

    addData() {
      this.$store.dispatch("addNews", {
        title: this.title,
        body: this.body,
        createdAt: this.createdAt,
      });
    },
  },

  computed: {
    loading() {
      console.log(this.$store.state.statements.loading);
      return this.$store.state.statements.loading;
    },
  },

  data() {
    return {
      title: "تیتر",
      formOpened: false,
      body: "",
      editor: ClassicEditor,
      editorConfig: {
        language: "fa",
      },
      createdAt: new Date(Date.now()),
      datepickerConfig: {
        yearMinus: 0,
        locale: {
          format: "YYYY-MM-DD",
          weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          todayBtn: "Today",
          clearBtn: "Clear",
          closeBtn: "Close",
        },
        changeEvent: (val) => {
          this.createdAt = val;
        },
        disableInput: false,
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

.date {
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
}

.date label {
  padding-left: 1rem;
}

form {
  display: none;
}

input {
  height: 3rem;
  padding: 1rem;
  width: 100%;
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
