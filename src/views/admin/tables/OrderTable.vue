<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">All Orders</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-bordered table-sm table-striped dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer Phone</th>
                <th>Customer Address</th>
                <th>Resturant</th>
                <th>Items Ordered</th>
                <th>Items Price</th>
                <th>Items Quantity</th>
                <th>Order Total</th>
                <th>Payment</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{order.customerName}}</td>
                <td>{{order.customerPhone}}</td>
                <td>{{order.customerAddress}}</td>
                <td>{{order.resturant}}</td>
                <td>
                  <span v-for="item in order.itemsOrdered" :key="item.name">{{item.name}},</span>
                </td>
                <td>
                  <span v-for="item in order.itemsOrdered" :key="item.price">{{item.price}},</span>
                </td>
                <td>
                  <span v-for="item in order.itemsOrdered" :key="item.quantity">{{item.quantity}},</span>
                </td>
                <td>{{order.total}}</td>
                <td>{{order.payment}}</td>
                <td>{{order.status}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import db from "../../../firebase/init";

export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    const ref = db.collection("orders");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        this.orders.push(data);
      });
      $(document).ready(function() {
        $("table").DataTable();
      });
    });
  }
};
</script>


<style scoped>
</style>