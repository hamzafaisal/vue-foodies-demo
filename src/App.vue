<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Admin from "./views/Admin";
export default {
  components: {
    "app-admin": Admin
  }
};
</script>

<style scoped>
</style>