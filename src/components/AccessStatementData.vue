<template>
  <div>
    <button class="update" @click="update(formOpened)">تصحیح</button>
    <button class="remove" @click="remove">حذف</button>

    <loading-icon v-if="loading" />
  </div>
  <form @submit.prevent="finalizeUpdate" ref="form">
    <p>
      <input id="title" type="text" name="title" v-model="title" />
    </p>

    <date-picker
      :value-attr="datepickerConfig.value"
      :year-minus="datepickerConfig.yearMinus"
      :locale="datepickerConfig.locale"
      @value-changed="datepickerConfig.changeEvent"
      :disableInput="datepickerConfig.disableInput"
    />

    <ckeditor
      :editor="editor"
      :config="editorConfig"
      v-model="updateData"
    ></ckeditor>

    <p>
      <input type="submit" value="تصحیح کنم؟" />

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
    },

    remove() {
      this.$store.dispatch("deleteStatement", this.data._id);
    },

    finalizeUpdate() {
      this.$store.dispatch("updateStatement", {
        id: this.data._id,
        body: this.updateData,
        title: this.title,
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
      title: this.data.title,
      formOpened: false,
      updateData: this.data.body,
      editor: ClassicEditor,
      editorConfig: {
        language: "fa",
      },
      createdAt: this.data.createdAt,
      datepickerConfig: {
        yearMinus: 0,
        locale: {
          format: "YYYY-MM-DD",
          weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          todayBtn: "Today",
          clearBtn: "Clear",
          closeBtn: "Close",
        },
        value: this.data.createdAt,
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
