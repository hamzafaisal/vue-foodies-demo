<template>
  <div>
    <div class="container m-t-30 m-b-30">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <div class="menu-widget" id="2">
            <div class="widget-heading text-center">
              <h3 class="widget-title text-dark">
                Food Items Menu From This Resturant!
                <a
                  class="btn btn-link pull-right"
                  data-toggle="collapse"
                  href="#popular2"
                  aria-expanded="true"
                >
                  <i class="fa fa-angle-right pull-right"></i>
                  <i class="fa fa-angle-down pull-right"></i>
                </a>
              </h3>
              <div class="clearfix"></div>
            </div>
            <div class="collapse in" id="popular2">
              <div class="food-item">
                <div class="row">
                  <div class="col-lg-12">
                    <one-item v-for="item in menu" :key="item.id" :item="item"></one-item>
                  </div>
                </div>
                <!-- end:row -->
              </div>
            </div>
            <!-- end:Collapse -->
          </div>
          <!-- end:Widget menu -->
        </div>
        <app-cart></app-cart>

        <!-- end:Right Sidebar -->
      </div>
      <!-- end:row -->
    </div>
  </div>
</template>

<script>
import db from "../../../firebase/init";

import OneItem from "./OneItem";
import Cart from "./Cart";
export default {
  props: ["name"],
  components: {
    "one-item": OneItem,
    "app-cart": Cart
  },
  data() {
    return {
      menu: []
    };
  },
  created() {
    const ref = db.collection("products").where("resturant", "==", this.name);
    ref.get().then(snaphot => {
      snaphot.forEach(doc => {
        let productData = doc.data();
        productData.id = doc.id;
        this.menu.push(productData);
      });
    });
  }
};
</script>

<style scoped>
.food-item {
  text-transform: capitalize;
}
</style>