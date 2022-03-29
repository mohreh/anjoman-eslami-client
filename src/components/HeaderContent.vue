<template>
  <div>
    <h2>صفحه مجازی انجمن اسلامی دانشجویان دانشگاه تبریز</h2>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  width: 100%;
}

h2 {
  text-align: right;
  color: #625261;
}

@media only screen and (max-width: 600px) {
  div {
    height: 7rem;
    padding: 1rem 2rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

@media only screen and (min-width: 600px) {
  div {
    height: 9rem;
    padding: 2rem 3rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

@media only screen and (min-width: 768px) {
  div {
    height: 9rem;
    padding: 3rem 1rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

@media only screen and (min-width: 992px) {
  div {
    height: 9rem;
    padding: 3rem 4rem;
  }

  h2 {
    font-size: 2.2rem;
    line-height: 2.5rem;
  }
}

@media only screen and (min-width: 1200px) {
  div {
    height: 10rem;
    padding: 3rem 9rem;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 2.5rem;
  }
}
</style>
