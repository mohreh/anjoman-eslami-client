<template>
  <router-view />
</template>

<script>
String.prototype.EntoFa = function () {
  return this.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

import Home from "./components/Home.vue";

export default {
  components: {
    Home,
  },
};
</script>

<style>
@import url(./assets/fonts.css);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: adobe-arabic;
}

a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.archive {
  float: left !important;
  text-align: left !important;
  padding: 0.2rem 0 0 0 !important;
  display: block;
  color: #625261;
  transition: 0.2s;
  cursor: pointer;
}

.archive:hover {
  color: #214252;
}

.text-date {
  color: #625261;
}

.text-hover {
  transition: 0.2s;
  cursor: pointer;
}

.text-hover:hover {
  color: #214252;
}

.separate-line::after {
  content: " ";
  display: block;
  position: absolute;
  height: 1px;
  background: #214252;
  opacity: 0.2;
  width: 94%;
  bottom: 0;
  left: 2%;
}

.image {
  width: 100%;
  background-color: #e8e8e8;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0, 0.7);
  border-radius: 10px;
}

@media only screen and (max-width: 600px) {
  .archive {
    font-size: 1.1rem;
  }

  .text-date {
    font-size: 1.2rem;
    line-height: 1.1rem;
  }
}

@media only screen and (min-width: 600px) {
  .archive {
    font-size: 1.1rem;
  }

  .text-date {
    font-size: 1.2rem;
    line-height: 1.1rem;
  }
}

@media only screen and (min-width: 768px) {
  .archive {
    font-size: 1.1rem;
  }

  .text-date {
    font-size: 1.2rem;
    line-height: 1.1rem;
  }
}

@media only screen and (min-width: 992px) {
  .archive {
    font-size: 1.1rem;
  }

  .text-date {
    font-size: 1.2rem;
    line-height: 1.1rem;
  }
}

@media only screen and (min-width: 1220px) {
  .archive {
    font-size: 1.2rem;
  }

  .text-date {
    font-size: 1.3rem;
    line-height: 1.2rem;
  }
}
</style>
