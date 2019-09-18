<template>
  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
    <div class="sidebar-wrap">
      <div class="widget widget-cart">
        <div class="widget-heading">
          <h3 class="widget-title text-dark">
            <span>Orders For {{resturant}} Resturant</span>
          </h3>
          <div class="clearfix"></div>
        </div>
        <div class="order-row bg-white">
          <div class="widget-body">
            <ul>
              <li v-for="cartOrder in cartByResturant" :key="cartOrder.item_id">
                <div v-if="cartOrder.quantity > 0" class="title-row">
                  <span
                    @click="decQuantity(cartOrder.item_id , cartOrder.user_id)"
                    class="font-weight-bold"
                    style="cursor: pointer;"
                  >-</span>
                  {{cartOrder.name}}({{cartOrder.quantity}})
                  <span
                    @click="incQuantity(cartOrder.item_id , cartOrder.user_id)"
                    class="font-weight-bold"
                    style="cursor: pointer;"
                  >+</span>
                  <span class="pull-right font-weight-bold">
                    PKR.
                    <span class="total">{{cartOrder.price * cartOrder.quantity}}</span>
                  </span>
                  <hr />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="widget-body">
          <div class="price-wrap text-xs-center">
            <p>TOTAL</p>
            <h3 class="value">
              <strong>PKR. {{total}}</strong>
            </h3>
            <p>Discount 10%</p>
            <router-link
              :to="'/checkout/' + this.$route.params.id"
              tag="button"
              type="button"
              class="btn theme-btn"
            >Checkout</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "@/main";
import firebase from "firebase";
import { CartByResturantAndUser } from "@/mixins/CartByResturantAndUser";

export default {
  name: "Cart",
  mixins: [CartByResturantAndUser],
  data() {
    return {
      cartOrders: [],
      resturant: null,
      total: 0,
      price: []
    };
  },
  methods: {
    incQuantity(id, user_id) {
      let ids = [id, user_id];
      // Increasre Quantity and Get Orders
      this.$store.commit("incQuantity", ids);
      this.cartOrders = this.$store.getters.getOrders;

      //  Check Totals and Get Orders
      this.$store.commit("checkTotal", [this.$route.params.id, user_id]);
      this.total = this.$store.getters.getTotal;
    },
    decQuantity(id, user_id) {
      let ids = [id, user_id];
      // Decreaes Quantity and Get Orders
      this.$store.commit("decQuantity", ids);
      this.cartOrders = this.$store.getters.getOrders;

      //  Check Totals and Get Orders
      this.$store.commit("checkTotal", [this.$route.params.id, user_id]);
      this.total = this.$store.getters.getTotal;
    }
  },
  created() {
    bus.$on("cartOrders", cartOrders => {
      this.cartOrders = cartOrders;
      this.total = this.$store.getters.getTotal;
    });
  }
};
</script>

<style scoped>
.widget-body {
  text-transform: capitalize;
}
</style>