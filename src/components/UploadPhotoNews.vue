<template>
  <div>
    <button class="upload" @click="uploadPhoto" disabled="true" ref="uploader">
      افزودن / تغییر تصویر
    </button>
    <div class="image-container">
      <input
        type="file"
        accept="image/*"
        @change="enableBtn"
        id="file-input"
        ref="input"
      />

      <img :src="data.titleImage.url" v-if="data.titleImage" ref="image" />
      <img src="#" v-else ref="image" />
    </div>
    <loading-icon v-if="loading" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  components: {
    LoadingIcon: defineAsyncComponent(() => import("./LoadingIcon.vue")),
  },

  methods: {
    enableBtn() {
      this.$refs["uploader"].removeAttribute("disabled");

      this.$refs["image"].src = URL.createObjectURL(
        this.$refs["input"].files[0]
      );
    },

    uploadPhoto() {
      this.$store.dispatch("uploadPhotoForNews", {
        fileData: this.$refs["input"].files[0],
        id: this.data._id,
      });
    },
  },

  computed: {
    loading() {
      return this.$store.state.events.loading;
    },
  },
};
</script>

<style scoped>
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
