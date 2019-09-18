<template>
  <div>
    <div class="container animated slideInDown slow">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-3">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div
                  class="col-lg-6 d-none d-lg-block"
                  style="background: url(https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80) center no-repeat; background-size: cover;"
                ></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      <h6
                        v-if="error"
                        class="text-danger text-center text-capitalize"
                      >. . . {{error}} . . .</h6>
                    </div>
                    <form class="user">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          v-model="email"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          v-model="password"
                        />
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input type="checkbox" class="custom-control-input" id="customCheck" />
                          <label class="custom-control-label" for="customCheck">Remember Me</label>
                        </div>
                      </div>
                      <button @click.prevent="login()" class="btn btn-primary btn-user btn-block">
                        <span v-if="!isLoading">Login</span>
                        <span
                          v-if="isLoading"
                          class="spinner-grow spinner-grow-sm text-light"
                          role="status"
                        ></span>
                      </button>
                      <hr />
                      <a href="index.html" class="btn btn-google btn-user btn-block">
                        <i class="fab fa-google fa-fw"></i> Login with Google
                      </a>
                      <button
                        @click.prevent="loginWithFB()"
                        class="btn btn-facebook btn-user btn-block"
                      >
                        <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                      </button>
                    </form>
                    <hr />
                    <div class="text-center">
                      <router-link class="small" to="/forgetPassword">Forgot Password?</router-link>
                    </div>
                    <div class="text-center">
                      <router-link class="small" to="/signup">Create an Account!</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../../firebase/init";
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      userType: "",
      type: "user",
      isLoading: false,
      userExist: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.isLoading = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            const ref = db
              .collection("users")
              .where("user_id", "==", cred.user.uid);
            ref.get().then(snapshot => {
              snapshot.forEach(doc => {
                this.userType = doc.data().type;
                if (this.userType === "admin") {
                  localStorage.setItem("refresh", true);
                  this.$router.push("/admin/");
                } else {
                  localStorage.setItem("refresh", true);
                  this.$router.push("/");
                }
              });
            });
            this.error = "";
          })
          .catch(err => {
            this.isLoading = false;
            this.error = err.message;
          });
      } else {
        this.isLoading = false;
        this.error = "Both Fields Required!";
      }
    },
    loginWithFB() {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope("email,public_profile");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const ref = db.collection("users");
          ref
            .where("email", "==", result.additionalUserInfo.profile.email)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                this.userExist = doc.data();
                console.log(this.userExist);
              });

              if (!this.userExist) {
                ref
                  .add({
                    fname: result.additionalUserInfo.profile.first_name,
                    lname: result.additionalUserInfo.profile.last_name,
                    email: result.additionalUserInfo.profile.email,
                    password: "no password! login with facebook",
                    type: this.type,
                    user_id: result.user.uid
                  })
                  .then(result => {
                    localStorage.setItem("refresh", true);
                    this.$router.push("/");
                  });
              } else {
                localStorage.setItem("refresh", true);
                this.$router.push("/");
              }
            });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
        });
    }
  },
  created() {
    // Import CSS files of Admin
    import("../../../../public/css/sb-admin-2.min.css");
  }
};
</script>

<style scoped>
</style>