import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import db from "./firebase/init";

// Admin Routes
// import Dashboard from "./views/admin/Dashboard";
// import Error404 from "./views/admin/Error404";
// import Charts from "./views/admin/Charts";
// import AddUser from "./views/admin/add/AddUser";
// import AddProduct from "./views/admin/add/AddProduct";
// import AddResturant from "./views/admin/add/AddResturant";
// import UserTable from "./views/admin/tables/UserTable";
// import ProductTable from "./views/admin/tables/ProductTable";
// import ResturantTable from "./views/admin/tables/ResturantTable";
// import OrderTable from "./views/admin/tables/OrderTable";
// import AdminTable from "./views/admin/tables/AdminTable";
// import Admin from "./views/Admin.vue";
// import Login from "./views/admin/auth/Login";
// import Signup from "./views/admin/auth/Signup";
// import ForgetPassword from "./views/admin/auth/ForgetPassword";
// import EditProfile from "./views/admin/EditProfile";

const Admin = () => import("./views/Admin.vue");
const Dashboard = () => import("./views/admin/Dashboard");
const Error404 = () => import("./views/admin/Error404");
const Charts = () => import("./views/admin/Charts");
const EditProfile = () => import("./views/admin/EditProfile");
const AddUser = () => import("./views/admin/add/AddUser");
const AddProduct = () => import("./views/admin/add/AddProduct");
const AddResturant = () => import("./views/admin/add/AddResturant");
const UserTable = () => import("./views/admin/tables/UserTable");
const ProductTable = () => import("./views/admin/tables/ProductTable");
const ResturantTable = () => import("./views/admin/tables/ResturantTable");
const OrderTable = () => import("./views/admin/tables/OrderTable");
const AdminTable = () => import("./views/admin/tables/AdminTable");
const Login = () => import("./views/admin/auth/Login");
const Signup = () => import("./views/admin/auth/Signup");
const ForgetPassword = () => import("./views/admin/auth/ForgetPassword");

//Foodis App Imports
// import Foodies from "./views/Foodies.vue";
// import Home from "./views/mainApp/Home";
// import AllResturants from "./views/mainApp/AllResturants";
// import ContactUs from "./views/mainApp/ContactUs";
// import Checkout from "./views/mainApp/Checkout";
// import ResturantProfile from "./views/mainApp/ResturantProfile";
// import BecomePartner from "./views/mainApp/BecomePartner";

// Lazy Routes
const Foodies = () => import("./views/Foodies.vue");
const Home = () => import("./views/mainApp/Home");
const AllResturants = () => import("./views/mainApp/AllResturants");
const ContactUs = () => import("./views/mainApp/ContactUs");
const Checkout = () => import("./views/mainApp/Checkout");
const ResturantProfile = () => import("./views/mainApp/ResturantProfile");
const BecomePartner = () => import("./views/mainApp/BecomePartner");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/admin/",
      component: Admin,

      beforeEnter(to, from, next) {
        if (firebase.auth().currentUser) {
          const ref = db
            .collection("users")
            .where("user_id", "==", firebase.auth().currentUser.uid);
          ref.get().then(snapshot => {
            snapshot.forEach(doc => {
              let userType = doc.data().type;
              if (userType === "admin") {
                next();
              } else {
                next("/");
              }
            });
          });
        } else {
          next("/");
        }
      },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: Dashboard
        },
        {
          path: "add/user",
          name: "admin-add-user",
          component: AddUser
        },
        {
          path: "add/product",
          name: "admin-add-product",
          component: AddProduct
        },
        {
          path: "add/resturant",
          name: "admin-add-resturant",
          component: AddResturant
        },
        {
          path: "show/users",
          name: "admin-show-users",
          component: UserTable
        },
        {
          path: "show/admins",
          name: "admin-show-admins",
          component: AdminTable
        },
        {
          path: "show/products",
          name: "admin-show-products",
          component: ProductTable
        },
        {
          path: "show/resturants",
          name: "admin-show-resturant",
          component: ResturantTable
        },
        {
          path: "show/orders",
          name: "admin-show-orders",
          component: OrderTable
        },
        {
          path: "charts",
          name: "admin-charts",
          component: Charts
        },
        {
          path: "edit/:id",
          name: "admin-edit-profile",
          component: EditProfile
        }
      ]
    },
    // Auth Routers
    {
      path: "/login",
      name: "admin-login",
      component: Login
    },
    {
      path: "/signup",
      name: "admin-signup",
      component: Signup
    },
    {
      path: "/forgetPassword",
      name: "admin-forget-password",
      component: ForgetPassword
    },
    // Foodies App Routers
    {
      path: "/",
      component: Foodies,
      children: [
        {
          path: "",
          name: "home",
          component: Home
        },
        {
          path: "resturants",
          name: "resturants",
          component: AllResturants
        },
        {
          path: "contact",
          name: "contact",
          component: ContactUs
        },
        {
          path: "checkout/:id",
          name: "checkout/:id",
          component: Checkout
        },
        {
          path: "resturant-profile/:id",
          name: "resturant-profile",
          component: ResturantProfile
        },
        {
          path: "become-partner",
          name: "become-partner",
          component: BecomePartner
        }
      ]
    },
    {
      path: "*",
      component: Error404
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
