import db from "../../firebase/init";
import firebase from "firebase";
const state = {
  currentAdmin: null
};

const mutations = {
  currentAdmin(state, userData) {
    state.currentAdmin = userData;
    // console.log(state.currentAdmin.name);
  }
};

const actions = {
  currentAdmin({ commit }) {
    const ref = db
      .collection("users")
      .where("user_id", "==", firebase.auth().currentUser.uid);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        let userData = {
          name: doc.data().name,
          email: doc.data().email,
          image: doc.data().image,
          password: doc.data().password,
          address: doc.data().address,
          type: doc.data().type,
          id: doc.id
        };
        commit("currentAdmin", userData);
      });
    });
  }
};

const getters = {
  currentAdminGet: state => {
    return state.currentAdmin;
  }
};

export default { state, mutations, actions, getters };
