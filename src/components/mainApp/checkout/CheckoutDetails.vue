<template>
  <div>
    <div class="container m-t-30">
      <div class="widget clearfix">
        <!-- /widget heading -->
        <div class="widget-heading">
          <h3 class="widget-title text-dark">Cart summary</h3>
          <div class="clearfix"></div>
        </div>
        <div class="widget-body">
          <form v-if="isUser" @submit.prevent="checkout()">
            <div class="row">
              <div class="col-sm-6 margin-b-30">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>First Name</label>
                      <input type="text" class="form-control" v-model="name" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Phone</label>
                      <input type="phone" class="form-control" v-model="phone" />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label>Full Address*</label>
                      <input type="text" class="form-control" v-model="address" />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label>Email Address</label>
                      <input type="email" class="form-control" v-model="email" />
                    </div>
                  </div>
                </div>
              </div>
              <!--next part-->
              <div class="col-sm-6">
                <div class="cart-totals margin-b-20">
                  <div class="cart-totals-title">
                    <h4>Cart Summary For {{resturant}}</h4>
                  </div>
                  <div class="cart-totals-fields">
                    <table class="table">
                      <tbody>
                        <tr v-for="order in cartByResturant" :key="order.id">
                          <td>{{order.name}} ({{order.quantity}})</td>
                          <td>PKR. {{order.price * order.quantity}}</td>
                        </tr>
                        <tr>
                          <td class="text-color">
                            <strong>Total</strong>
                          </td>
                          <td class="text-color">
                            <strong>PKR. {{total}}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!--cart summary-->
                <div class="payment-option">
                  <ul class="list-unstyled">
                    <li>
                      <label class="custom-control custom-radio m-b-20">
                        <input
                          id="radioStacked1"
                          value="Payment on delivery"
                          type="radio"
                          class="custom-control-input"
                          v-model="payment"
                        />
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Payment on delivery</span>
                        <br />
                      </label>
                    </li>
                    <li>
                      <label class="custom-control custom-radio m-b-10">
                        <input
                          value="Paypal"
                          type="radio"
                          class="custom-control-input"
                          v-model="payment"
                        />
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">
                          Paypal
                          <img src="images/paypal.jpg" alt width="90" />
                        </span>
                      </label>
                    </li>
                  </ul>
                  <p class="text-xs-center">
                    <button
                      :disabled="cartOrders.length == 0"
                      @click.prevent="checkout()"
                      class="btn btn-outline-success btn-block"
                    >Checkout</button>
                  </p>
                  <div v-if="error" class="text-danger text-center mt-2">{{error}}</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../../firebase/init";
import { CartByResturantAndUser } from "../../../mixins/CartByResturantAndUser";

export default {
  mixins: [CartByResturantAndUser],
  data() {
    return {
      isUser: false,
      cartOrders: [],
      total: 0,
      name: null,
      email: null,
      address: null,
      phone: null,
      payment: null,
      error: null,
      itemsOrdered: [],
      resturant: null
    };
  },
  methods: {
    checkout() {
      if (
        this.name &&
        this.address &&
        this.phone &&
        this.payment &&
        this.itemsOrdered &&
        this.resturant
      ) {
        const ref = db
          .collection("orders")
          .add({
            customerName: this.name,
            customerPhone: this.phone,
            customerAddress: this.address,
            resturant: this.resturant,
            itemsOrdered: this.itemsOrdered,
            total: this.total,
            payment: this.payment,
            status: "unreceived"
          })
          .then(result => {
            this.$store.commit("clearData", [
              this.$route.params.id,
              firebase.auth().currentUser.uid
            ]);

            this.$router.push("/");
            this.error = "";
          });
      } else {
        this.error = "All Fields Required";
      }
    }
  },
  created() {
    if (this.cartByResturant) {
      this.cartByResturant.forEach(order => {
        this.itemsOrdered.push({
          name: order.name,
          price: order.price,
          quantity: order.quantity
        });
      });
    }

    if (firebase.auth().currentUser) {
      const ref = db
        .collection("users")
        .where("user_id", "==", firebase.auth().currentUser.uid);
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.name = doc.data().fname + " " + doc.data().lname;
          this.email = doc.data().email;
        });
        this.isUser = true;
      });
    }
  }
};
</script>

<style scoped>
</style>