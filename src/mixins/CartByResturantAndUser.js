import firebase from "firebase";
import db from "@/firebase/init";

export const CartByResturantAndUser = {
  computed: {
    cartByResturant() {
      if (this.cartOrders && firebase.auth().currentUser) {
        return this.cartOrders.filter(cartOrder => {
          return (
            cartOrder.resturant_id == this.$route.params.id &&
            cartOrder.user_id == firebase.auth().currentUser.uid
          );
        });
      }
    }
  },
  created() {
    this.cartOrders = JSON.parse(localStorage.getItem("orders"));

    if (firebase.auth().currentUser) {
      this.total = localStorage.getItem(
        this.$route.params.id + firebase.auth().currentUser.uid
      );
    }

    const ref = db.collection("resturants").doc(this.$route.params.id);
    ref.get().then(doc => {
      this.resturant = doc.data().name;
    });
  }
};
