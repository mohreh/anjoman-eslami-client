<template>
  <div class="pagination" v-if="pagination">
    <div class="prev arrow" @click="prev" v-if="pagination.prev"></div>

    <div class="page">
      <p>{{ page.toString().EntoFa() }}</p>
    </div>

    <div class="next arrow" @click="next" v-if="pagination.next"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

export default {
  props: {
    loadFunc: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const page = ref(1);

    const model = props.model;

    const pagination = computed(() => store.state[model][model][page.value].pagination);

    if (pagination.next) page.value = pagination.next.page - 1;
    else if (pagination.prev) page.value = pagination.prev.page + 1;
    else page.value = 1;

    store.dispatch(props.loadFunc, { page: page.value, limit: props.limit });

    const next = () => {
      page.value++;
      store.dispatch(props.loadFunc, { page: page.value, limit: props.limit });
      emit("pageChange", page.value);
    };

    const prev = () => {
      page.value--;
      store.dispatch(props.loadFunc, { page: page.value, limit: props.limit });

      emit("pageChange", page.value);
    };

    return {
      pagination,
      page,
      next,
      prev,
    };
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  padding: 2rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.page {
  padding: 0.5rem 4rem;
  background: #e8e8e8;
  color: #214252;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.6rem;
}

input {
  width: 10px;
  background: inherit;
  border: none;
  outline: none;
  color: inherit;
  font-size: inherit;
}

.arrow {
  margin: 0.5rem;
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 25px;
  height: 25px;
  border: 2px solid transparent;
  border-radius: 100px;
  transition: 0.1s;
  cursor: pointer;
}

.arrow:hover {
  color: #214252;
}

.next::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 25px;
  height: 25px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  transform: rotate(135deg);
  right: 0;
  top: 0;
}

.prev::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 25px;
  height: 25px;
  border-bottom: 2px solid;
  border-left: 2px solid;
  transform: rotate(-135deg);
  left: 0;
  top: 0;
}

@media only screen and (max-width: 600px) {
  .pagination {
    padding-bottom: 5rem;
  }
}
</style>
