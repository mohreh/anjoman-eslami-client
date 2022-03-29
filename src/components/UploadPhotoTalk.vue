<template>
  <div class="person" v-for="person in persons">
    <button class="upload" @click="uploadPhoto(persons.indexOf(person))" disabled="true" :ref="`uploader${persons.indexOf(person)}`">افزودن / تغییر تصویر</button>
    <div class="image-container">
      <input type="file" accept="image/*" @change="enableBtn(persons.indexOf(person))" id="file-input" :ref="`input${persons.indexOf(person)}`" />

      <img :src="person.image.url" v-if="person.image" :ref="`image${persons.indexOf(person)}`" />
      <img src="" v-else :ref="`image${persons.indexOf(person)}`" />
    </div>
    <loading-icon v-if="loading" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  props: {
    persons: {
      type: Array,
      required: true,
    },

    id: {
      type: String,
      required: true,
    },
  },

  components: {
    LoadingIcon: defineAsyncComponent(() => import("./LoadingIcon.vue")),
  },

  methods: {
    enableBtn(index) {
      console.log(this.$refs);
      this.$refs[`uploader${index}`].removeAttribute("disabled");

      this.$refs[`image${index}`].src = URL.createObjectURL(this.$refs[`input${index}`].files[0]);
    },

    uploadPhoto(index) {
      this.$store.dispatch("uploadPhotoForTalk", {
        fileData: this.$refs[`input${index}`].files[0],
        index,
        id: this.id,
      });
    },
  },

  computed: {
    loading() {
      return this.$store.state.talks.loading;
    },
  },
};
</script>

<style scoped>
.person {
  margin-right: 2rem;
}

button {
  padding: 1rem 1rem;
  font-size: 1.3rem;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-left: 1rem;
  cursor: pointer;
  transition: 0.2s;
  background: #8db596;
  margin: 2rem 0;
  margin-left: 2rem;
  height: 60px;
}

button:disabled {
  background: #e8e8e8;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

input {
  z-index: 2;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

div {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
}

.image-container {
  width: 60px;
  height: 60px;
  position: relative;
  border: 2px solid #ddd;
  border-radius: 5px;
}
</style>
