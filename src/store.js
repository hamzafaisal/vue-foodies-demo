import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orders: [],
    total: 0
  },
  mutations: {
    addToCart(state, data) {
      // Quick Fix To Empty Orders
      if (state.orders == null) {
        state.orders = [{ item_id: 1, quantity: 0 }];
      }
      const record = state.orders.find(element => {
        return element.item_id == data.item_id;
      });

      if (record) {
        record.quantity += 1;
      } else {
        state.orders.push(data);
      }
      this.commit("setLocalStorage");
    },
    // Clear data after checkout
    clearData(state, ids) {
      localStorage.removeItem(ids[0] + ids[1]);
      let record = state.orders.filter(element => {
        return element.resturant_id == ids[0] && element.user_id == ids[1];
      });
      if (record) {
        record.forEach(item => {
          item.quantity = 0;
        });
        this.commit("setLocalStorage");
      }
    },
    // Check Bill Restutant
    // Receiving resturant and user id in ids
    checkTotal(state, ids) {
      let record = state.orders.filter(element => {
        return element.resturant_id == ids[0] && element.user_id == ids[1];
      });
      if (record) {
        let sum = 0;
        record.forEach(order => {
          sum += order.price * order.quantity;
        });
        state.total = sum;

        if (sum == 0) {
          localStorage.removeItem(ids[0] + ids[1], sum);
        } else {
          localStorage.setItem(ids[0] + ids[1], sum);
        }
      }
    },
    // Set Local Storage
    setLocalStorage(state) {
      state.orders = state.orders.filter(order => {
        return order.quantity > 0;
      });
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    // Increment Quantity
    incQuantity(state, ids) {
      const record = state.orders.find(element => {
        return element.item_id == ids[0] && element.user_id == ids[1];
      });

      if (record && record.quantity <= 10) {
        record.quantity += 1;
      }
      this.commit("setLocalStorage");
    },
    // Decrement Quantity
    decQuantity(state, ids) {
      const record = state.orders.find(element => {
        return element.item_id == ids[0] && element.user_id == ids[1];
      });

      if (record && record.quantity > 0) {
        record.quantity -= 1;
      }
      this.commit("setLocalStorage");
    },
    setOrders(state) {
      state.orders = JSON.parse(localStorage.getItem("orders"));
    }
  },

  getters: {
    getOrders: state => {
      state.orders = JSON.parse(localStorage.getItem("orders"));
      return state.orders;
    },
    getTotal: state => {
      return state.total;
    }
  }
});
