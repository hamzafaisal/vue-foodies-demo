<template>
  <div class="page-wrapper">
    <app-toplinks></app-toplinks>
    <app-banner :resturant="resturant"></app-banner>
    <app-items v-if="name" :name="name"></app-items>
  </div>
</template>

<script>
import db from "../../firebase/init";
import TopLinks from "../../components/mainApp/TopLinks";
import Banner from "../../components/mainApp/resturantProfile/Banner";
import FoodItems from "../../components/mainApp/resturantProfile/FoodItems";

export default {
  components: {
    "app-toplinks": TopLinks,
    "app-banner": Banner,
    "app-items": FoodItems
  },
  data() {
    return {
      resturant: [],
      name: null
    };
  },

  created() {
    const ref = db.collection("resturants").doc(this.$route.params.id);
    ref.get().then(doc => {
      let data = doc.data();
      data.id = doc.id;
      this.resturant.push(data);
      this.name = this.resturant[0].name;
    });
  }
};
</script>



<style scoped>
.page-wrapper {
  min-height: 100vh;
}
</style>