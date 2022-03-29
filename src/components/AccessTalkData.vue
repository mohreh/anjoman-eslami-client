<template>
  <div class="wrapper">
    <div>
      <button class="update" @click="update(formOpened)">تصحیح</button>
      <button class="remove" @click="remove">حذف</button>

      <loading-icon v-if="loading" />
    </div>
    <form @submit.prevent="finalizeUpdate" ref="form">
      <p>
        <input id="title" type="text" name="title" v-model="title" />
      </p>

      <div>
        <label>تاریخ مصاحبه</label>
        <date-picker :value-attr="datepickerConfig.value" :year-minus="datepickerConfig.yearMinus" :locale="datepickerConfig.locale" @value-changed="datepickerConfig.changeEvent" :disableInput="datepickerConfig.disableInput" />
      </div>

      <div>
        <label>توضیحات</label>
        <ckeditor :editor="editor" :config="editorConfig" v-model="description"></ckeditor>
      </div>

      <div>
        <label>متن</label>
        <ckeditor :editor="editor" :config="editorConfig" v-model="body"></ckeditor>
      </div>

      <div class="persons">
        <div v-for="person in persons">
          <p>
            <label for="name">نام فرد</label>
            <input id="name" type="text" name="name" v-model="person.name" />
          </p>

          <div>
            <label>توضیحات</label>
            <ckeditor :editor="editor" :config="editorConfig" v-model="person.introduce"></ckeditor>
          </div>
          <button type="button" class="remove" @click="removePerson(persons.indexOf(person))">حذف</button>
        </div>
      </div>

      <p>
        <button type="button" class="add" @click="addPerson">افزودن فرد</button>
        <loading-icon v-if="loading" />
      </p>

      <p>
        <input type="submit" value="تصحیح کنم؟" />
        <loading-icon v-if="loading" />
      </p>
    </form>
  </div>
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

    addPerson() {
      this.persons.push({ name: "", introduce: "" });
    },

    removePerson(index) {
      this.persons.splice(index, 1);
      console.log(this.persons);
    },

    remove() {
      this.$store.dispatch("deleteTalk", this.data._id);
    },

    finalizeUpdate() {
      this.$store.dispatch("updateTalk", {
        id: this.data._id,
        body: this.body,
        title: this.title,
        createdAt: this.createdAt,
        description: this.description,
        persons: this.persons,
      });
    },
  },

  computed: {
    loading() {
      return this.$store.state.talks.loading;
    },
  },

  data() {
    return {
      title: this.data.title,
      formOpened: false,
      body: this.data.body,
      editor: ClassicEditor,
      editorConfig: {
        language: "fa",
      },
      description: this.data.description,
      persons: [...this.data.persons],
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
.wrapper {
  margin: 2rem;
}

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

button:hover {
  filter: brightness(80%);
}

form {
  display: none;
}

form > div {
  margin: 1rem 0;
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

input#name {
  margin-top: 0;
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

.persons {
  font-size: 1.3rem;
  line-height: 1.9rem;
  display: flex;
  overflow: none;
}

.persons > div {
  max-width: 30%;
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.persons > div > div {
  margin-bottom: 1rem;
}

.remove {
  background: #eb9788;
}

.update {
  background: #8db596;
}
</style>
