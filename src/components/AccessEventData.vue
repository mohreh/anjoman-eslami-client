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

    <div class="date">
      <label>زمان افزودن</label>
      <date-picker :value-attr="createdAt" :year-minus="datepickerConfig.yearMinus" :locale="datepickerConfig.locale" @value-changed="createdAtChange" :disableInput="datepickerConfig.disableInput" />
    </div>

    <div class="date">
      <label>تاریخ شروع</label>
      <date-picker :value-attr="startDate" :year-minus="datepickerConfig.yearMinus" :locale="datepickerConfig.locale" @value-changed="startDateChange" :disableInput="datepickerConfig.disableInput" />
    </div>

    <div class="date">
      <label>تاریخ پایان</label>
      <date-picker :value-attr="endDate" :year-minus="datepickerConfig.yearMinus" :locale="datepickerConfig.locale" @value-changed="endDateChange" :disableInput="datepickerConfig.disableInput" />
    </div>

    <div>
      <label for="status" name="status">وضعیت</label>
      <select v-model="status" id="status" name="status">
        <option v-for="opt in statsList">{{ opt }}</option>
      </select>
    </div>

    <ckeditor :editor="editor" :config="editorConfig" v-model="updateData"></ckeditor>

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
    createdAtChange(val) {
      this.createdAt = val;
    },
    startDateChange(val) {
      this.startDate = val;
    },
    endDateChange(val) {
      this.endDate = val;
    },

    update() {
      console.log(this.data);
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
      this.$store.dispatch("deleteEvent", this.data._id);
    },

    finalizeUpdate() {
      console.log(this.status);
      this.$store.dispatch("updateEvent", {
        id: this.data._id,
        body: this.updateData,
        title: this.title,
        createdAt: this.createdAt,
        endDate: this.endDate,
        startDate: this.startDate,
        status: this.status,
      });
    },
  },

  computed: {
    loading() {
      return this.$store.state.events.loading;
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
      statsList: ["inprograss", "terminated", "canceled"],
      createdAt: this.data.createdAt,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      status: this.data.status,
      datepickerConfig: {
        yearMinus: 0,
        locale: {
          format: "YYYY-MM-DD",
          weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          todayBtn: "Today",
          clearBtn: "Clear",
          closeBtn: "Close",
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

select {
  appearance: none;
  background-color: transparent;
  border: 2px solid #bbb;
  outline: none;
  border-radius: 10px;
  padding: 0 1rem 0 0;
  margin: 1rem 1rem 1rem 0;
  width: 30%;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
}

select option {
  font-family: cursive;
  font-size: 1.2rem;
}

select::after {
  content: "";
  width: 0.8em;
  height: 0.5em;
  background-color: #555;
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}

select::-ms-expand {
  display: none;
}
</style>
