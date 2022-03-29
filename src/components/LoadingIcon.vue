<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="200px"
    height="200px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      r="32"
      stroke-width="8"
      stroke="#fe718d"
      stroke-dasharray="50.26548245743669 50.26548245743669"
      fill="none"
      stroke-linecap="round"
      style="animation-play-state: running; animation-delay: 0s"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;1"
        values="0 50 50;360 50 50"
        style="animation-play-state: running; animation-delay: 0s"
      ></animateTransform>
    </circle>
  </svg>
</template>

<script>
export default {};
</script>

<style scoped>
svg {
  height: 30px;
  width: 30px;
  text-align: center;
  display: inline;
  margin: 0;
  background: rgb(255, 255, 255);
  shape-rendering: auto;
  animation-play-state: running;
  animation-delay: 0s;
}
</style>
