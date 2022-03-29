<template>
  <div class="container" dir="rtl">
  <form
    @submit.prevent="checkForm"
    method="post"
  >
  <h1>صفحه ورود</h1>
  <p v-if="errors.errs.length" class="errors">
    <ul>
      <li v-for="error in errors.errs">{{ error }}</li>
    </ul>
  </p>

  <p>
    <input
      id="email"
      ref="email"
      type="email"
      name="email"
      placeholder="ایمیل خود را وارد کنید"
    >
  </p>

    <p>
    <input
      id="password"
      ref="password"
      type="password"
      name="password"
      placeholder="گذرواژه خود را وارد کنید"
    >
  </p>


  <p>
    <input
      type="submit"
      value="تایید"
    >
  </p>
  <loading-icon v-if="loading" />
  </form>
  <p>
    <input
      type="submit"
      @click="some"
      value="خروج از حساب"
      class="logout"
    >
  </p>
  </div>
</template>

<script>
import { defineAsyncComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  components: {
    LoadingIcon: defineAsyncComponent(() => import("./LoadingIcon.vue")),
  },
  setup() {
    const store = useStore();

    const email = ref("email");
    const password = ref("password");

    const errors = reactive({
      errs: [],
    });

    const checkForm = async () => {
      errors.errs = [];

      if (!email) {
        errors.errs.push("ایمیل را وارد کنید");
        return;
      }
      if (!password) {
        errors.errs.push("پسورد را وارد کنید");
        return;
      }

      console.log(email.value.value, password.value.value);
      store.dispatch("login", {
        email: email.value.value,
        password: password.value.value,
      });
    };

    const some = () => {
      store.dispatch("logout");
    };

    const loading = computed(() => store.state.auth.loading);

    return {
      loading,
      store,
      email,
      password,
      errors,
      checkForm,
      some,
    };
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  font-size: 1.3rem;
  width: 100vw;
  height: 100vh;
  background-color: #f9f9f9;
}

form {
  margin: 12vh auto;
  width: 29rem;
  max-width: 100%;
  padding: 2rem;
  display: block;
}

h1 {
  text-align: center;
}

input {
  height: 3rem;
  padding: 1rem;
  width: 100%;
  font-size: 1.3rem;

  line-height: 1rem;
  text-align: center;
  font-family: adobe-arabic, sans-serif;
  border: 2px solid #85a392;
  outline: none;
  border-radius: 10px;
  margin: 2rem 0;
  display: block;
  cursor: pointer;
}

ul {
  list-style-type: none;
}

.errors {
  color: #d63447;
}

input[type="submit"] {
  font-weight: bold;
  text-align: center;
  font-size: 1.4rem;
  background: #d1cebd;
  transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

input[type="submit"]:hover {
  background: #639a67;
}

input.logout {
  width: 29rem;
  margin: auto;
}
</style>
