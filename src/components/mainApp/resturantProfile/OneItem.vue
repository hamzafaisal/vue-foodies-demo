<template>
  <div>
    <div class="col-xs-12 col-sm-12 col-lg-8 m-b-30">
      <div class="rest-logo pull-left">
        <a class="restaurant-logo pull-left" href="#">
          <img
            :src="item.image"
            alt="Food logo"
            style="width:75px; height:75px; border-radius: 10px;"
          />
        </a>
      </div>
      <!-- end:Logo -->
      <div class="rest-descr">
        <h6>
          <a href="#">{{item.name}}</a>
        </h6>
        <p>{{item.description}}</p>
      </div>
      <!-- end:Description -->
    </div>
    <!-- end:col -->
    <div class="col-xs-12 col-sm-12 col-lg-4 pull-right item-cart-info m-b-30">
      <span class="price pull-left">PKR. {{item.price}}</span>
      <button
        :disabled="!isAuth"
        @click="addToCart()"
        class="btn btn-small theme-btn pull-right"
      >&#43;</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { bus } from "../../../main";

export default {
  data() {
    return {
      order: [],
      cartOrders: [],
      isAuth: false
    };
  },
  props: ["item"],
  methods: {
    addToCart() {
      let data = {
        item_id: this.item.id,
        name: this.item.name,
        price: this.item.price,
        discount: this.item.discount,
        type: this.item.type,
        quantity: 1,
        resturant: this.item.resturant,
        resturant_id: this.$route.params.id,
        user_id: firebase.auth().currentUser.uid
      };
      this.$store.commit("addToCart", data);
      this.$store.commit("checkTotal", [
        this.$route.params.id,
        firebase.auth().currentUser.uid
      ]);
      // console.log(this.cartOrders);
      // this.cartOrders = JSON.parse(localStorage.getItem("orders"));
      this.cartOrders = this.$store.getters.getOrders;
      bus.$emit("cartOrders", this.cartOrders);
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isAuth = firebase.auth().currentUser;
    }
  }
};
</script>

<style scoped>
</style>