<template>
  <div class="wrapper separate-line">
    <h3>رویدادها و برنامه‌های آتی و فعلی انجمن اسلامی</h3>

    <div class="event-wrapper" v-if="events">
      <div class="event" v-for="event in events.data.slice(0, 4)">
        <p class="text-date" v-if="event.status == 'inprograss'">در دست پیگیری</p>
        <p class="text-date" v-if="event.status == 'canceled'">لغو شده</p>
        <p class="text-date" v-if="event.status == 'terminated'">به اتمام رسیده</p>

        <router-link :to="`/events/${event._id}`">
          <div class="text-hover">
            <h4 class="title">{{ event.title }}</h4>

            <img v-if="event.titleImage" :src="event.titleImage.url" />
          </div>
        </router-link>
        <p class="text-date">
          آغاز :
          {{
            new Date(event.startDate).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </p>
      </div>
    </div>

    <router-link to="events" class="archive">رویدادها و برنامه‌های گذشته</router-link>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.events.loading);
    const events = computed(() => store.state.events.events[1]);

    return {
      loading,
      events,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

h3 {
  padding-bottom: 1.8rem;
}

.title {
  text-align: right;
}

.separate-line::after {
  width: 90%;
  left: 5%;
}

.text-date {
  padding-bottom: 0.4rem;
}

.text-hover img {
  object-fit: contain;
  width: 100%;
  min-height: 100px;
  margin-top: 1.1rem;
  background-color: #e8e8e8;
}

@media only screen and (max-width: 600px) {
  .wrapper {
    margin-bottom: 2.5rem;
  }

  .event-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: auto;
    position: relative;
    max-width: 100%;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  .event-wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  h3 {
    font-size: 1.7rem;
    margin-right: 1rem;
  }

  .event-wrapper > div {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    padding: 2rem;
    border-radius: 5px;
    display: flex;
    white-space: normal;
    width: 21rem;

    flex-direction: column;
    flex: 0 0 auto;
    margin: 1rem 0.5rem 1rem 2rem;

    text-align: justify;
    height: auto;
    overflow-y: none;
  }
}

@media only screen and (min-width: 600px) {
  .event-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: auto;
    position: relative;
    max-width: 100%;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  .event-wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  h3 {
    font-size: 1.7rem;
    margin-right: 1rem;
  }

  .event-wrapper > div {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    padding: 2rem;
    border-radius: 5px;
    display: flex;
    white-space: normal;
    width: 21rem;

    flex-direction: column;
    flex: 0 0 auto;
    margin: 1rem 0.5rem 1rem 2rem;

    text-align: justify;
    height: auto;
    overflow-y: none;
  }
}

@media only screen and (min-width: 768px) {
  .event-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: auto;
    position: relative;
    max-width: 100%;
    justify-content: left;
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scrollbar-width: none;
  }

  .event-wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .event-wrapper > div {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    padding: 2rem;
    border-radius: 5px;
    display: flex;
    white-space: normal;
    width: 21rem;

    flex-direction: column;
    flex: 0 0 auto;
    margin: 1rem 0.5rem 1rem 2rem;

    text-align: justify;
    height: auto;
    overflow-y: none;
  }
}

@media only screen and (min-width: 992px) {
  .event-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2.5rem;
    margin-bottom: 0.7rem;
  }

  .event-wrapper > div {
    box-shadow: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: auto;
  }

  h3 {
    font-size: 1.6rem;
    padding-bottom: 1.5rem;
  }

  .title {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
}

@media only screen and (min-width: 1050px) {
  h3 {
    font-size: 1.7rem;
    padding-bottom: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
    line-height: 1.9rem;
  }
}

@media only screen and (min-width: 1220px) {
  h3 {
    font-size: 1.8rem;
    padding-bottom: 1.5rem;
  }

  .title {
    font-size: 1.65rem;
    line-height: 2.1rem;
  }
}

@media only screen and (min-width: 1430) {
  h3 {
    font-size: 1.9rem;
    padding-bottom: 1.8rem;
  }
  .title {
    font-size: 1.7rem;
    line-height: 2.2rem;
  }
}
</style>
