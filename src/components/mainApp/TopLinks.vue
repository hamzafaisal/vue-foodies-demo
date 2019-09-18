<template>
  <div class="top-links">
    <div class="container">
      <ul class="row links">
        <li class="col-xs-12 col-sm-3 link-item">
          <span>1</span>
          <router-link to="/">Choose Your Location</router-link>
        </li>
        <li class="col-xs-12 col-sm-3 link-item">
          <span>2</span>
          <router-link to="/resturants">Choose Restaurant</router-link>
        </li>
        <li class="col-xs-12 col-sm-3 link-item">
          <span>3</span>
          <router-link to>Pick Your favorite food</router-link>
        </li>
        <li class="col-xs-12 col-sm-3 link-item">
          <span>4</span>
          <router-link to>Order and Pay online</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    };
  },
  mounted() {
    let activate = document.querySelector(
      ".link-item .router-link-exact-active"
    );
    // activate[0].style.backgroundColor = "red";
    activate.parentElement.classList.add("active");
  }
};
</script>

<style scoped>
</style>